#!/usr/bin/env node

/**
 * Unified Jet-Bay Crawler with Supabase Upload
 * 
 * This script combines web crawling and database upload into a single process:
 * 1. Crawls Jet-Bay for South Korea flights
 * 2. Processes and formats the data
 * 3. Automatically uploads to Supabase with duplicate prevention
 */

require('dotenv').config();
const puppeteer = require('puppeteer');
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const config = {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY,
    tableName: process.env.DATABASE_TABLE_NAME || 'flights',
    saveToFile: process.env.SAVE_TO_FILE !== 'false', // Default true, set to 'false' to skip file saving
    headless: process.env.HEADLESS !== 'false' // Default true (headless), set to 'false' for debugging
};

class UnifiedJetBayCrawlerWithUpload {
    constructor() {
        this.browser = null;
        this.page = null;
        this.flightData = [];
        this.supabase = null;
    }

    // Detect Chrome/Chromium executable path based on environment
    getChromePath() {
        const fs = require('fs');

        // GitHub Actions / Linux CI environments
        const linuxPaths = [
            '/usr/bin/chromium-browser',
            '/usr/bin/chromium',
            '/usr/bin/google-chrome',
            '/snap/bin/chromium'
        ];

        // macOS paths
        const macPaths = [
            '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
            '/Applications/Chromium.app/Contents/MacOS/Chromium'
        ];

        // Windows paths
        const windowsPaths = [
            'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
            'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
        ];

        const allPaths = [...linuxPaths, ...macPaths, ...windowsPaths];

        // Find first existing path
        for (const path of allPaths) {
            try {
                if (fs.existsSync(path)) {
                    console.log(`✅ Found Chrome at: ${path}`);
                    return path;
                }
            } catch (e) {
                // Continue to next path
            }
        }

        // If none found, return undefined to use Puppeteer's bundled Chromium
        console.log('⚠️  No Chrome/Chromium found, using Puppeteer bundled Chromium');
        return undefined;
    }

    // Validate Supabase configuration
    validateSupabaseConfig() {
        const missing = [];
        if (!config.supabaseUrl) missing.push('SUPABASE_URL');
        if (!config.supabaseKey) missing.push('SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY');
        
        if (missing.length > 0) {
            console.error('❌ Missing required environment variables:');
            missing.forEach(key => console.error(`   - ${key}`));
            console.error('\nPlease create a .env file based on env.example');
            throw new Error('Missing Supabase configuration');
        }
    }

    // Initialize Supabase client
    initializeSupabase() {
        this.validateSupabaseConfig();
        this.supabase = createClient(config.supabaseUrl, config.supabaseKey);
        console.log('✅ Supabase client initialized');
    }

