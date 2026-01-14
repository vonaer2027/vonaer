/**
 * Combined Empty Leg Scraper (FlyXO + JetBay)
 *
 * Purpose:
 * 1. Scrapes both FlyXO and JetBay for Seoul empty leg flights
 * 2. Combines results and checks for cross-source duplicates
 * 3. Uploads unified dataset to Supabase
 *
 * Features:
 * - Parallel scraping of both sources
 * - Cross-source deduplication (same flight from different brokers)
 * - Source tracking (flyxo vs jetbay)
 * - Unified upload to Supabase
 */

require('dotenv').config();
const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs').promises;
const { createClient } = require('@supabase/supabase-js');
const { getUnknownCities, clearUnknownCitiesLog, generateFlightId } = require('./city-database');

const execAsync = promisify(exec);

// Configuration
const config = {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY,
    tableName: process.env.DATABASE_TABLE_NAME || 'flights'
};

// Default images pool for variety when no image is available (Supabase Storage)
const DEFAULT_IMAGES = [
    'https://qyipzxwadmmhitvuiade.supabase.co/storage/v1/object/public/flight-images/defaults/emptyleg-01.jpg',
    'https://qyipzxwadmmhitvuiade.supabase.co/storage/v1/object/public/flight-images/defaults/emptyleg-02.jpg',
    'https://qyipzxwadmmhitvuiade.supabase.co/storage/v1/object/public/flight-images/defaults/emptyleg-03.jpg',
    'https://qyipzxwadmmhitvuiade.supabase.co/storage/v1/object/public/flight-images/defaults/emptyleg-04.jpg',
    'https://qyipzxwadmmhitvuiade.supabase.co/storage/v1/object/public/flight-images/defaults/emptyleg-05.webp',
    'https://qyipzxwadmmhitvuiade.supabase.co/storage/v1/object/public/flight-images/defaults/emptyleg-06.jpg',
];

/**
 * Get a random default image from the pool
 * @returns {string} Random image path
 */
function getRandomDefaultImage() {
    const randomIndex = Math.floor(Math.random() * DEFAULT_IMAGES.length);
    return DEFAULT_IMAGES[randomIndex];
}

class CombinedCrawler {
    constructor() {
        this.flyxoFlights = [];
        this.jetbayFlights = [];
        this.combinedFlights = [];
        this.supabase = null;
    }

    async initialize() {
        console.log('🚀 Combined Empty Leg Crawler (FlyXO + JetBay)');
        console.log('================================================');
        console.log('📍 Sources: FlyXO + JetBay (Jet-Bay)');
        console.log('🔍 Filter: Seoul (ICN/GMP) flights only');
        console.log('✨ Features: Multi-source → Deduplicate → Upload\n');

        // Initialize Supabase
        if (!config.supabaseUrl || !config.supabaseKey) {
            throw new Error('Missing Supabase credentials');
        }

        this.supabase = createClient(config.supabaseUrl, config.supabaseKey);
        console.log('✅ Supabase client initialized\n');
    }

    async scrapeFlyXO() {
        console.log('🔵 Running FlyXO scraper...');
        try {
            // Run FlyXO scraper but disable its upload
            const { stdout, stderr } = await execAsync('SKIP_UPLOAD=true SAVE_TO_FILE=true node flyxo-crawler-with-upload.js', {
                timeout: 180000 // 3 minutes
            });

            if (stderr && !stderr.includes('dotenv')) {
                console.log('⚠️  FlyXO stderr:', stderr);
            }

            // Read the generated JSON file
            const today = new Date().toISOString().split('T')[0];
            const flyxoFile = `flyxo_seoul_flights_${today}.json`;

            const data = await fs.readFile(flyxoFile, 'utf-8');
            this.flyxoFlights = JSON.parse(data);

            console.log(`✅ FlyXO complete: ${this.flyxoFlights.length} flights found\n`);
            return this.flyxoFlights.length;
        } catch (error) {
            console.error('❌ FlyXO scraper failed:', error.message);
            return 0;
        }
    }

