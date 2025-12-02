// Test Supabase connection and permissions
// Run this with: node test-supabase-connection.js

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('🔍 Testing Supabase Connection...')
console.log('URL:', supabaseUrl ? 'Set' : 'Missing')
console.log('Anon Key:', supabaseAnonKey ? 'Set' : 'Missing')

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing environment variables!')
  console.log('Make sure you have .env.local with:')
  console.log('NEXT_PUBLIC_SUPABASE_URL=your_supabase_url')
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  try {
    // Test 1: Basic connection
    console.log('\n📡 Testing basic connection...')
    const { data: healthCheck, error: healthError } = await supabase
      .from('flights')
      .select('count')
      .limit(1)
    
    if (healthError) {
      console.log('⚠️  Health check failed:', healthError.message)
    } else {
      console.log('✅ Basic connection successful')
    }

    // Test 2: Check if booking_requests table exists
    console.log('\n🗃️  Testing booking_requests table...')
    const { data: tableCheck, error: tableError } = await supabase
      .from('booking_requests')
      .select('count')
      .limit(1)
    
    if (tableError) {
      if (tableError.message.includes('does not exist')) {
        console.log('❌ booking_requests table does not exist!')
        console.log('   Run the booking-requests-schema.sql in Supabase SQL Editor')
      } else {
        console.log('⚠️  Table check error:', tableError.message)
      }
    } else {
      console.log('✅ booking_requests table exists')
    }

    // Test 3: Try to insert a test booking request
    console.log('\n📝 Testing insert permissions...')
    const testBooking = {
      flight_id: 'TEST_FLIGHT',
      customer_name: 'Test User',
      customer_phone: '010-0000-0000',
      consent_given: true,
      called: false
    }

    const { data: insertData, error: insertError } = await supabase
      .from('booking_requests')
      .insert([testBooking])
      .select()

    if (insertError) {
      console.log('❌ Insert failed:', insertError.message)
      if (insertError.message.includes('row-level security')) {
        console.log('   RLS policy issue - run fix-supabase-auth.sql')
      }
    } else {
      console.log('✅ Insert successful!')
      
      // Clean up test data
      if (insertData && insertData[0]) {
        await supabase
          .from('booking_requests')
          .delete()
          .eq('id', insertData[0].id)
        console.log('🧹 Test data cleaned up')
      }
    }

  } catch (error) {
    console.error('💥 Unexpected error:', error)
  }
}

testConnection()