    async initialize() {
        console.log('🚀 Unified Jet-Bay Crawler with Supabase Upload');
        console.log('==================================================');
        console.log('📍 Target: East Asia → View More → South Korea flights only');
        console.log('💰 Currency: USD (US website)');
        console.log('✨ Features: Crawl → Process → Upload to Supabase');
        console.log('');
        
        // Initialize Supabase first
        this.initializeSupabase();
        
        console.log('🔧 Initializing Chrome browser...');
        
        try {
            // Detect Chrome path for the current environment
            const chromePath = this.getChromePath();

            // Launch Chrome with comprehensive settings
            const launchOptions = {
                headless: config.headless ? 'new' : false, // Use new headless mode for better compatibility
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-web-security',
                    '--ignore-certificate-errors',
                    '--ignore-ssl-errors',
                    '--disable-gpu',
                    '--disable-blink-features=AutomationControlled', // Avoid detection
                    '--window-size=1920,1080'
                ],
                defaultViewport: { width: 1920, height: 1080 }
            };

            // Only set executablePath if we found Chrome/Chromium
            if (chromePath) {
                launchOptions.executablePath = chromePath;
            }

            this.browser = await puppeteer.launch(launchOptions);

            this.page = await this.browser.newPage();
            this.page.setDefaultTimeout(30000);

            // Capture browser console logs for debugging (filtered)
            this.page.on('console', msg => {
                const text = msg.text();
                // Only show important logs to reduce noise
                if (text.includes('Found') && text.includes('container') ||
                    text.includes('Split into') ||
                    text.includes('✅') ||
                    text.includes('Error')) {
                    console.log(`   [Browser]: ${text}`);
                }
            });

            // Set user agent to avoid detection
            await this.page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
            
            console.log('✅ Browser initialized successfully');
            
        } catch (error) {
            console.error('❌ Failed to initialize browser:', error.message);
            throw error;
        }
    }

    async loadWebsite() {
        console.log('🌐 Loading Jet-Bay website...');
        
        try {
            await this.page.goto('https://www.jet-bay.com/en-us/empty-leg', {
                waitUntil: 'domcontentloaded',
                timeout: 30000
            });
            
            console.log('✅ Website loaded successfully');

            // Wait for page to fully load
            await new Promise(resolve => setTimeout(resolve, 5000)); // Increased for GitHub Actions
            
        } catch (error) {
            console.error('❌ Failed to load website:', error.message);
            throw error;
        }
    }

    async clickEastAsiaTab() {
        console.log('🎯 Looking for East Asia tab...');
        
        try {
            // Try multiple possible selectors for East Asia tab
            const selectors = [
                'button[data-value="East Asia"]',
                '[role="tab"]',
                'button[class*="tab"]',
                '.tab-button',
                'button'
            ];
            
            let clicked = false;
            
            for (const selector of selectors) {
                try {
                    await this.page.waitForSelector(selector, { timeout: 3000 });
                    
                    // Check if any of these elements contain "East Asia" text
                    const elements = await this.page.$$(selector);
                    for (const element of elements) {
                        const text = await this.page.evaluate(el => el.textContent, element);
                        if (text && text.includes('East Asia')) {
                            await element.click();
                            clicked = true;
                            console.log(`✅ Successfully clicked East Asia tab using selector: ${selector}`);
                            break;
                        }
                    }
                    
                    if (clicked) break;
                } catch (e) {
                    console.log(`⚠️ Selector ${selector} not found, trying next...`);
                    continue;
                }
            }
            
            if (!clicked) {
                // Fallback: try to find any element containing "East Asia" text
                const eastAsiaElement = await this.page.evaluateHandle(() => {
                    const elements = Array.from(document.querySelectorAll('*'));
                    return elements.find(el => 
                        el.textContent && 
                        el.textContent.includes('East Asia') && 
                        (el.tagName === 'BUTTON' || el.onclick || el.getAttribute('role') === 'tab')
                    );
                });
                
                if (eastAsiaElement) {
                    await eastAsiaElement.click();
                    console.log('✅ Successfully clicked East Asia tab using fallback method');
                    clicked = true;
                }
            }
            
            if (!clicked) {
                throw new Error('Could not find East Asia tab with any method');
            }
            
            // Wait for content to load after clicking
            console.log('⏳ Waiting for flight data to load...');
            await new Promise(resolve => setTimeout(resolve, 12000)); // Increased wait time for GitHub Actions
            
        } catch (error) {
            console.error('❌ Failed to click East Asia tab:', error.message);
            throw error;
        }
    }

    async clickViewMoreButtons() {
        console.log('🔍 Loading all flights (button click or scroll)...');

        let attempts = 0;
        const maxAttempts = 15;
        let viewMoreClicked = false;

        while (attempts < maxAttempts) {
            try {
                // Count current flights before attempting to load more
                const currentFlightCount = await this.page.evaluate(() => {
                    const flightCards = document.querySelectorAll('[class*="grid-cols"]');
                    return flightCards.length;
                });

                // First, try to find and click "View More" button
                // Multiple selectors to find the "View More" button
                const selectors = [
                    // Specific selector for the exact button structure you provided
                    'button.z-0.group.relative.inline-flex.items-center.justify-center',
                    // Alternative selectors based on the button content and classes
                    'button[class*="z-0"][class*="group"][class*="relative"][class*="inline-flex"]',
                    'button[class*="bg-white"][class*="cursor-pointer"]',
                    'button[class*="text-jetThird-400"]',
                    // Generic fallback selectors
                    'button:has-text("View More")',
                    'button[class*="view-more"]',
                    'button[class*="load-more"]',
                    '.load-more-btn',
                    '.view-more-btn'
                ];
                
                let viewMoreButton = null;
                
                // Try each selector
                for (const selector of selectors) {
                    try {
                        const buttons = await this.page.$$(selector);
                        for (const button of buttons) {
                            const text = await this.page.evaluate(el => el.textContent?.trim(), button);
                            if (text && text.includes('View More')) {
                                viewMoreButton = button;
                                console.log(`✅ Found "View More" button using selector: ${selector}`);
                                break;
                            }
                        }
                        if (viewMoreButton) break;
                    } catch (e) {
                        continue;
                    }
                }
                
                // Fallback: search for any button containing "View More" text
                if (!viewMoreButton) {
                    viewMoreButton = await this.page.evaluateHandle(() => {
                        const buttons = Array.from(document.querySelectorAll('button'));
                        return buttons.find(button => 
                            button.textContent && 
                            button.textContent.trim().includes('View More')
                        );
                    });
                    
                    // Check if we found a valid button
                    const isValidButton = await this.page.evaluate(button => {
                        return button && button.tagName === 'BUTTON';
                    }, viewMoreButton);
                    
                    if (!isValidButton) {
                        viewMoreButton = null;
                    } else {
                        console.log('✅ Found "View More" button using fallback text search');
                    }
                }
                
                if (viewMoreButton) {
                    console.log(`📄 Clicking "View More" button... (attempt ${attempts + 1})`);
                    
                    // Scroll the button into view and click
                    await this.page.evaluate(button => {
                        button.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, viewMoreButton);
                    
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                    // Try clicking with different methods
                    try {
                        await viewMoreButton.click();
                    } catch (clickError) {
                        console.log('⚠️ Regular click failed, trying JavaScript click...');
                        await this.page.evaluate(button => button.click(), viewMoreButton);
                    }
                    
                    viewMoreClicked = true;

                    // Wait for new content to load - increased wait time for headless mode
                    await new Promise(resolve => setTimeout(resolve, 8000)); // Increased for GitHub Actions reliability

                    console.log(`✅ Clicked "View More" button (attempt ${attempts + 1})`);
                } else {
                    // No "View More" button found - try scrolling to trigger lazy loading
                    console.log('ℹ️  No "View More" button found, trying scroll to trigger lazy loading...');

                    // Scroll to bottom of page
                    await this.page.evaluate(() => {
                        window.scrollTo(0, document.body.scrollHeight);
                    });

                    // Wait for potential lazy loading
                    await new Promise(resolve => setTimeout(resolve, 3000));

                    // Check if more flights loaded
                    const newFlightCount = await this.page.evaluate(() => {
                        const flightCards = document.querySelectorAll('[class*="grid-cols"]');
                        return flightCards.length;
                    });

                    if (newFlightCount === currentFlightCount) {
                        console.log('✅ No new flights loaded after scroll - all flights loaded');
                        break;
                    } else {
                        console.log(`📈 Loaded ${newFlightCount - currentFlightCount} more flights after scroll`);
                    }
                }
            } catch (error) {
                console.log(`⚠️ Error during flight loading: ${error.message}`);
                break;
            }

            attempts++;
        }

        console.log(`📊 Finished loading flights after ${attempts} attempts`);
    }

    async extractFlightData() {
        console.log('📊 Extracting flight data with enhanced formatting...');
        
        try {
            // First, let's debug what elements are available on the page
            const debugInfo = await this.page.evaluate(() => {
                const allElements = document.querySelectorAll('*');
                const elementsWithText = [];
                const elementsWithUSD = [];
                const elementsWithKorea = [];
                
                allElements.forEach((el, index) => {
                    const text = el.textContent || '';
                    if (text.trim().length > 20) {
                        elementsWithText.push({
                            tagName: el.tagName,
                            className: el.className,
                            textLength: text.length,
                            textPreview: text.substring(0, 100)
                        });
                    }
                    if (text.includes('USD') || text.includes('$')) {
                        elementsWithUSD.push({
                            tagName: el.tagName,
                            className: el.className,
                            textPreview: text.substring(0, 200)
                        });
                    }
                    if (text.toLowerCase().includes('korea') || text.toLowerCase().includes('seoul')) {
                        elementsWithKorea.push({
                            tagName: el.tagName,
                            className: el.className,
                            textPreview: text.substring(0, 200)
                        });
                    }
                });
                
                return {
                    totalElements: allElements.length,
                    elementsWithText: elementsWithText.slice(0, 10), // First 10
                    elementsWithUSD: elementsWithUSD.slice(0, 10),
                    elementsWithKorea: elementsWithKorea.slice(0, 10)
                };
            });
            
            console.log('🔍 Debug Info:');
            console.log(`   Total elements on page: ${debugInfo.totalElements}`);
            console.log(`   Elements with USD: ${debugInfo.elementsWithUSD.length}`);
            console.log(`   Elements with Korea: ${debugInfo.elementsWithKorea.length}`);
            
            if (debugInfo.elementsWithUSD.length > 0) {
                console.log('💰 Sample USD elements:');
                debugInfo.elementsWithUSD.forEach((el, i) => {
                    console.log(`   ${i + 1}. ${el.tagName}.${el.className}: ${el.textPreview}`);
                });
            }
            
            if (debugInfo.elementsWithKorea.length > 0) {
                console.log('🇰🇷 Sample Korea elements:');
                debugInfo.elementsWithKorea.forEach((el, i) => {
                    console.log(`   ${i + 1}. ${el.tagName}.${el.className}: ${el.textPreview}`);
                });
            }
            
            const flights = await this.page.evaluate(() => {
                // NEW STRATEGY: Find individual flight cards and extract both text and images
                // Look for cards containing "Model:" text

                // Find all potential flight cards
                const allCards = Array.from(document.querySelectorAll('div, article, section'))
                    .filter(el => {
                        const text = el.textContent || '';
                        return text.includes('Model:') &&
                               text.includes('seats') &&
                               text.length > 50 &&
                               text.length < 1000; // Individual card, not container
                    });

                console.log(`Found ${allCards.length} potential flight cards`);

                const extractedFlights = [];

                allCards.forEach((card, index) => {
                    try {
                        const textContent = card.textContent || '';

                        // Skip if too short
                        if (textContent.length < 80) {
                            return;
                        }

                        // Extract image from card
                        const imgElement = card.querySelector('img');
                        const imageSrc = imgElement ? imgElement.src : null;

                        // Check for "Enquire for Price" or similar patterns
                        const enquirePatterns = [
                            /Enquire\s+for\s+Price/i,
                            /Contact\s+for\s+Price/i,
                            /Request\s+Quote/i,
                            /POA/i  // Price on Application
                        ];

                        const isEnquirePrice = enquirePatterns.some(pattern => pattern.test(textContent));

                        // More flexible price matching
                        const priceMatches = [
                            textContent.match(/(?:From\s*)?([0-9,]+)\s*USD/i),
                            textContent.match(/\$\s*([0-9,]+)/i),
                            textContent.match(/([0-9,]+)\s*\$/i),
                            textContent.match(/USD\s*([0-9,]+)/i)
                        ];

                        const priceMatch = priceMatches.find(match => match !== null);

                        // Skip if neither price nor enquire pattern found
                        if (!priceMatch && !isEnquirePrice) {
                            console.log(`Skipping element ${index}: No price or enquire pattern found`);
                            return;
                        }

                        // More flexible date matching
                        const dateMatches = [
                            textContent.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{1,2}),?\s+(\d{4})/i),
                            textContent.match(/(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})/),
                            textContent.match(/(\d{4})[\/-](\d{1,2})[\/-](\d{1,2})/)
                        ];

                        const dateMatch = dateMatches.find(match => match !== null);

                        // Extract route locations from text AFTER date and BEFORE price
                        // Format: "[date] [City1][Country1] [City2][Country2] [price]"
                        // Dynamic extraction - no hardcoded city lists
                        let locations = [];

                        if (dateMatch) {
                            const datePosition = textContent.indexOf(dateMatch[0]);
                            const pricePosition = textContent.search(/(From\s*\d|Enquire|USD|\$)/i);

                            if (datePosition !== -1 && pricePosition > datePosition) {
                                // Extract text between date and price
                                let routeText = textContent.substring(datePosition + dateMatch[0].length, pricePosition).trim();

                                // Remove airport codes like (ZBAA), (RKSI) etc.
                                routeText = routeText.replace(/\([A-Z]{3,4}\)/g, '');

                                // Insert space before capital letters that follow lowercase
                                // This handles concatenated names like "BeijingChina" -> "Beijing China"
                                const spacedText = routeText.replace(/([a-z])([A-Z])/g, '$1 $2');

                                // Split into words
                                const words = spacedText.split(/\s+/);

                                // Group compound country names that should stay together
                                const knownCompounds = ['South Korea', 'Hong Kong', 'Kuala Lumpur', 'New Zealand', 'Sri Lanka', 'United Arab Emirates', 'Saudi Arabia'];
                                const grouped = [];

                                for (let i = 0; i < words.length; i++) {
                                    const current = words[i];
                                    const next = words[i + 1];

                                    const compound = current + ' ' + next;
                                    if (next && knownCompounds.includes(compound)) {
                                        grouped.push(compound);
                                        i++; // Skip next word since it's part of compound
                                    } else {
                                        grouped.push(current);
                                    }
                                }

                                // Pair up: [city, country, city, country] -> ["city, country", "city, country"]
                                for (let i = 0; i < grouped.length; i += 2) {
                                    const city = grouped[i];
                                    const country = grouped[i + 1];
                                    if (city && country) {
                                        locations.push(city + ', ' + country);
                                    } else if (city) {
                                        locations.push(city);
                                    }
                                }
                            }
                        }

                        // Fallback to old method if route extraction failed
                        if (locations.length < 2) {
                            const countryPatterns = [
                                /(China|Japan|Korea|Singapore|Thailand|Malaysia|Philippines|Vietnam|Indonesia|Taiwan|Hong Kong|Macau|South Korea)/gi,
                                /(Seoul|Busan|Tokyo|Beijing|Shanghai|Bangkok|Kuala Lumpur|Manila|Jakarta|Taipei)/gi
                            ];

                            locations = [];
                            countryPatterns.forEach(pattern => {
                                let match;
                                while ((match = pattern.exec(textContent)) !== null) {
                                    const location = match[1];
                                    if (!locations.some(loc => loc.includes(location))) {
                                        locations.push(location);
                                    }
                                }
                            });
                        }

                        // IMPORTANT: Check if the actual extracted locations (first 2) involve South Korea
                        // Don't check the entire textContent which includes navigation menus
                        const koreaKeywords = ['korea', 'seoul', 'busan', 'incheon', 'gimpo', 'jeju', 'icn', 'gmp', 'pus', 'cju'];
                        const fromToLocations = locations.slice(0, 2); // Only check first 2 locations (from/to)
                        const involvesKorea = fromToLocations.some(location =>
                            koreaKeywords.some(keyword =>
                                location.toLowerCase().includes(keyword)
                            )
                        );

                        if (!involvesKorea) {
                            console.log(`Skipping element ${index}: Route ${locations[0] || '?'} → ${locations[1] || '?'} does not involve South Korea`);
                            return;
                        }

                        
                        // Build flight object with available data
                        const price = isEnquirePrice ? 'Enquire for Price' : (priceMatch ? priceMatch[1] : 'Enquire for Price');
                        const priceType = isEnquirePrice || !priceMatch ? 'enquire' : 'fixed';
                        let dateStr = 'Unknown Date';
                        let timestamp = Date.now();
                        
                        if (dateMatch) {
                            if (dateMatch.length === 4) { // Month Day Year format
                                const month = dateMatch[1];
                                const day = dateMatch[2];
                                const year = dateMatch[3];
                                dateStr = `${month} ${day}, ${year}`;
                                // Parse as UTC to avoid timezone offset issues
                                timestamp = Date.UTC(year, new Date(`${month} 1, 2000`).getMonth(), day);
                            }
                        }
                        
                        // Extract seats first - last 1-2 digits before "seats"
                        const seatsMatch = textContent.match(/(\d{1,2})\s*seats?/i);
                        const seats = seatsMatch ? parseInt(seatsMatch[1]) : null;

                        // Extract aircraft model - pattern is "Model: [Name] [ModelNumber][SeatsNumber] seats"
                        // e.g., "Model: Global 750014 seats" = "Global 7500" + "14 seats"
                        let aircraft = 'Unknown Aircraft';
                        if (seatsMatch) {
                            // Find position of seats match - this removes the seat digits
                            const seatsPosition = textContent.indexOf(seatsMatch[0]);
                            const modelSection = textContent.substring(0, seatsPosition);

                            // Now extract the model - the numbers are already correct
                            const modelPattern = /Model:\s*([A-Za-z\s]+?)\s*(\d+)/i;
                            const modelMatch = modelSection.match(modelPattern);

                            if (modelMatch) {
                                const modelName = modelMatch[1].trim();
                                const modelNumbers = modelMatch[2]; // Already has seats removed
                                aircraft = `${modelName} ${modelNumbers}`;
                            }
                        }

                        // Fallback if above didn't work
                        if (aircraft === 'Unknown Aircraft') {
                            const modelMatch = textContent.match(/Model:\s*([^0-9]+?)(\d+)/i) ||
                                             textContent.match(/(Citation|Gulfstream|Falcon|Challenger|Global|Phenom|Learjet|King Air)\s*(\w+)/i);
                            if (modelMatch) {
                                aircraft = `${modelMatch[1].trim()} ${modelMatch[2]}`;
                            }
                        }

                        // Helper function to parse location - now locations are already formatted as "City, Country"
                        const parseLocation = (locArray, index) => {
                            if (!locArray || locArray.length <= index) {
                                return { city: 'Unknown', country: 'Unknown', formatted: 'Unknown' };
                            }

                            const loc = locArray[index];
                            if (loc.includes(', ')) {
                                const parts = loc.split(', ');
                                return {
                                    city: parts[0],
                                    country: parts[1],
                                    formatted: loc
                                };
                            }

                            // Single location (no comma) - treat as country or city
                            return {
                                city: loc,
                                country: loc,
                                formatted: loc
                            };
                        };

                        // Parse FROM and TO locations
                        // locations array is now: ["Beijing, China", "Seoul, South Korea"] format
                        const fromLocation = parseLocation(locations, 0);
                        const toLocation = parseLocation(locations, 1);

                        // Image already extracted above at line 404
                        // (imageSrc variable from outer scope)

                        const flightData = {
                            id: `flight_${Date.now()}_${index}`,
                            rawText: textContent.replace(/\s+/g, ' ').trim(),
                            extractedData: {
                                price: priceType === 'fixed' ? `${price} USD` : price,
                                priceType: priceType,
                                date: dateStr,
                                dateTimestamp: timestamp,
                                aircraft: aircraft,
                                seats: seats,
                                from: fromLocation,
                                to: toLocation,
                                route: {
                                    from: fromLocation.formatted,
                                    to: toLocation.formatted,
                                    summary: `${fromLocation.formatted} → ${toLocation.formatted}`
                                },
                                involvesKorea: involvesKorea,
                                timestamp: new Date().toISOString(),
                                locations: locations
                            },
                            images: imageSrc ? [{
                                src: imageSrc,
                                alt: 'emptyLeg'
                            }] : []
                        };
                        
                        extractedFlights.push(flightData);
                        console.log(`✅ Extracted flight ${index + 1}: ${flightData.extractedData.route.summary} - ${flightData.extractedData.price}`);
                        
                    } catch (error) {
                        console.log(`Error processing flight ${index}:`, error.message);
                    }
                });
                
                return extractedFlights;
            });
            
            console.log(`📊 Initial extraction: ${flights.length} flight records involving South Korea`);
            
            // Remove duplicates based on route (including direction), date, price, AND aircraft
            // Direction matters: Seoul→Tokyo is different from Tokyo→Seoul
            // Date matters: same route on different dates is unique
            console.log('🔍 Checking for duplicates...');
            const uniqueFlights = [];
            const seen = new Set();

            flights.forEach(flight => {
                // Include from→to direction, date, price, and aircraft in the key
                // This ensures Seoul→Tokyo on Nov 25 is different from:
                // - Tokyo→Seoul on Nov 25 (different direction)
                // - Seoul→Tokyo on Nov 26 (different date)
                const key = `${flight.extractedData.route.from}→${flight.extractedData.route.to}_${flight.extractedData.date}_${flight.extractedData.price}_${flight.extractedData.aircraft}`;
                if (!seen.has(key)) {
                    seen.add(key);
                    uniqueFlights.push(flight);
                } else {
                    console.log(`   Skipping duplicate: ${flight.extractedData.route.summary} (${flight.extractedData.aircraft})`);
                }
            });

            const duplicatesRemoved = flights.length - uniqueFlights.length;
            if (duplicatesRemoved > 0) {
                console.log(`🗑️ Removed ${duplicatesRemoved} exact duplicate flights`);
            }

            this.flightData = uniqueFlights;
            console.log(`✅ Final result: ${uniqueFlights.length} unique South Korea flights`);
            
            return uniqueFlights;
            
        } catch (error) {
            console.error('❌ Failed to extract flight data:', error.message);
            throw error;
        }
    }

    async saveToFile() {
        if (!config.saveToFile) {
            console.log('📁 File saving disabled, skipping...');
            return null;
        }

        console.log('💾 Saving data to JSON file...');
        
        const timestamp = new Date().toISOString().split('T')[0];
        const filename = `jetbay_korea_flights_unified_${timestamp}.json`;
        
        const outputData = {
            metadata: {
                url: 'https://www.jet-bay.com/en-us/empty-leg',
                scrapedAt: new Date().toISOString(),
                totalFlights: this.flightData.length,
                duplicatesRemoved: 0, // This would need to be tracked during extraction
                region: 'East Asia',
                currency: 'USD',
                filter: 'South Korea flights only (FROM or TO South Korea)',
                filterCriteria: ['South Korea', 'Seoul', 'Busan', 'Korea'],
                version: '2.0',
                features: [
                    'Formatted from/to fields',
                    'Route summaries',
                    'City/country separation',
                    'Duplicate removal'
                ]
            },
            flights: this.flightData
        };
        
        try {
            await fs.writeFile(filename, JSON.stringify(outputData, null, 2));
            console.log(`✅ Data saved to ${filename}`);
            return filename;
        } catch (error) {
            console.error('❌ Failed to save file:', error.message);
            throw error;
        }
    }

    // Supabase upload methods
    async ensureTableExists() {
        console.log('🔍 Checking if Supabase table exists...');
        
        const createTableSQL = `
            CREATE TABLE IF NOT EXISTS ${config.tableName} (
                id SERIAL PRIMARY KEY,
                flight_id TEXT UNIQUE NOT NULL,
                raw_text TEXT,
                price TEXT,
                price_numeric DECIMAL(10,2),
                price_type TEXT DEFAULT 'fixed' CHECK (price_type IN ('fixed', 'enquire')),
                currency TEXT DEFAULT 'USD',
                flight_date DATE,
                date_timestamp BIGINT,
                aircraft TEXT,
                seats INTEGER,
                from_city TEXT,
                from_country TEXT,
                from_formatted TEXT,
                to_city TEXT,
                to_country TEXT,
                to_formatted TEXT,
                route_summary TEXT,
                involves_korea BOOLEAN DEFAULT false,
                is_active BOOLEAN DEFAULT true,
                scraped_timestamp TIMESTAMPTZ,
                last_seen_at TIMESTAMPTZ DEFAULT NOW(),
                archived_at TIMESTAMPTZ,
                image_urls JSONB,
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
            );

            -- Create indexes for better performance
            CREATE INDEX IF NOT EXISTS idx_flights_flight_id ON ${config.tableName}(flight_id);
            CREATE INDEX IF NOT EXISTS idx_flights_date ON ${config.tableName}(flight_date);
            CREATE INDEX IF NOT EXISTS idx_flights_from_city ON ${config.tableName}(from_city);
            CREATE INDEX IF NOT EXISTS idx_flights_to_city ON ${config.tableName}(to_city);
            CREATE INDEX IF NOT EXISTS idx_flights_involves_korea ON ${config.tableName}(involves_korea);
            CREATE INDEX IF NOT EXISTS idx_flights_is_active ON ${config.tableName}(is_active);
            CREATE INDEX IF NOT EXISTS idx_flights_price_type ON ${config.tableName}(price_type);
        `;

        try {
            const { error } = await this.supabase.rpc('exec_sql', { sql: createTableSQL });
            
            if (error) {
                // Try alternative approach - check if table exists
                console.log('⚠️  RPC method failed, checking table existence...');
                
                const { data: tableExists, error: checkError } = await this.supabase
                    .from(config.tableName)
                    .select('*')
                    .limit(1);
                
                if (checkError && checkError.code === '42P01') {
                    console.error('❌ Table does not exist and cannot be created automatically.');
                    console.log('\n📋 Please create the table manually in your Supabase SQL Editor using supabase-setup.sql');
                    throw new Error('Table creation failed');
                }
            }
            
            console.log('✅ Table structure verified');
        } catch (error) {
            console.error('❌ Error ensuring table exists:', error.message);
            throw error;
        }
    }

    transformFlightData(flight) {
        const extractedData = flight.extractedData;

        // Extract numeric price (only for fixed prices)
        const priceMatch = extractedData.price?.match(/[\d,]+/);
        const priceNumeric = priceMatch && extractedData.priceType === 'fixed'
            ? parseFloat(priceMatch[0].replace(/,/g, ''))
            : null;

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
            price_type: extractedData.priceType || 'fixed',
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
            source: 'jetbay'
        };
    }

    async getExistingFlightIds(flightIds) {
        console.log('🔍 Checking for existing flights in database...');

        const { data, error } = await this.supabase
            .from(config.tableName)
            .select('flight_id')
            .in('flight_id', flightIds);

        if (error) {
            console.error('❌ Error checking existing flights:', error.message);
            return [];
        }

        const existingIds = data.map(row => row.flight_id);
        console.log(`📊 Found ${existingIds.length} existing flights in database`);

        return existingIds;
    }

    async getAllActiveFlights() {
        console.log('🔍 Getting all currently active flights from database...');

        const { data, error } = await this.supabase
            .from(config.tableName)
            .select('flight_id, route_summary')
            .eq('is_active', true);

        if (error) {
            console.error('❌ Error getting active flights:', error.message);
            return [];
        }

        console.log(`📊 Found ${data.length} active flights in database`);
        return data;
    }

    async archiveFlights(flightIds) {
        if (flightIds.length === 0) {
            return { success: 0, errors: 0 };
        }

        console.log(`📦 Archiving ${flightIds.length} flights that are no longer available...`);

        const { data, error } = await this.supabase
            .from(config.tableName)
            .update({
                is_active: false,
                archived_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            })
            .in('flight_id', flightIds)
            .select();

        if (error) {
            console.error('❌ Error archiving flights:', error.message);
            return { success: 0, errors: flightIds.length };
        }

        console.log(`✅ Successfully archived ${data.length} flights`);
        return { success: data.length, errors: 0 };
    }

    async updateExistingFlights(flightIds) {
        if (flightIds.length === 0) {
            return { success: 0, errors: 0 };
        }

        console.log(`🔄 Updating ${flightIds.length} flights that are still available...`);

        const { data, error } = await this.supabase
            .from(config.tableName)
            .update({
                last_seen_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            })
            .in('flight_id', flightIds)
            .select();

        if (error) {
            console.error('❌ Error updating flights:', error.message);
            return { success: 0, errors: flightIds.length };
        }

        console.log(`✅ Successfully updated ${data.length} flights`);
        return { success: data.length, errors: 0 };
    }

    async uploadToSupabase() {
        if (this.flightData.length === 0) {
            console.log('ℹ️  No flights to upload');
            return { success: 0, errors: 0, skipped: 0, archived: 0, updated: 0 };
        }

        console.log('\n🚀 Starting Supabase upload process...');

        try {
            // Ensure table exists
            await this.ensureTableExists();

            // Get all currently active flights from database
            const activeFlightsInDb = await this.getAllActiveFlights();
            const activeFlightIdsInDb = new Set(activeFlightsInDb.map(f => f.flight_id));

            // Get flight IDs from current scrape
            const scrapedFlightIds = this.flightData.map(flight => flight.id);
            const scrapedFlightIdsSet = new Set(scrapedFlightIds);

            // Identify flights to archive (in DB but not in current scrape)
            const flightsToArchive = Array.from(activeFlightIdsInDb).filter(
                id => !scrapedFlightIdsSet.has(id)
            );

            // Identify existing flights that are still available
            const existingFlights = this.flightData.filter(
                flight => activeFlightIdsInDb.has(flight.id)
            );

            // Identify truly new flights
            const newFlights = this.flightData.filter(
                flight => !activeFlightIdsInDb.has(flight.id)
            );

            console.log(`📊 Upload Summary:`);
            console.log(`   Total flights scraped: ${this.flightData.length}`);
            console.log(`   Active flights in DB: ${activeFlightsInDb.length}`);
            console.log(`   Flights to archive: ${flightsToArchive.length}`);
            console.log(`   Existing flights to update: ${existingFlights.length}`);
            console.log(`   New flights to insert: ${newFlights.length}\n`);

            // Archive flights that are no longer available
            let archiveResults = { success: 0, errors: 0 };
            if (flightsToArchive.length > 0) {
                archiveResults = await this.archiveFlights(flightsToArchive);
            }

            // Update existing flights (update last_seen_at)
            let updateResults = { success: 0, errors: 0 };
            if (existingFlights.length > 0) {
                const existingFlightIds = existingFlights.map(f => f.id);
                updateResults = await this.updateExistingFlights(existingFlightIds);
            }

            // Insert new flights
            let successCount = 0;
            let errorCount = 0;

            if (newFlights.length > 0) {
                console.log(`📤 Uploading ${newFlights.length} new flights...`);

                // Transform data for database
                const transformedFlights = newFlights.map(flight => this.transformFlightData(flight));

                // Upload in batches to avoid timeout
                const batchSize = 10;

                for (let i = 0; i < transformedFlights.length; i += batchSize) {
                    const batch = transformedFlights.slice(i, i + batchSize);

                    console.log(`   Uploading batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(transformedFlights.length/batchSize)}...`);

                    const { data, error } = await this.supabase
                        .from(config.tableName)
                        .insert(batch)
                        .select();

                    if (error) {
                        console.error(`   ❌ Batch error:`, error.message);
                        errorCount += batch.length;
                    } else {
                        console.log(`   ✅ Successfully uploaded ${data.length} flights`);
                        successCount += data.length;
                    }
                }
            } else {
                console.log('ℹ️  No new flights to insert');
            }

            return {
                success: successCount,
                errors: errorCount,
                archived: archiveResults.success,
                updated: updateResults.success,
                skipped: 0
            };

        } catch (error) {
            console.error('❌ Upload process failed:', error.message);
            throw error;
        }
    }

    async displayResults() {
        if (this.flightData.length === 0) {
            console.log('ℹ️  No flight data to display');
            return;
        }

        console.log('\n📋 Sample of extracted flight data:\n');
        
        // Show first 3 flights as samples
        const samplesToShow = Math.min(3, this.flightData.length);
        for (let i = 0; i < samplesToShow; i++) {
            const flight = this.flightData[i];
            const data = flight.extractedData;
            
            console.log(`Korea Flight ${i + 1}:`);
            console.log(`  Route: ${data.route.summary}`);
            console.log(`  From: ${data.from.formatted}`);
            console.log(`  To: ${data.to.formatted}`);
            console.log(`  Price: ${data.price}`);
            console.log(`  Aircraft: ${data.aircraft}`);
            console.log(`  Seats: ${data.seats}`);
            console.log(`  Date: ${data.date}`);
            console.log('');
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
            await this.loadWebsite();
            await this.clickEastAsiaTab();
            await this.clickViewMoreButtons();
            await this.extractFlightData();
            await this.displayResults();
            
            // Save to file (optional)
            const filename = await this.saveToFile();

            // Upload to Supabase
            let uploadResults = { success: 0, errors: 0, archived: 0, updated: 0 };
            if (process.env.SKIP_UPLOAD !== 'true') {
                uploadResults = await this.uploadToSupabase();
            } else {
                console.log('⏭️  Skipping Supabase upload (running from combined scraper)');
            }
            
            await this.cleanup();
            
            // Final summary
            console.log('\n🎉 Process completed successfully!');
            if (filename) {
                console.log(`📁 Data saved to: ${filename}`);
            }
            console.log(`\n📊 Final Statistics:`);
            console.log(`   Flights scraped: ${this.flightData.length}`);
            console.log(`   ✅ New flights inserted: ${uploadResults.success}`);
            console.log(`   🔄 Existing flights updated: ${uploadResults.updated}`);
            console.log(`   📦 Old flights archived: ${uploadResults.archived}`);
            if (uploadResults.errors > 0) {
                console.log(`   ❌ Failed operations: ${uploadResults.errors}`);
            }
            
            console.log('\n📋 Complete list of routes found:');
            this.flightData.forEach((flight, index) => {
                const data = flight.extractedData;
                console.log(`${index + 1}. ${data.route.summary} - ${data.price} (${data.date})`);
            });
            
            console.log('\n✨ Crawling and upload session completed successfully!');
            
        } catch (error) {
            console.error('💥 Process failed:', error.message);
            await this.cleanup();
            process.exit(1);
        }
    }
}

// Handle command line execution
if (require.main === module) {
    const crawler = new UnifiedJetBayCrawlerWithUpload();
    crawler.run();
}

module.exports = UnifiedJetBayCrawlerWithUpload;