    async scrapeJetBay() {
        console.log('🟢 Running JetBay scraper...');
        try {
            // Run JetBay scraper but disable its upload
            const { stdout, stderr } = await execAsync('SKIP_UPLOAD=true SAVE_TO_FILE=true node unified-crawler-with-upload.js', {
                timeout: 180000 // 3 minutes
            });

            if (stderr && !stderr.includes('dotenv')) {
                console.log('⚠️  JetBay stderr:', stderr);
            }

            // Read the generated JSON file
            const today = new Date().toISOString().split('T')[0];
            const jetbayFile = `jetbay_korea_flights_unified_${today}.json`;

            const data = await fs.readFile(jetbayFile, 'utf-8');
            const parsed = JSON.parse(data);
            this.jetbayFlights = parsed.flights || [];

            console.log(`✅ JetBay complete: ${this.jetbayFlights.length} flights found\n`);
            return this.jetbayFlights.length;
        } catch (error) {
            console.error('❌ JetBay scraper failed:', error.message);
            return 0;
        }
    }

    /**
     * Validates a flight has required data and is not invalid
     * @param {Object} flight - Flight object to validate
     * @returns {Object} { isValid: boolean, reason: string, warning: string }
     */
    validateFlight(flight) {
        const data = flight.extractedData;
        let warning = null;

        // CRITICAL: ALWAYS verify Korea involvement - don't trust sub-crawler flags
        // This is the primary filter - we only want Korea-related flights
        // Check by looking at country names and city names directly
        const fromKorea = data.from?.country === 'South Korea' ||
                          /^(korea|seoul|busan|incheon|gimpo|jeju|icn|gmp|pus|cju)$/i.test(data.from?.city || '');
        const toKorea = data.to?.country === 'South Korea' ||
                        /^(korea|seoul|busan|incheon|gimpo|jeju|icn|gmp|pus|cju)$/i.test(data.to?.city || '');

        if (!fromKorea && !toKorea) {
            return {
                isValid: false,
                reason: `Not Korea-related (${data.from?.city || 'Unknown'}, ${data.from?.country || 'Unknown'} → ${data.to?.city || 'Unknown'}, ${data.to?.country || 'Unknown'})`
            };
        }

        // Check for Unknown country (critical error - must reject)
        // Note: "Unverified" is different from "Unknown" - Unverified cities are allowed through
        if (data.from?.country === 'Unknown' || data.to?.country === 'Unknown') {
            return {
                isValid: false,
                reason: `Unknown location (${data.from?.country === 'Unknown' ? data.from.city : data.to.city})`
            };
        }

        // Check for Unverified locations - allow through but warn
        if (data.from?.country === 'Unverified' || data.to?.country === 'Unverified') {
            const unverifiedCity = data.from?.country === 'Unverified' ? data.from.city : data.to.city;
            warning = `Unverified location: ${unverifiedCity} - consider adding to city-database.js`;
        }

        // Check for missing critical location data
        if (!data.from?.city || !data.to?.city) {
            return {
                isValid: false,
                reason: 'Missing city information'
            };
        }

        if (!data.from?.country || !data.to?.country) {
            return {
                isValid: false,
                reason: 'Missing country information'
            };
        }

        // Check for missing or invalid date
        if (!data.date || !data.dateTimestamp) {
            return {
                isValid: false,
                reason: 'Missing or invalid date'
            };
        }

        // Check for invalid date (too far in past)
        const flightDate = new Date(data.dateTimestamp);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (flightDate < today) {
            return {
                isValid: false,
                reason: 'Past flight date'
            };
        }

        // Check for missing price
        if (!data.price) {
            return {
                isValid: false,
                reason: 'Missing price'
            };
        }

        // Check for missing route summary
        if (!data.route?.summary) {
            return {
                isValid: false,
                reason: 'Missing route summary'
            };
        }

        // All validations passed
        return { isValid: true, reason: null, warning };
    }

