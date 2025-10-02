#!/usr/bin/env node

/**
 * Setup Supabase Storage Bucket for Flight Images
 * Run this script to create the flight-images bucket and configure permissions
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

async function setupStorage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing required environment variables:')
    console.error('   NEXT_PUBLIC_SUPABASE_URL')
    console.error('   SUPABASE_SERVICE_ROLE_KEY')
    console.error('\nPlease check your .env.local file')
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  try {
    console.log('🚀 Setting up Supabase storage bucket...')

    // Check if bucket already exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets()
    
    if (listError) {
      console.error('❌ Error listing buckets:', listError.message)
      process.exit(1)
    }

    const existingBucket = buckets.find(bucket => bucket.id === 'flight-images')
    
    if (existingBucket) {
      console.log('✅ flight-images bucket already exists')
      console.log('   Bucket details:', {
        id: existingBucket.id,
        name: existingBucket.name,
        public: existingBucket.public,
        created_at: existingBucket.created_at
      })
    } else {
      // Create the bucket
      const { data: bucket, error: createError } = await supabase.storage.createBucket('flight-images', {
        public: true,
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
      })

      if (createError) {
        console.error('❌ Error creating bucket:', createError.message)
        process.exit(1)
      }

      console.log('✅ Successfully created flight-images bucket')
    }

    // Test upload a small file to verify permissions
    console.log('🧪 Testing bucket permissions...')
    
    const testFile = new File(['test'], 'test.txt', { type: 'text/plain' })
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('flight-images')
      .upload('test/test.txt', testFile)

    if (uploadError) {
      console.error('❌ Error testing upload:', uploadError.message)
      console.log('💡 You may need to run the SQL setup script manually')
    } else {
      console.log('✅ Upload test successful')
      
      // Clean up test file
      await supabase.storage
        .from('flight-images')
        .remove(['test/test.txt'])
      console.log('🧹 Cleaned up test file')
    }

    console.log('\n🎉 Storage setup complete!')
    console.log('📝 Next steps:')
    console.log('   1. The flight-images bucket is ready for use')
    console.log('   2. You can now upload flight images in the admin dashboard')
    console.log('   3. Images will be publicly accessible via Supabase CDN')

  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
    process.exit(1)
  }
}

// Run the setup
setupStorage()


