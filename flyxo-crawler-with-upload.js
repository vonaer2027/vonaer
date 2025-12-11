/**
 * FlyXO Empty Leg Scraper with Supabase Upload
 *
 * Purpose:
 * 1. Scrapes flight deals from https://flyxo.com/flight-deals/
 * 2. Filters for Seoul (ICN/GMP) related flights only
 * 3. Automatically uploads to Supabase with duplicate prevention
 *
 * Data Structure: Matches unified-crawler-with-upload.js format
 */

require('dotenv').config();
const puppeteer = require('puppeteer');
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs').promises;
const { parseLocation, splitConcatenatedRoute, getUnknownCities, generateFlightId } = require('./city-database');

// Configuration
const config = {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY,
    tableName: process.env.DATABASE_TABLE_NAME || 'flights',
    saveToFile: process.env.SAVE_TO_FILE !== 'false',
    headless: process.env.HEADLESS !== 'false' // Default true (headless)
};

class FlyXOCrawler {
    constructor() {
        this.browser = null;
        this.page = null;
        this.flightData = [];
        this.supabase = null;
    }

    async initialize() {
        console.log('🚀 FlyXO Empty Leg Crawler with Supabase Upload');
        console.log('==================================================');
        console.log('📍 Target: https://flyxo.com/flight-deals/');
        console.log('🔍 Filter: Seoul (ICN/GMP) to/from flights only');
        console.log('💰 Currency: USD');
        console.log('✨ Features: Crawl → Process → Upload to Supabase\n');

        // Initialize Supabase
        if (!config.supabaseUrl || !config.supabaseKey) {
            throw new Error('Missing Supabase credentials. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env');
        }

        this.supabase = createClient(config.supabaseUrl, config.supabaseKey);
        console.log('✅ Supabase client initialized');

        // Initialize Puppeteer
        console.log('🔧 Initializing Chrome browser...');

        const executablePath = puppeteer.executablePath();
        console.log(`✅ Found Chrome at: ${executablePath}`);

        const launchOptions = {
            headless: config.headless ? 'new' : false,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-web-security',
                '--ignore-certificate-errors',
                '--ignore-ssl-errors',
                '--disable-gpu',
                '--disable-blink-features=AutomationControlled',
                '--window-size=1920,1080'
            ],
            defaultViewport: { width: 1920, height: 1080 }
        };

        this.browser = await puppeteer.launch(launchOptions);
        this.page = await this.browser.newPage();

        // Set user agent to avoid detection
        await this.page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