    async combineAndDeduplicate() {
        console.log('🔄 Combining flights and checking for duplicates...');

        const allFlights = [
            ...this.flyxoFlights.map(f => ({ ...f, source: 'flyxo' })),
            ...this.jetbayFlights.map(f => ({ ...f, source: 'jetbay' }))
        ];

        console.log(`📊 Total flights before validation: ${allFlights.length}`);
        console.log(`   FlyXO: ${this.flyxoFlights.length}`);
        console.log(`   JetBay: ${this.jetbayFlights.length}`);

        // Step 1: Validate flights and filter out invalid ones
        console.log('\n🔍 Validating flights...');
        const validFlights = [];
        const invalidFlights = [];
        const warnings = [];

        for (const flight of allFlights) {
            const validation = this.validateFlight(flight);

            if (validation.isValid) {
                validFlights.push(flight);
                if (validation.warning) {
                    warnings.push({ flight, warning: validation.warning });
                    console.log(`   ⚠️  Warning [${flight.source}]: ${flight.extractedData.route?.summary || 'Unknown route'} - ${validation.warning}`);
                } else {
                    console.log(`   ✅ Valid [${flight.source}]: ${flight.extractedData.route?.summary || 'Unknown route'}`);
                }
            } else {
                invalidFlights.push({ flight, reason: validation.reason });
                console.log(`   ❌ Filtered out [${flight.source}]: ${flight.extractedData.route?.summary || 'Unknown route'} - ${validation.reason}`);
            }
        }

        console.log(`\n📊 Validation Results:`);
        console.log(`   Valid flights: ${validFlights.length}`);
        console.log(`   Flights with warnings: ${warnings.length}`);
        console.log(`   Invalid flights filtered: ${invalidFlights.length}`);

        if (invalidFlights.length > 0) {
            const reasonBreakdown = invalidFlights.reduce((acc, item) => {
                acc[item.reason] = (acc[item.reason] || 0) + 1;
                return acc;
            }, {});

            console.log(`   Reasons for filtering:`);
            for (const [reason, count] of Object.entries(reasonBreakdown)) {
                console.log(`      ${reason}: ${count} flights`);
            }
        }

        // Step 2: Deduplicate based on route, date, and price
        console.log('\n🔄 Deduplicating valid flights...');
        const uniqueFlights = [];
        const seen = new Map();
        const duplicates = [];

        for (const flight of validFlights) {
            const route = flight.extractedData.route;
            const date = flight.extractedData.date;
            const price = flight.extractedData.price;

            // Create a key for duplicate detection
            // We use route direction, date, and price to identify same flights
            const key = `${route.from}_${route.to}_${date}_${price}`;

            if (seen.has(key)) {
                const existing = seen.get(key);
                duplicates.push({
                    flight1: existing,
                    flight2: flight,
                    key: key
                });
                console.log(`   🔍 Potential duplicate found:`);
                console.log(`      ${existing.source}: ${route.summary} - ${price} (${date})`);
                console.log(`      ${flight.source}: ${route.summary} - ${price} (${date})`);

                // Keep the one with more information (or from preferred source)
                if (flight.source === 'jetbay' && existing.source === 'flyxo') {
                    // Prefer JetBay as it has more details (aircraft info, etc.)
                    const index = uniqueFlights.findIndex(f => f.id === existing.id);
                    uniqueFlights[index] = flight;
                    seen.set(key, flight);
                    console.log(`      ✅ Keeping JetBay version (more details)`);
                }
            } else {
                seen.set(key, flight);
                uniqueFlights.push(flight);
            }
        }

        this.combinedFlights = uniqueFlights;

        console.log(`\n📊 Deduplication Results:`);
        console.log(`   Unique flights: ${uniqueFlights.length}`);
        console.log(`   Duplicates removed: ${validFlights.length - uniqueFlights.length}`);
        console.log(`   Final breakdown:`);

        const sourceBreakdown = uniqueFlights.reduce((acc, f) => {
            acc[f.source] = (acc[f.source] || 0) + 1;
            return acc;
        }, {});

        for (const [source, count] of Object.entries(sourceBreakdown)) {
            console.log(`      ${source}: ${count} flights`);
        }

        return uniqueFlights;
    }

