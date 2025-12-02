-- Fix Supabase Storage Policies for Admin Dashboard
-- Run this SQL in your Supabase SQL Editor to allow admin uploads

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Public read access for flight images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload flight images" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own flight images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own flight images" ON storage.objects;

-- Create open policies for admin dashboard (no auth required)
-- Allow public read access
CREATE POLICY "Public read access for flight images" ON storage.objects
FOR SELECT USING (bucket_id = 'flight-images');

-- Allow anyone to upload (no auth required)
CREATE POLICY "Allow uploads to flight images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'flight-images');

-- Allow anyone to update (no auth required)
CREATE POLICY "Allow updates to flight images" ON storage.objects
FOR UPDATE USING (bucket_id = 'flight-images');

-- Allow anyone to delete (no auth required)
CREATE POLICY "Allow deletes from flight images" ON storage.objects
FOR DELETE USING (bucket_id = 'flight-images');

-- Alternative: If you want to keep some security, use this instead:
-- (Comment out the above policies and uncomment these)

-- CREATE POLICY "Allow uploads to flight images" ON storage.objects
-- FOR INSERT WITH CHECK (
--   bucket_id = 'flight-images' 
--   AND (
--     auth.role() = 'authenticated' 
--     OR auth.role() = 'anon'
--   )
-- );

-- CREATE POLICY "Allow updates to flight images" ON storage.objects
-- FOR UPDATE USING (
--   bucket_id = 'flight-images' 
--   AND (
--     auth.role() = 'authenticated' 
--     OR auth.role() = 'anon'
--   )
-- );

-- CREATE POLICY "Allow deletes from flight images" ON storage.objects
-- FOR DELETE USING (
--   bucket_id = 'flight-images' 
--   AND (
--     auth.role() = 'authenticated' 
--     OR auth.role() = 'anon'
--   )
-- );

-- Grant necessary permissions
GRANT USAGE ON SCHEMA storage TO anon;
GRANT USAGE ON SCHEMA storage TO authenticated;
GRANT ALL ON storage.objects TO anon;
GRANT ALL ON storage.objects TO authenticated;
GRANT ALL ON storage.buckets TO anon;
GRANT ALL ON storage.buckets TO authenticated;
