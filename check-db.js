#!/usr/bin/env node

/**
 * Quick database check script
 * Checks current state of flights in Supabase
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
);

async function checkDatabase() {
  console.log('🔍 Checking Supabase database state...\n');

  try {
    // Get all active flights
    const { data: activeFlights, error: activeError } = await supabase
      .from('flights')
      .select('*')
      .eq('is_active', true)
      .gte('flight_date', new Date().toISOString().split('T')[0])
      .order('flight_date', { ascending: true });

    if (activeError) throw activeError;

    console.log(`📊 Active Future Flights: ${activeFlights.length}\n`);

    if (activeFlights.length > 0) {
      console.log('Flight Details:');
      activeFlights.forEach((flight, index) => {
        console.log(`\n${index + 1}. ${flight.flight_id}`);
        console.log(`   Route: ${flight.from_city} (${flight.from_country}) → ${flight.to_city} (${flight.to_country})`);
        console.log(`   Date: ${flight.flight_date}`);
        console.log(`   Aircraft: ${flight.aircraft}`);
        console.log(`   Seats: ${flight.seats}`);
        console.log(`   Price: ${flight.price} (${flight.price_type})`);
        console.log(`   Source: ${flight.source}`);
        console.log(`   Active: ${flight.is_active}`);
      });
    } else {
      console.log('⚠️  No active flights found!');
    }

    // Get all flights (including inactive)
    const { data: allFlights, error: allError } = await supabase
      .from('flights')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (allError) throw allError;

    console.log(`\n📊 Total Flights in DB (last 10): ${allFlights.length}\n`);

    if (allFlights.length > 0) {
      console.log('Recent Flights (including inactive):');
      allFlights.forEach((flight, index) => {
        console.log(`${index + 1}. ${flight.flight_id} - ${flight.from_city} → ${flight.to_city} - ${flight.flight_date} (Active: ${flight.is_active})`);
      });
    }

    // Check for any data quality issues
    const { data: missingData, error: qualityError } = await supabase
      .from('flights')
      .select('*')
      .eq('is_active', true);

    if (qualityError) throw qualityError;

    const issues = {
      missing_price: missingData.filter(f => !f.price && !f.price_numeric).length,
      missing_date: missingData.filter(f => !f.flight_date).length,
      missing_from: missingData.filter(f => !f.from_city).length,
      missing_to: missingData.filter(f => !f.to_city).length,
      past_dates: missingData.filter(f => f.flight_date && new Date(f.flight_date) < new Date().setHours(0, 0, 0, 0)).length
    };

    console.log('\n🔍 Data Quality Check (Active Flights):');
    console.log(`   Missing price: ${issues.missing_price}`);
    console.log(`   Missing date: ${issues.missing_date}`);
    console.log(`   Missing from_city: ${issues.missing_from}`);
    console.log(`   Missing to_city: ${issues.missing_to}`);
    console.log(`   Past dates: ${issues.past_dates}`);

  } catch (error) {
    console.error('❌ Error checking database:', error.message);
    throw error;
  }
}

checkDatabase()
  .then(() => {
    console.log('\n✅ Database check complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database check failed:', error);
    process.exit(1);
  });