    transformForSupabase(flight) {
        const extractedData = flight.extractedData;

        // Parse price to numeric
        let priceNumeric = null;
        if (extractedData.priceType === 'fixed') {
            const priceMatch = extractedData.price.match(/[\d,]+/);
            if (priceMatch) {
                // Remove commas and parse
                priceNumeric = parseInt(priceMatch[0].replace(/,/g, ''));
            }
        }

        // Convert date timestamp to proper date
        const flightDate = extractedData.dateTimestamp
            ? new Date(extractedData.dateTimestamp).toISOString().split('T')[0]
            : null;

        // Extract and validate image URLs
        const imageUrls = flight.images
            ?.map(img => img.src)
            ?.filter(src => src && src.trim().length > 0 && src.startsWith('http'))
            || [];

        // Use random default image if no valid images available (provides variety)
        const finalImageUrls = imageUrls.length > 0 ? imageUrls : [getRandomDefaultImage()];

        // Log image handling for debugging
        if (imageUrls.length === 0) {
            console.log(`   📸 Using random default image for flight ${flight.id} (${extractedData.route?.summary}): ${finalImageUrls[0]}`);
        }

        return {
            flight_id: flight.id,
            raw_text: flight.rawText,
            price: extractedData.price,
            price_numeric: priceNumeric,
            price_type: extractedData.priceType || 'enquire',
            currency: 'USD',
            flight_date: flightDate,
            date_timestamp: extractedData.dateTimestamp,
            aircraft: extractedData.aircraft || 'Private Jet',
            seats: extractedData.seats, // null is acceptable (FlyXO doesn't provide seat info)
            from_city: extractedData.from?.city,
            from_country: extractedData.from?.country,
            from_formatted: extractedData.from?.formatted,
            to_city: extractedData.to?.city,
            to_country: extractedData.to?.country,
            to_formatted: extractedData.to?.formatted,
            route_summary: extractedData.route?.summary,
            involves_korea: extractedData.involvesKorea,
            is_active: true,
            scraped_timestamp: extractedData.timestamp,
            last_seen_at: new Date().toISOString(),
            image_urls: finalImageUrls,
            source: flight.source
        };
    }

