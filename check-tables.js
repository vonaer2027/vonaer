const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function checkTables() {
  try {
    console.log('🔍 Checking all tables in database...\n')
    
    // Check each expected table individually
    const tablesToCheck = ['flights', 'users', 'margin_settings']
    
    for (const tableName of tablesToCheck) {
      try {
        const { count, error: tableError } = await supabase
          .from(tableName)
          .select('*', { count: 'exact', head: true })
        
        if (tableError) {
          console.log(`❌ Table '${tableName}': ${tableError.message}`)
        } else {
          console.log(`✅ Table '${tableName}': ${count} rows`)
          
          // If it's flights table and has data, show sample
          if (tableName === 'flights' && count > 0) {
            const { data: sampleData } = await supabase
              .from(tableName)
              .select('flight_id, from_city, to_city, price')
              .limit(3)
            
            console.log('   Sample flights:')
            sampleData?.forEach(flight => {
              console.log(`   - ${flight.flight_id}: ${flight.from_city} → ${flight.to_city} (${flight.price})`)
            })
          }
        }
      } catch (err) {
        console.log(`❌ Table '${tableName}': ${err.message}`)
      }
    }
    
  } catch (error) {
    console.error('❌ Error checking tables:', error.message)
  }
}

checkTables()
