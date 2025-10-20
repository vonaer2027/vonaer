const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function uploadFlights() {
  try {
    console.log('🚀 Starting flight data upload...')
    
    // Read the flight data
    const flightDataPath = path.join('..', 'jetbay_korea_flights_unified_2025-09-16.json')
    const flightData = JSON.parse(fs.readFileSync(flightDataPath, 'utf8'))
    
    console.log(`📊 Found ${flightData.flights.length} flights to upload`)
    
    // Transform the data to match our database schema
    const flightsToInsert = flightData.flights.map(flight => {
      const extractedData = flight.extractedData
      
      // Extract price numeric value
      let priceNumeric = null
      if (extractedData.price) {
        const priceMatch = extractedData.price.match(/[\d,]+/)
        if (priceMatch) {
          priceNumeric = parseFloat(priceMatch[0].replace(/,/g, ''))
        }
      }
      
      // Convert date timestamp to proper date
      let flightDate = null
      if (extractedData.dateTimestamp) {
        flightDate = new Date(extractedData.dateTimestamp).toISOString().split('T')[0]
      }
      
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
        involves_korea: extractedData.involvesKorea || false,
        scraped_timestamp: extractedData.timestamp,
        image_urls: flight.images || []
      }
    })
    
    // Clear existing flights first
    console.log('🗑️  Clearing existing flight data...')
    const { error: deleteError } = await supabase
      .from('flights')
      .delete()
      .neq('id', 0) // Delete all rows
    
    if (deleteError && !deleteError.message.includes('No rows found')) {
      console.warn('⚠️  Warning clearing existing data:', deleteError.message)
    }
    
    // Insert new flights
    console.log('📤 Uploading flight data...')
    const { data, error } = await supabase
      .from('flights')
      .insert(flightsToInsert)
      .select()
    
    if (error) {
      console.error('❌ Error uploading flights:', error)
      return
    }
    
    console.log(`✅ Successfully uploaded ${data.length} flights!`)
    
    // Insert default margin setting if none exists
    console.log('⚙️  Setting up default margin...')
    const { data: existingMargin } = await supabase
      .from('margin_settings')
      .select('*')
      .eq('is_active', true)
      .single()
    
    if (!existingMargin) {
      const { error: marginError } = await supabase
        .from('margin_settings')
        .insert([{
          margin_percentage: 0.00,
          is_active: true,
          created_by: 'system'
        }])
      
      if (marginError) {
        console.warn('⚠️  Warning setting up margin:', marginError.message)
      } else {
        console.log('✅ Default margin setting created')
      }
    }
    
    console.log('🎉 Upload complete! Your admin dashboard is ready to use.')
    console.log('🌐 Visit: http://localhost:3001')
    
  } catch (error) {
    console.error('❌ Upload failed:', error.message)
  }
}

uploadFlights()