    async uploadToSupabase() {
        console.log('\n🚀 Starting unified Supabase upload with price update logic...');

        if (this.combinedFlights.length === 0) {
            console.log('⚠️  No flights to upload');
            return;
        }

        try {
            // Get all currently active flights from both sources
            console.log('🔍 Getting all currently active flights from database...');
            const { data: activeFlights, error: fetchError } = await this.supabase
                .from(config.tableName)
                .select('id, flight_id, from_city, to_city, flight_date, price_numeric, source, created_at')
                .eq('is_active', true);

            if (fetchError) {
                console.error('❌ Error fetching active flights:', fetchError);
                throw fetchError;
            }

            console.log(`📊 Found ${activeFlights?.length || 0} active flights in database`);

            // Transform data for Supabase
            const transformedFlights = this.combinedFlights.map(flight => this.transformForSupabase(flight));

            // Check for route+date duplicates and update prices
            console.log('\n💰 Checking for flights with updated prices and deactivating old duplicates...');
            const priceUpdates = [];
            const flightsToInsert = [];
            const flightsToDeactivate = [];

            for (const newFlight of transformedFlights) {
                // Find ALL existing flights with same route, date, and source
                const existingFlights = (activeFlights || []).filter(f =>
                    f.from_city === newFlight.from_city &&
                    f.to_city === newFlight.to_city &&
                    f.flight_date === newFlight.flight_date &&
                    f.source === newFlight.source
                );

                if (existingFlights.length > 0) {
                    // Sort by created_at to find the oldest (first created)
                    existingFlights.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

                    // Update the oldest flight with new price
                    const primaryFlight = existingFlights[0];

                    // Check if price has changed
                    if (primaryFlight.price_numeric !== newFlight.price_numeric) {
                        priceUpdates.push({
                            id: primaryFlight.id,
                            flight_id: primaryFlight.flight_id,
                            route: `${newFlight.from_city} → ${newFlight.to_city}`,
                            date: newFlight.flight_date,
                            oldPrice: primaryFlight.price_numeric,
                            newPrice: newFlight.price_numeric,
                            newFlightData: newFlight
                        });
                        console.log(`   💸 Price change detected:`);
                        console.log(`      Route: ${newFlight.from_city} → ${newFlight.to_city}`);
                        console.log(`      Date: ${newFlight.flight_date}`);
                        console.log(`      Old price: $${primaryFlight.price_numeric}`);
                        console.log(`      New price: $${newFlight.price_numeric}`);
                    } else {
                        // Same price, just update last_seen_at
                        await this.supabase
                            .from(config.tableName)
                            .update({ last_seen_at: new Date().toISOString() })
                            .eq('id', primaryFlight.id);
                    }

                    // Deactivate all duplicate flights (keep only the oldest/primary one)
                    if (existingFlights.length > 1) {
                        const duplicates = existingFlights.slice(1); // All except the first one
                        console.log(`   🔄 Found ${duplicates.length} duplicate(s) for ${newFlight.from_city} → ${newFlight.to_city} on ${newFlight.flight_date}`);
                        for (const dup of duplicates) {
                            flightsToDeactivate.push({
                                id: dup.id,
                                flight_id: dup.flight_id,
                                route: `${newFlight.from_city} → ${newFlight.to_city}`,
                                price: dup.price_numeric
                            });
                            console.log(`      ⛔ Deactivating duplicate flight ID ${dup.id} (price: $${dup.price_numeric})`);
                        }
                    }
                } else {
                    // New flight
                    flightsToInsert.push(newFlight);
                }
            }

            // Deactivate duplicate flights
            if (flightsToDeactivate.length > 0) {
                console.log(`\n🚫 Deactivating ${flightsToDeactivate.length} duplicate flights...`);
                const { error: deactivateError } = await this.supabase
                    .from(config.tableName)
                    .update({
                        is_active: false,
                        archived_at: new Date().toISOString()
                    })
                    .in('id', flightsToDeactivate.map(f => f.id));

                if (deactivateError) {
                    console.error('❌ Error deactivating duplicate flights:', deactivateError);
                } else {
                    console.log(`✅ Successfully deactivated ${flightsToDeactivate.length} duplicate flights`);
                }
            }

            // Update flights with new prices
            if (priceUpdates.length > 0) {
                console.log(`\n🔄 Updating ${priceUpdates.length} flights with new prices...`);
                for (const update of priceUpdates) {
                    const { error: updateError } = await this.supabase
                        .from(config.tableName)
                        .update({
                            price: update.newFlightData.price,
                            price_numeric: update.newFlightData.price_numeric,
                            last_seen_at: new Date().toISOString(),
                            // Also update other fields that might have changed
                            raw_text: update.newFlightData.raw_text,
                            aircraft: update.newFlightData.aircraft,
                            seats: update.newFlightData.seats,
                            image_urls: update.newFlightData.image_urls
                        })
                        .eq('id', update.id);

                    if (updateError) {
                        console.error(`❌ Error updating flight ${update.flight_id}:`, updateError);
                    } else {
                        console.log(`   ✅ Updated ${update.route} on ${update.date}: $${update.oldPrice} → $${update.newPrice}`);
                    }
                }
            }

            // Archive old flights (not in current scrape and past date)
            const today = new Date().toISOString().split('T')[0];
            const newFlightKeys = transformedFlights.map(f =>
                `${f.from_city}_${f.to_city}_${f.flight_date}_${f.source}`
            );

            const flightsToArchive = (activeFlights || [])
                .filter(flight => {
                    const key = `${flight.from_city}_${flight.to_city}_${flight.flight_date}_${flight.source}`;
                    const notInCurrentScrape = !newFlightKeys.includes(key);
                    const isPastDate = flight.flight_date && flight.flight_date < today;
                    return notInCurrentScrape && isPastDate;
                });

            if (flightsToArchive.length > 0) {
                console.log(`\n📦 Archiving ${flightsToArchive.length} flights that are no longer available...`);
                const { error: archiveError } = await this.supabase
                    .from(config.tableName)
                    .update({ is_active: false, archived_at: new Date().toISOString() })
                    .in('id', flightsToArchive.map(f => f.id));

                if (archiveError) {
                    console.error('❌ Error archiving flights:', archiveError);
                } else {
                    console.log(`✅ Successfully archived ${flightsToArchive.length} flights`);
                }
            }

            // Insert new flights
            if (flightsToInsert.length > 0) {
                console.log(`\n📤 Inserting ${flightsToInsert.length} new flights...`);
                const batchSize = 10;
                for (let i = 0; i < flightsToInsert.length; i += batchSize) {
                    const batch = flightsToInsert.slice(i, i + batchSize);
                    console.log(`   Inserting batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(flightsToInsert.length / batchSize)}...`);

                    const { error: insertError } = await this.supabase
                        .from(config.tableName)
                        .insert(batch);

                    if (insertError) {
                        console.error(`❌ Error inserting batch:`, insertError);
                    } else {
                        console.log(`   ✅ Successfully inserted ${batch.length} flights`);
                    }
                }
            }

            console.log('\n📊 Upload Summary:');
            console.log(`   Price updates: ${priceUpdates.length}`);
            console.log(`   Duplicates deactivated: ${flightsToDeactivate.length}`);
            console.log(`   New flights: ${flightsToInsert.length}`);
            console.log(`   Archived flights: ${flightsToArchive.length}`);
            console.log('\n✅ Supabase upload completed successfully!');

        } catch (error) {
            console.error('❌ Upload error:', error);
            throw error;
        }
    }

