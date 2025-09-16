const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function fixMarginPolicies() {
  console.log('🔄 Fixing RLS policies for margin_settings...\n')

  // We need to create policies that allow INSERT and UPDATE for margin_settings
  // Since we can't execute SQL directly, let's check what policies exist first
  
  try {
    // Test current permissions
    console.log('Testing current permissions...')
    
    const anonSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
    
    // Test INSERT
    const { data, error } = await anonSupabase
      .from('margin_settings')
      .insert([{
        margin_percentage: 30.0,
        is_active: false,
        created_by: 'test'
      }])
      .select()
    
    if (error) {
      console.log('❌ INSERT blocked:', error.message)
      console.log('   Code:', error.code)
    } else {
      console.log('✅ INSERT allowed')
    }
    
    // Test UPDATE
    const { error: updateError } = await anonSupabase
      .from('margin_settings')
      .update({ created_by: 'test-update' })
      .eq('id', 1)
    
    if (updateError) {
      console.log('❌ UPDATE blocked:', updateError.message)
    } else {
      console.log('✅ UPDATE allowed')
    }
    
  } catch (err) {
    console.log('❌ Test error:', err.message)
  }
  
  console.log('\n📝 To fix this issue, you need to run this SQL in your Supabase SQL Editor:')
  console.log(`
-- Allow public INSERT and UPDATE for margin_settings
DROP POLICY IF EXISTS "Allow public insert margin_settings" ON margin_settings;
DROP POLICY IF EXISTS "Allow public update margin_settings" ON margin_settings;

CREATE POLICY "Allow public insert margin_settings" ON margin_settings
    FOR INSERT USING (true);

CREATE POLICY "Allow public update margin_settings" ON margin_settings
    FOR UPDATE USING (true);
  `)
}

fixMarginPolicies()
