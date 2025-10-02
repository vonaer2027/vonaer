-- Supabase Storage Setup for Flight Images
-- Run this SQL in your Supabase SQL Editor

-- Create the flight-images storage bucket (if it doesn't exist)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'flight-images',
  'flight-images', 
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Create RLS policies for the flight-images bucket (if they don't exist)
-- Allow public read access
DROP POLICY IF EXISTS "Public read access for flight images" ON storage.objects;
CREATE POLICY "Public read access for flight images" ON storage.objects
FOR SELECT USING (bucket_id = 'flight-images');

-- Allow authenticated users to upload
DROP POLICY IF EXISTS "Authenticated users can upload flight images" ON storage.objects;
CREATE POLICY "Authenticated users can upload flight images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'flight-images' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to update their own uploads
DROP POLICY IF EXISTS "Users can update their own flight images" ON storage.objects;
CREATE POLICY "Users can update their own flight images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'flight-images' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to delete their own uploads
DROP POLICY IF EXISTS "Users can delete their own flight images" ON storage.objects;
CREATE POLICY "Users can delete their own flight images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'flight-images' 
  AND auth.role() = 'authenticated'
);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA storage TO authenticated;
GRANT ALL ON storage.objects TO authenticated;
GRANT ALL ON storage.buckets TO authenticated;
