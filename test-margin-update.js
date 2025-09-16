const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

async function testMarginUpdate() {
  console.log('🔍 Testing margin update with anon key...\n')
  
  const anonSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
  
  try {
    // Test deactivating current margin
    console.log('1. Testing deactivate current margin...')
    const { data: deactivateData, error: deactivateError } = await anonSupabase
      .from('margin_settings')
      .update({ is_active: false })
      .eq('is_active', true)
    
    if (deactivateError) {
      console.log('❌ Deactivate error:', deactivateError)
    } else {
      console.log('✅ Deactivate successful')
    }

    // Test inserting new margin
    console.log('\n2. Testing insert new margin...')
    const { data: insertData, error: insertError } = await anonSupabase
      .from('margin_settings')
      .insert([{
        margin_percentage: 20.5,
        is_active: true,
        created_by: 'test-admin'
      }])
      .select()
      .single()
    
    if (insertError) {
      console.log('❌ Insert error:', insertError)
    } else {
      console.log('✅ Insert successful:', insertData)
    }

  } catch (err) {
    console.log('❌ Test error:', err.message)
  }

  // Test with service role key
  console.log('\n🔍 Testing with service role key...')
  const serviceSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  try {
    const { data, error } = await serviceSupabase
      .from('margin_settings')
      .insert([{
        margin_percentage: 25.0,
        is_active: true,
        created_by: 'service-test'
      }])
      .select()
      .single()
    
    if (error) {
      console.log('❌ Service role error:', error)
    } else {
      console.log('✅ Service role successful:', data)
    }
  } catch (err) {
    console.log('❌ Service role test error:', err.message)
  }
}

testMarginUpdate()
