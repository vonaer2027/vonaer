/**
 * Script to update tiered margin settings in Supabase
 * New tiers: $0-30K (25%), $30K-50K (20%), $50K+ (15%)
 *
 * Run: node scripts/update-tiered-margins.js
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials. Check .env.local file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const NEW_TIERS = [
  { min_price: 0, max_price: 30000, margin_percentage: 25 },
  { min_price: 30000, max_price: 50000, margin_percentage: 20 },
  { min_price: 50000, max_price: 999999999, margin_percentage: 15 },
];

async function updateTieredMargins() {
  console.log('Updating tiered margin settings...\n');
  console.log('New tier structure:');
  console.log('  $0 - $30,000: 25%');
  console.log('  $30,000 - $50,000: 20%');
  console.log('  $50,000+: 15%\n');

  try {
    // Step 1: Deactivate all existing tiers
    console.log('Step 1: Deactivating existing tiers...');
    const { error: deactivateError } = await supabase
      .from('tiered_margin_settings')
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq('is_active', true);

    if (deactivateError) {
      console.error('Error deactivating tiers:', deactivateError);
      process.exit(1);
    }
    console.log('  Existing tiers deactivated.');

    // Step 2: Insert new tiers
    console.log('\nStep 2: Inserting new tiers...');
    const tiersToInsert = NEW_TIERS.map(tier => ({
      ...tier,
      is_active: true,
      created_by: 'system',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));

    const { data, error: insertError } = await supabase
      .from('tiered_margin_settings')
      .insert(tiersToInsert)
      .select();

    if (insertError) {
      console.error('Error inserting new tiers:', insertError);
      process.exit(1);
    }
    console.log('  New tiers inserted successfully.');

    // Step 3: Verify
    console.log('\nStep 3: Verifying new tiers...');
    const { data: activeTiers, error: fetchError } = await supabase
      .from('tiered_margin_settings')
      .select('*')
      .eq('is_active', true)
      .order('min_price', { ascending: true });

    if (fetchError) {
      console.error('Error fetching tiers:', fetchError);
      process.exit(1);
    }

    console.log('\nActive tiers in database:');
    console.log('----------------------------------------');
    activeTiers.forEach(tier => {
      const maxDisplay = tier.max_price >= 999999999 ? '∞' : `$${tier.max_price.toLocaleString()}`;
      console.log(`  $${tier.min_price.toLocaleString()} - ${maxDisplay}: ${tier.margin_percentage}%`);
    });
    console.log('----------------------------------------');

    // Step 4: Test calculations
    console.log('\nSample price calculations:');
    const testPrices = [10000, 25000, 35000, 50000, 75000, 100000];
    testPrices.forEach(price => {
      const tier = activeTiers.find(t => price >= t.min_price && price < t.max_price);
      if (tier) {
        const margin = price * (tier.margin_percentage / 100);
        const final = Math.ceil((price + margin) / 100) * 100;
        console.log(`  $${price.toLocaleString()} → ${tier.margin_percentage}% margin → $${final.toLocaleString()}`);
      }
    });

    console.log('\n✅ Tiered margins updated successfully!');
  } catch (error) {
    console.error('Unexpected error:', error);
    process.exit(1);
  }
}

updateTieredMargins();
