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

const execAsync = promisify(exec);

// Configuration
const config = {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY,
    tableName: process.env.DATABASE_TABLE_NAME || 'flights'
};

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
     * @returns {Object} { isValid: boolean, reason: string }
     */
    validateFlight(flight) {
        const data = flight.extractedData;

        // Check for Unknown country (invalid location data)
        if (data.from?.country === 'Unknown' || data.to?.country === 'Unknown') {
            return {
                isValid: false,
                reason: `Unknown location (${data.from?.country === 'Unknown' ? data.from.city : data.to.city})`
            };
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
        return { isValid: true, reason: null };
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

        for (const flight of allFlights) {
            const validation = this.validateFlight(flight);

            if (validation.isValid) {
                validFlights.push(flight);
            } else {
                invalidFlights.push({ flight, reason: validation.reason });
                console.log(`   ❌ Filtered out [${flight.source}]: ${flight.extractedData.route?.summary || 'Unknown route'} - ${validation.reason}`);
            }
        }

        console.log(`\n📊 Validation Results:`);
        console.log(`   Valid flights: ${validFlights.length}`);
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

        // Use default image if no valid images available
        const DEFAULT_IMAGE = 'https://xsctqzbwa1mbabgs.public.blob.vercel-storage.com/1.webp';
        const finalImageUrls = imageUrls.length > 0 ? imageUrls : [DEFAULT_IMAGE];

        // Log image handling for debugging
        if (imageUrls.length === 0) {
            console.log(`   📸 Using default image for flight ${flight.id} (${extractedData.route?.summary})`);
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
        console.log('\n🚀 Starting unified Supabase upload...');

        if (this.combinedFlights.length === 0) {
            console.log('⚠️  No flights to upload');
            return;
        }

        try {
            // Get all currently active flights from both sources
            console.log('🔍 Getting all currently active flights from database...');
            const { data: activeFlights, error: fetchError } = await this.supabase
                .from(config.tableName)
                .select('flight_id, from_formatted, to_formatted, flight_date, source')
                .eq('is_active', true);

            if (fetchError) {
                console.error('❌ Error fetching active flights:', fetchError);
                throw fetchError;
            }

            console.log(`📊 Found ${activeFlights?.length || 0} active flights in database`);

            // Transform data for Supabase
            const transformedFlights = this.combinedFlights.map(flight => this.transformForSupabase(flight));
            const newFlightIds = transformedFlights.map(f => f.flight_id);

            // Determine which flights to archive
            // Only archive flights that are:
            // 1. Not in current scrape AND
            // 2. Have past flight dates (no longer valid)
            const today = new Date().toISOString().split('T')[0];
            const activeFlightIds = activeFlights?.map(f => f.flight_id) || [];
            const flightsToArchive = (activeFlights || [])
                .filter(flight => {
                    const notInCurrentScrape = !newFlightIds.includes(flight.flight_id);
                    const isPastDate = flight.flight_date && flight.flight_date < today;
                    return notInCurrentScrape && isPastDate;
                })
                .map(f => f.flight_id);

            // Determine which flights are new vs existing
            const existingFlightIds = activeFlightIds.filter(id => newFlightIds.includes(id));
            const newFlights = transformedFlights.filter(f => !existingFlightIds.includes(f.flight_id));

            console.log(`📊 Upload Summary:`);
            console.log(`   Total flights to upload: ${transformedFlights.length}`);
            console.log(`   Active flights in DB: ${activeFlights?.length || 0}`);
            console.log(`   Flights to archive: ${flightsToArchive.length}`);
            console.log(`   Existing flights to update: ${existingFlightIds.length}`);
            console.log(`   New flights to insert: ${newFlights.length}\n`);

            // Archive old flights
            if (flightsToArchive.length > 0) {
                console.log(`📦 Archiving ${flightsToArchive.length} flights that are no longer available...`);
                const { error: archiveError } = await this.supabase
                    .from(config.tableName)
                    .update({ is_active: false, archived_at: new Date().toISOString() })
                    .in('flight_id', flightsToArchive);

                if (archiveError) {
                    console.error('❌ Error archiving flights:', archiveError);
                } else {
                    console.log(`✅ Successfully archived ${flightsToArchive.length} flights`);
                }
            }

            // Update existing flights
            if (existingFlightIds.length > 0) {
                console.log(`🔄 Updating ${existingFlightIds.length} existing flights...`);
                for (const flight of transformedFlights.filter(f => existingFlightIds.includes(f.flight_id))) {
                    const { error: updateError } = await this.supabase
                        .from(config.tableName)
                        .update({ last_seen_at: new Date().toISOString() })
                        .eq('flight_id', flight.flight_id);

                    if (updateError) {
                        console.error(`❌ Error updating flight ${flight.flight_id}:`, updateError);
                    }
                }
                console.log(`✅ Successfully updated ${existingFlightIds.length} flights`);
            }

            // Insert new flights
            if (newFlights.length > 0) {
                console.log(`📤 Uploading ${newFlights.length} new flights...`);
                const batchSize = 10;
                for (let i = 0; i < newFlights.length; i += batchSize) {
                    const batch = newFlights.slice(i, i + batchSize);
                    console.log(`   Uploading batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(newFlights.length / batchSize)}...`);

                    const { error: insertError } = await this.supabase
                        .from(config.tableName)
                        .insert(batch);

                    if (insertError) {
                        console.error(`❌ Error inserting batch:`, insertError);
                    } else {
                        console.log(`   ✅ Successfully uploaded ${batch.length} flights`);
                    }
                }
            }

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