    async saveToFile() {
        const timestamp = new Date().toISOString().split('T')[0];
        const filename = `combined_flights_${timestamp}.json`;

        console.log('💾 Saving combined data to JSON file...');

        try {
            // Calculate statistics
            const withSeats = this.combinedFlights.filter(f => f.extractedData.seats !== null).length;
            const withoutSeats = this.combinedFlights.filter(f => f.extractedData.seats === null).length;
            const withDefaultImage = this.combinedFlights.filter(f =>
                !f.images || f.images.length === 0
            ).length;

            const jsonData = JSON.stringify({
                metadata: {
                    scrapedAt: new Date().toISOString(),
                    totalFlights: this.combinedFlights.length,
                    sources: ['flyxo', 'jetbay'],
                    breakdown: {
                        flyxo: this.combinedFlights.filter(f => f.source === 'flyxo').length,
                        jetbay: this.combinedFlights.filter(f => f.source === 'jetbay').length
                    },
                    dataQuality: {
                        withSeats: withSeats,
                        withoutSeats: withoutSeats,
                        withDefaultImage: withDefaultImage,
                        notes: [
                            'FlyXO source does not provide seat information (null is expected)',
                            'FlyXO source does not provide images (default image is used)',
                            'All flights are validated for location data, dates, and prices'
                        ]
                    }
                },
                flights: this.combinedFlights
            }, null, 2);

            await fs.writeFile(filename, jsonData, 'utf-8');
            console.log(`✅ Data saved to ${filename}`);
        } catch (error) {
            console.error('❌ Error saving file:', error.message);
        }
    }

    async run() {
        try {
            await this.initialize();

            // Clear any previous unknown cities log
            clearUnknownCitiesLog();

            // Run both scrapers in parallel
            console.log('⏳ Starting parallel scraping...\n');
            const [flyxoCount, jetbayCount] = await Promise.all([
                this.scrapeFlyXO(),
                this.scrapeJetBay()
            ]);

            if (flyxoCount === 0 && jetbayCount === 0) {
                console.log('❌ Both scrapers failed - nothing to upload');
                return;
            }

            // Combine and deduplicate
            await this.combineAndDeduplicate();

            // Save to file
            await this.saveToFile();

            // Upload to Supabase
            await this.uploadToSupabase();

            // Final summary
            console.log('\n🎉 Process completed successfully!');
            console.log(`📊 Final Statistics:`);
            console.log(`   Sources scraped: FlyXO + JetBay`);
            console.log(`   Total unique flights: ${this.combinedFlights.length}`);
            console.log(`   FlyXO: ${this.combinedFlights.filter(f => f.source === 'flyxo').length}`);
            console.log(`   JetBay: ${this.combinedFlights.filter(f => f.source === 'jetbay').length}`);

            // Report any unknown cities that need to be added
            const unknownCities = getUnknownCities();
            if (unknownCities.length > 0) {
                console.log(`\n⚠️  ACTION REQUIRED: Unknown cities encountered during this run:`);
                console.log(`   Please add these cities to city-database.js to prevent future filtering:`);
                unknownCities.forEach(city => console.log(`   - "${city}"`));
            }

            if (this.combinedFlights.length > 0) {
                console.log(`\n📋 Complete list of routes found:`);
                this.combinedFlights.forEach((flight, index) => {
                    console.log(`${index + 1}. [${flight.source}] ${flight.extractedData.route.summary} - ${flight.extractedData.price} (${flight.extractedData.date})`);
                });
            }

            console.log('\n✨ Combined crawling and upload session completed successfully!');

        } catch (error) {
            console.error('\n❌ Fatal error:', error);
            throw error;
        }
    }
}

// Main execution
(async () => {
    const crawler = new CombinedCrawler();
    try {
        await crawler.run();
        process.exit(0);
    } catch (error) {
        console.error('Script failed:', error);
        process.exit(1);
    }
})();
