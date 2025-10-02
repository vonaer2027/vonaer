const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function applyStorageFix() {
  try {
    console.log('Applying storage policy fixes...');
    
    // First, let's check current policies
    const { data: policies, error: policiesError } = await supabase
      .from('pg_policies')
      .select('*')
      .eq('tablename', 'objects')
      .eq('schemaname', 'storage');
    
    if (policiesError) {
      console.log('Could not fetch policies (this is normal):', policiesError.message);
    } else {
      console.log('Current policies:', policies);
    }
    
    // Test upload to see if it works now
    const testFile = new File(['test content'], 'test.txt', { type: 'text/plain' });
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('flight-images')
      .upload(`test-${Date.now()}.txt`, testFile);
    
    if (uploadError) {
      console.error('Upload test failed:', uploadError);
      
      // If upload fails, let's try to create a simple policy update
      console.log('Attempting to fix policies...');
      
      // We'll need to use the service role key for this
      if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
        console.log('Using service role key to update policies...');
        // This would require direct SQL execution which might not be available
        console.log('Please run the SQL script manually in the Supabase dashboard:');
        console.log('1. Go to your Supabase dashboard');
        console.log('2. Navigate to SQL Editor');
        console.log('3. Run the contents of fix-storage-policies.sql');
      } else {
        console.log('Service role key not found. Please add SUPABASE_SERVICE_ROLE_KEY to .env.local');
      }
    } else {
      console.log('Upload test successful!', uploadData);
      
      // Clean up test file
      await supabase.storage
        .from('flight-images')
        .remove([uploadData.path]);
      console.log('Test file cleaned up');
    }
    
  } catch (error) {
    console.error('Error applying storage fix:', error);
  }
}

applyStorageFix();


