import { NextRequest, NextResponse } from 'next/server';
import { chromium } from 'playwright-core';
import chromiumBinary from '@sparticuz/chromium';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';
export const maxDuration = 300; // 5 minutes for Pro plan

interface FlightData {
  id: string;
  rawText: string;
  extractedData: {
    price: string;
    date: string;
    dateTimestamp: number;
    aircraft: string;
    seats: number | null;
    from: { city: string; country: string; formatted: string };
    to: { city: string; country: string; formatted: string };
    route: { from: string; to: string; summary: string };
    involvesKorea: boolean;
    timestamp: string;
    locations: string[];
  };
  images: Array<{ src: string; alt: string }>;
}

class ServerlessJetBayCrawler {
  private supabase: any;
  private flightData: FlightData[] = [];

  constructor() {
    this.initializeSupabase();
  }

  private initializeSupabase() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase configuration');
    }
    
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async scrapeFlights(): Promise<FlightData[]> {
    let browser;
    
    try {
      console.log('🚀 Starting serverless flight scraping...');
      
      // Launch browser with serverless-compatible Chromium
      browser = await chromium.launch({
        args: chromiumBinary.args,
        executablePath: await chromiumBinary.executablePath(),
        headless: true,
      });

      const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 },
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      });

      const page = await context.newPage();
      page.setDefaultTimeout(30000);

      console.log('🌐 Loading Jet-Bay website...');
      await page.goto('https://www.jet-bay.com/en-us/empty-leg', {
        waitUntil: 'domcontentloaded',
        timeout: 30000
      });

      // Wait for page to load
      await page.waitForTimeout(3000);

      console.log('🎯 Looking for East Asia tab...');
      await this.clickEastAsiaTab(page);

      console.log('🔍 Checking for View More buttons...');
      await this.clickViewMoreButtons(page);

      console.log('📊 Extracting flight data...');
      const flights = await this.extractFlightData(page);

      await browser.close();
      
      this.flightData = flights;
      return flights;

    } catch (error) {
      if (browser) {
        await browser.close();
      }
      throw error;
    }
  }

  private async clickEastAsiaTab(page: any) {
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
        await page.waitForSelector(selector, { timeout: 3000 });
        
        const elements = await page.$$(selector);
        for (const element of elements) {
          const text = await element.textContent();
          if (text && text.includes('East Asia')) {
            await element.click();
            clicked = true;
            console.log(`✅ Successfully clicked East Asia tab`);
            break;
          }
        }
        
        if (clicked) break;
      } catch (e) {
        continue;
      }
    }
    
    if (!clicked) {
      // Fallback method
      const eastAsiaElement = await page.locator('text=East Asia').first();
      if (await eastAsiaElement.count() > 0) {
        await eastAsiaElement.click();
        clicked = true;
      }
    }
    
    if (clicked) {
      await page.waitForTimeout(5000);
    }
  }

  private async clickViewMoreButtons(page: any) {
    let attempts = 0;
    const maxAttempts = 5; // Reduced for serverless
    
    while (attempts < maxAttempts) {
      try {
        const viewMoreButton = await page.locator('text=View More').first();
        
        if (await viewMoreButton.count() > 0) {
          console.log(`📄 Clicking "View More" button... (attempt ${attempts + 1})`);
          await viewMoreButton.scrollIntoViewIfNeeded();
          await viewMoreButton.click();
          await page.waitForTimeout(3000);
        } else {
          break;
        }
      } catch (error) {
        break;
      }
      
      attempts++;
    }
  }

  private async extractFlightData(page: any): Promise<FlightData[]> {
    const flights = await page.evaluate(() => {
      const selectors = [
        '[class*="flight"]',
        '[class*="card"]',
        '[class*="item"]',
        '[class*="listing"]',
        'div[class*="grid"]',
        'div[class*="flex"]'
      ];
      
      let allPotentialElements: Element[] = [];
      
      selectors.forEach(selector => {
        try {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => {
            const text = el.textContent || '';
            if ((text.includes('USD') || text.includes('$')) && text.length > 50) {
              allPotentialElements.push(el);
            }
          });
        } catch (e) {
          // Ignore selector errors
        }
      });
      
      const uniqueElements = [...new Set(allPotentialElements)];
      const extractedFlights: any[] = [];
      
      uniqueElements.forEach((element, index) => {
        try {
          const textContent = element.textContent || '';
          
          // Price matching
          const priceMatches = [
            textContent.match(/(?:From\s*)?([0-9,]+)\s*USD/i),
            textContent.match(/\$\s*([0-9,]+)/i),
            textContent.match(/([0-9,]+)\s*\$/i),
            textContent.match(/USD\s*([0-9,]+)/i)
          ];
          
          const priceMatch = priceMatches.find(match => match !== null);
          
          if (!priceMatch) return;
          
          // Check for Korea connection
          const koreaKeywords = ['korea', 'seoul', 'busan', 'incheon', 'gimpo'];
          const involvesKorea = koreaKeywords.some(keyword => 
            textContent.toLowerCase().includes(keyword)
          );
          
          if (!involvesKorea) return;
          
          // Extract locations
          const countryPatterns = [
            /(China|Japan|Korea|Singapore|Thailand|Malaysia|Philippines|Vietnam|Indonesia|Taiwan|Hong Kong|Macau|South Korea)/gi,
            /(Seoul|Busan|Tokyo|Beijing|Shanghai|Bangkok|Kuala Lumpur|Manila|Jakarta|Taipei)/gi
          ];
          
          const locations: string[] = [];
          
          countryPatterns.forEach(pattern => {
            let match;
            while ((match = pattern.exec(textContent)) !== null) {
              const location = match[1];
              if (!locations.some(loc => loc.includes(location))) {
                locations.push(location);
              }
            }
          });
          
          // Build flight object
          const price = priceMatch[1];
          const dateMatch = textContent.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{1,2}),?\s+(\d{4})/i);
          let dateStr = 'Unknown Date';
          let timestamp = Date.now();
          
          if (dateMatch) {
            const month = dateMatch[1];
            const day = dateMatch[2];
            const year = dateMatch[3];
            dateStr = `${month} ${day}, ${year}`;
            timestamp = new Date(`${month} ${day}, ${year}`).getTime();
          }
          
          const seatsMatch = textContent.match(/(\d+)\s*seats?/i);
          const modelMatch = textContent.match(/(Citation|Gulfstream|Falcon|Challenger|Global|Phenom|Learjet|King Air)\s*(\w+)/i);
          
          const aircraft = modelMatch ? `${modelMatch[1].trim()} ${modelMatch[2]}` : 'Unknown Aircraft';
          const seats = seatsMatch ? parseInt(seatsMatch[1]) : null;
          
          const fromLocation = locations[0] ? { 
            city: locations[0], 
            country: locations[0].includes('Korea') ? 'South Korea' : 'Unknown',
            formatted: locations[0]
          } : { city: 'Unknown', country: 'Unknown', formatted: 'Unknown' };
          
          const toLocation = locations[1] ? { 
            city: locations[1], 
            country: locations[1].includes('Korea') ? 'South Korea' : 'Unknown',
            formatted: locations[1]
          } : { city: 'Unknown', country: 'Unknown', formatted: 'Unknown' };
          
          const imgElement = element.querySelector('img');
          const imageSrc = imgElement ? (imgElement as HTMLImageElement).src : null;
          
          const flightData = {
            id: `flight_${Date.now()}_${index}`,
            rawText: textContent.replace(/\s+/g, ' ').trim(),
            extractedData: {
              price: `${price} USD`,
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
          
        } catch (error) {
          console.log(`Error processing flight ${index}:`, error);
        }
      });
      
      return extractedFlights;
    });
    
    // Remove duplicates
    const uniqueFlights: FlightData[] = [];
    const seen = new Set();
    
    flights.forEach((flight: FlightData) => {
      const key = `${flight.extractedData.route.summary}_${flight.extractedData.date}_${flight.extractedData.price}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueFlights.push(flight);
      }
    });
    
    console.log(`✅ Extracted ${uniqueFlights.length} unique Korea flights`);
    return uniqueFlights;
  }

  private transformFlightData(flight: FlightData) {
    const extractedData = flight.extractedData;
    
    const priceMatch = extractedData.price?.match(/[\d,]+/);
    const priceNumeric = priceMatch ? parseFloat(priceMatch[0].replace(/,/g, '')) : null;
    
    const flightDate = extractedData.dateTimestamp 
      ? new Date(extractedData.dateTimestamp).toISOString().split('T')[0]
      : null;
    
    const imageUrls = flight.images?.map(img => img.src) || [];
    
    return {
      flight_id: flight.id,
      raw_text: flight.rawText,
      price: extractedData.price,
      price_numeric: priceNumeric,
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
      scraped_timestamp: extractedData.timestamp,
      image_urls: imageUrls
    };
  }

  async uploadToSupabase(): Promise<{ success: number; errors: number; skipped: number }> {
    if (this.flightData.length === 0) {
      return { success: 0, errors: 0, skipped: 0 };
    }

    console.log('🚀 Starting Supabase upload...');
    
    try {
      // Get existing flight IDs
      const flightIds = this.flightData.map(flight => flight.id);
      const { data: existingFlights } = await this.supabase
        .from('flights')
        .select('flight_id')
        .in('flight_id', flightIds);
      
      const existingIds = existingFlights?.map((row: any) => row.flight_id) || [];
      const newFlights = this.flightData.filter(flight => !existingIds.includes(flight.id));
      
      console.log(`📊 Total: ${this.flightData.length}, Existing: ${existingIds.length}, New: ${newFlights.length}`);
      
      if (newFlights.length === 0) {
        return { success: 0, errors: 0, skipped: existingIds.length };
      }
      
      // Transform and upload
      const transformedFlights = newFlights.map(flight => this.transformFlightData(flight));
      
      const { data, error } = await this.supabase
        .from('flights')
        .insert(transformedFlights)
        .select();
      
      if (error) {
        console.error('Upload error:', error);
        return { success: 0, errors: newFlights.length, skipped: existingIds.length };
      }
      
      return { 
        success: data?.length || 0, 
        errors: 0, 
        skipped: existingIds.length 
      };
      
    } catch (error) {
      console.error('Upload process failed:', error);
      return { success: 0, errors: this.flightData.length, skipped: 0 };
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Starting serverless flight scraping process...');
    
    const crawler = new ServerlessJetBayCrawler();
    
    // Scrape flights
    const flights = await crawler.scrapeFlights();
    
    // Upload to Supabase
    const uploadResults = await crawler.uploadToSupabase();
    
    console.log('✅ Process completed successfully!');
    
    return NextResponse.json({
      success: true,
      results: {
        totalFlights: flights.length,
        uploaded: uploadResults.success,
        skipped: uploadResults.skipped,
        errors: uploadResults.errors,
        flights: flights.slice(0, 3) // Return first 3 as sample
      }
    });
    
  } catch (error) {
    console.error('❌ Scraping process failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      details: 'Check server logs for more information'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Flight scraper API endpoint',
    usage: 'Send POST request to trigger scraping',
    status: 'ready'
  });
}
