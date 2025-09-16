const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('🔍 Testing Supabase connection...')
console.log('URL:', supabaseUrl ? '✅ Set' : '❌ Missing')
console.log('Key:', supabaseAnonKey ? '✅ Set' : '❌ Missing')

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Environment variables missing!')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  try {
    console.log('\n📊 Testing flights table...')
    
    // Test basic connection
    const { data, error, count } = await supabase
      .from('flights')
      .select('*', { count: 'exact' })
      .limit(5)
    
    if (error) {
      console.error('❌ Error querying flights:', error)
      return
    }
    
    console.log(`✅ Found ${count} total flights in database`)
    console.log(`📋 Sample data (first 5):`)
    
    if (data && data.length > 0) {
      data.forEach((flight, index) => {
        console.log(`  ${index + 1}. ${flight.flight_id}: ${flight.from_city} → ${flight.to_city} (${flight.price})`)
      })
    } else {
      console.log('  No flight data found')
    }
    
    // Test margin settings
    console.log('\n⚙️ Testing margin_settings table...')
    const { data: marginData, error: marginError } = await supabase
      .from('margin_settings')
      .select('*')
      .eq('is_active', true)
    
    if (marginError) {
      console.error('❌ Error querying margin_settings:', marginError)
    } else {
      console.log(`✅ Active margin: ${marginData?.[0]?.margin_percentage || 0}%`)
    }
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message)
  }
}

testConnection()