        console.log('✅ Browser initialized successfully');
    }

    async loadFlightDeals() {
        console.log('🌐 Loading FlyXO flight deals page...');

        try {
            await this.page.goto('https://flyxo.com/flight-deals/', {
                waitUntil: 'networkidle2',
                timeout: 60000
            });

            console.log('✅ Page loaded successfully');

            // Wait for flight cards to load
            console.log('⏳ Waiting for flight data to load...');
            await new Promise(resolve => setTimeout(resolve, 5000));

            // Try to load more flights by scrolling
            console.log('📜 Scrolling to load all flights...');
            await this.scrollToLoadAllFlights();

        } catch (error) {
            console.error('❌ Failed to load page:', error.message);
            throw error;
        }
    }

    async scrollToLoadAllFlights() {
        let previousHeight = 0;
        let attempts = 0;
        const maxAttempts = 10;

        while (attempts < maxAttempts) {
            // Scroll to bottom
            await this.page.evaluate(() => {
                window.scrollTo(0, document.body.scrollHeight);
            });

            // Wait for potential lazy loading
            await new Promise(resolve => setTimeout(resolve, 3000));

            const currentHeight = await this.page.evaluate(() => document.body.scrollHeight);

            if (currentHeight === previousHeight) {
                console.log('✅ No more flights to load after scroll');
                break;
            }

            previousHeight = currentHeight;
            attempts++;
        }

        console.log(`📊 Finished scrolling after ${attempts} attempts`);
    }

    async extractFlightData() {
        console.log('📊 Extracting flight data...');

        // First, take a screenshot for debugging
        await this.page.screenshot({ path: 'flyxo-debug.png', fullPage: true });
        console.log('📸 Screenshot saved to flyxo-debug.png for debugging');

        try {
            // Check what's actually on the page
            const pageInfo = await this.page.evaluate(() => {
                return {
                    title: document.title,
                    bodyText: document.body.innerText.substring(0, 1000),
                    hasDeals: document.body.innerText.toLowerCase().includes('deal'),
                    hasFlights: document.body.innerText.toLowerCase().includes('flight'),
                    allElements: document.querySelectorAll('*').length
                };
            });

            console.log('📄 Page Info:');
            console.log(`   Title: ${pageInfo.title}`);
            console.log(`   Has "deal": ${pageInfo.hasDeals}`);
            console.log(`   Has "flight": ${pageInfo.hasFlights}`);
            console.log(`   Total elements: ${pageInfo.allElements}`);
            console.log(`   Body text sample:\n${pageInfo.bodyText}\n`);

            // Extract RAW flight data from the page (no location processing yet)
            const rawFlights = await this.page.evaluate(() => {
                const extractedFlights = [];

                // FlyXO displays flights as plain text, not in HTML cards
                // Parse from body text directly
                const bodyText = document.body.innerText;
                const lines = bodyText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

                // Find "All deals" section
                const dealsStartIndex = lines.findIndex(line => line.includes('All deals'));
                if (dealsStartIndex === -1) {
                    return { error: 'No "All deals" section found', flights: [] };
                }

                // Parse flights from text - FlyXO format:
                // Day name (e.g., "Wednesday")
                // Date (e.g., "19 NOV")
                // Route (e.g., "SeoulHIROSHIMA" - no space between cities)
                // Type (e.g., "Empty leg")
                // Price (e.g., "$12,500")

                let i = dealsStartIndex + 1;
                let flightIndex = 0;
                const debugInfo = {
                    totalLines: lines.length,
                    dealsStartIndex: dealsStartIndex,
                    seoulFlightsFound: 0
                };

                while (i < lines.length - 4) {
                    const dayName = lines[i];
                    const dateStr = lines[i + 1];
                    const routeStr = lines[i + 2];
                    const typeStr = lines[i + 3];
                    const priceStr = lines[i + 4];

                    // Check if this looks like a flight entry
                    if (dateStr && /\d{1,2}\s+\w{3}/.test(dateStr) &&
                        routeStr && routeStr.length > 2 &&
                        priceStr && priceStr.startsWith('$')) {

                        // Check if route involves Korea (case-insensitive)
                        // Include all Korean cities: Seoul, Busan, Jeju, and airport codes
                        const involvesKorea = /seoul|busan|jeju|incheon|gimpo|korea|icn|gmp|pus|cju/i.test(routeStr);

                        if (involvesKorea) {
                            debugInfo.seoulFlightsFound++;

                            // Parse price
                            const priceMatch = priceStr.match(/\$\s*([\d,]+)/);
                            const price = priceMatch ? priceMatch[1].replace(/,/g, '') : null;

                            // Parse date - format is "19 NOV"
                            let timestamp = null;
                            if (dateStr) {
                                const dateParts = dateStr.match(/(\d{1,2})\s+(\w{3})/);
                                if (dateParts) {
                                    const monthMap = {
                                        'JAN': 0, 'FEB': 1, 'MAR': 2, 'APR': 3, 'MAY': 4, 'JUN': 5,
                                        'JUL': 6, 'AUG': 7, 'SEP': 8, 'OCT': 9, 'NOV': 10, 'DEC': 11
                                    };
                                    const day = parseInt(dateParts[1]);
                                    const month = monthMap[dateParts[2].toUpperCase()];
                                    const year = new Date().getFullYear();

                                    // Handle year rollover (if month is in the past, assume next year)
                                    const now = new Date();
                                    let targetYear = year;
                                    if (month < now.getMonth() || (month === now.getMonth() && day < now.getDate())) {
                                        targetYear = year + 1;
                                    }

                                    // Use UTC to avoid timezone issues when converting to ISO string
                                    timestamp = Date.UTC(targetYear, month, day);
                                }
                            }

                            const fullDateStr = `${dayName}, ${dateStr}`;

                            // Return RAW data - location processing happens in Node.js
                            extractedFlights.push({
                                flightIndex,
                                dayName,
                                dateStr,
                                routeStr,  // Raw route string like "VIENTIANESeoul" or "SeoulLos Angeles"
                                typeStr,
                                priceStr,
                                price,
                                timestamp,
                                fullDateStr
                            });

                            flightIndex++;
                        }

                        i += 5; // Move to next flight
                    } else {
                        i++;
                    }
                }

                return {
                    flights: extractedFlights,
                    debug: debugInfo
                };
            });

            // Handle the result
            if (rawFlights.error) {
                console.log(`❌ ${rawFlights.error}`);
                return [];
            }

            console.log(`🔍 Debug Info:`);
            console.log(`   Total lines after cleanup: ${rawFlights.debug.totalLines}`);
            console.log(`   "All deals" found at line: ${rawFlights.debug.dealsStartIndex}`);
            console.log(`   Seoul flights found: ${rawFlights.debug.seoulFlightsFound}`);

            // Process locations in Node.js context using city database
            console.log('🌍 Processing locations with city database...');
            const processedFlights = rawFlights.flights.map(raw => {
                // Use the robust route splitting from city-database
                const { from: fromCity, to: toCity } = splitConcatenatedRoute(raw.routeStr);

                // Parse locations using the comprehensive city database
                const fromLocation = parseLocation(fromCity);
                const toLocation = parseLocation(toCity || 'Unknown');

                // Generate deterministic flight ID based on route + date + price
                const flightDate = raw.timestamp ? new Date(raw.timestamp).toISOString().split('T')[0] : raw.dateStr;
                const flightId = generateFlightId('flyxo', fromLocation.city, toLocation.city, flightDate, raw.price);

                console.log(`   Route: "${raw.routeStr}" → ${fromLocation.formatted} → ${toLocation.formatted} [ID: ${flightId}]`);

                return {
                    id: flightId,
                    rawText: `${raw.dayName} ${raw.dateStr} ${raw.routeStr} ${raw.typeStr} ${raw.priceStr}`,
                    extractedData: {
                        price: raw.price ? `${raw.price} USD` : raw.priceStr,
                        priceType: raw.price ? 'fixed' : 'enquire',
                        date: raw.fullDateStr,
                        dateTimestamp: raw.timestamp,
                        aircraft: 'Private Jet',
                        seats: null,
                        from: fromLocation,
                        to: toLocation,
                        route: {
                            from: fromLocation.formatted,
                            to: toLocation.formatted,
                            summary: `${fromLocation.formatted} → ${toLocation.formatted}`
                        },
                        involvesKorea: true,
                        timestamp: new Date().toISOString(),
                        source: 'flyxo'
                    },
                    images: []
                };
            });

            console.log(`📊 Initial extraction: ${processedFlights.length} Seoul flight records`);

            // Log any unknown cities encountered
            const unknownCities = getUnknownCities();
            if (unknownCities.length > 0) {
                console.log(`\n⚠️  Unknown cities encountered (add to city-database.js):`);
                unknownCities.forEach(city => console.log(`   - "${city}"`));
                console.log('');
            }

            // Remove duplicates
            console.log('🔍 Checking for duplicates...');
            const uniqueFlights = [];
            const seen = new Set();

            processedFlights.forEach(flight => {
                const key = `${flight.extractedData.route.from}→${flight.extractedData.route.to}_${flight.extractedData.date}_${flight.extractedData.price}_${flight.extractedData.aircraft}`;
                if (!seen.has(key)) {
                    seen.add(key);
                    uniqueFlights.push(flight);
                } else {
                    console.log(`   Skipping duplicate: ${flight.extractedData.route.summary} (${flight.extractedData.aircraft})`);
                }
            });

            const duplicatesRemoved = processedFlights.length - uniqueFlights.length;
            if (duplicatesRemoved > 0) {
                console.log(`🗑️ Removed ${duplicatesRemoved} exact duplicate flights`);
            }

            this.flightData = uniqueFlights;
            console.log(`✅ Final result: ${uniqueFlights.length} unique Seoul flights`);

            return uniqueFlights;

        } catch (error) {
            console.error('❌ Error extracting flight data:', error);
            throw error;
        }
    }

    async saveToFile() {
        if (!config.saveToFile) {
            console.log('⏭️  File saving disabled');
            return;
        }

        const timestamp = new Date().toISOString().split('T')[0];
        const filename = `flyxo_seoul_flights_${timestamp}.json`;

        console.log('💾 Saving data to JSON file...');

        try {
            const jsonData = JSON.stringify(this.flightData, null, 2);
            await fs.writeFile(filename, jsonData, 'utf-8');
            console.log(`✅ Data saved to ${filename}`);
        } catch (error) {
            console.error('❌ Error saving file:', error.message);
        }
    }

    transformForSupabase(flight) {
        const extractedData = flight.extractedData;

        // Parse price to numeric
        let priceNumeric = null;
        if (extractedData.priceType === 'fixed') {
            const priceMatch = extractedData.price.match(/\d+/);
            priceNumeric = priceMatch ? parseInt(priceMatch[0]) : null;
        }

        // Convert date timestamp to proper date
        const flightDate = extractedData.dateTimestamp
            ? new Date(extractedData.dateTimestamp).toISOString().split('T')[0]
            : null;

        // Extract image URLs
        const imageUrls = flight.images?.map(img => img.src) || [];

        // Use default image if no images available
        const DEFAULT_IMAGE = 'https://xsctqzbwa1mbabgs.public.blob.vercel-storage.com/1.webp';
        const finalImageUrls = imageUrls.length > 0 ? imageUrls : [DEFAULT_IMAGE];

        return {
            flight_id: flight.id,
            raw_text: flight.rawText,
            price: extractedData.price,
            price_numeric: priceNumeric,
            price_type: extractedData.priceType || 'enquire',
            currency: 'USD',
            flight_date: flightDate,
            date_timestamp: extractedData.dateTimestamp,
            aircraft: extractedData.aircraft,
            seats: extractedData.seats,
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
            source: 'flyxo'
        };
    }

    async uploadToSupabase() {
        console.log('\n🚀 Starting Supabase upload process...');

        if (this.flightData.length === 0) {
            console.log('⚠️ No flights to upload');
            return;
        }

        try {
            // Get all currently active flights from FlyXO
            console.log('🔍 Getting all currently active FlyXO flights from database...');
            const { data: activeFlights, error: fetchError } = await this.supabase
                .from(config.tableName)
                .select('flight_id, from_formatted, to_formatted, flight_date')
                .eq('is_active', true)
                .like('flight_id', 'flyxo_%');

            if (fetchError) {
                console.error('❌ Error fetching active flights:', fetchError);
                throw fetchError;
            }

            console.log(`📊 Found ${activeFlights?.length || 0} active FlyXO flights in database`);

            // Transform data for Supabase
            const transformedFlights = this.flightData.map(flight => this.transformForSupabase(flight));
            const newFlightIds = transformedFlights.map(f => f.flight_id);

            // Determine which flights to archive (active in DB but not in current scrape)
            const activeFlightIds = activeFlights?.map(f => f.flight_id) || [];
            const flightsToArchive = activeFlightIds.filter(id => !newFlightIds.includes(id));

            // Determine which flights are new vs existing
            const existingFlightIds = activeFlightIds.filter(id => newFlightIds.includes(id));
            const newFlights = transformedFlights.filter(f => !existingFlightIds.includes(f.flight_id));

            console.log(`📊 Upload Summary:`);
            console.log(`   Total flights scraped: ${transformedFlights.length}`);
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

    async cleanup() {
        console.log('🧹 Cleaning up resources...');
        if (this.browser) {
            await this.browser.close();
            console.log('✅ Browser closed successfully');
        }
    }

    async run() {
        try {
            await this.initialize();
            await this.loadFlightDeals();
            await this.extractFlightData();
            await this.saveToFile();

            // Skip upload if running from combined scraper
            if (process.env.SKIP_UPLOAD !== 'true') {
                await this.uploadToSupabase();
            } else {
                console.log('⏭️  Skipping Supabase upload (running from combined scraper)');
            }

            console.log('\n🎉 Process completed successfully!');
            console.log(`📁 Data saved to: flyxo_seoul_flights_${new Date().toISOString().split('T')[0]}.json`);
            console.log(`\n📊 Final Statistics:`);
            console.log(`   Flights scraped: ${this.flightData.length}`);
            console.log(`   Source: FlyXO`);
            console.log(`   Filter: Seoul (ICN/GMP) flights only`);

            if (this.flightData.length > 0) {
                console.log(`\n📋 Complete list of routes found:`);
                this.flightData.forEach((flight, index) => {
                    console.log(`${index + 1}. ${flight.extractedData.route.summary} - ${flight.extractedData.price} (${flight.extractedData.date})`);
                });
            }

            console.log('\n✨ Crawling and upload session completed successfully!');

        } catch (error) {
            console.error('\n❌ Fatal error:', error);
            throw error;
        } finally {
            await this.cleanup();
        }
    }
}

// Main execution
(async () => {
    const crawler = new FlyXOCrawler();
    try {
        await crawler.run();
        process.exit(0);
    } catch (error) {
        console.error('Script failed:', error);
        process.exit(1);
    }
})();
