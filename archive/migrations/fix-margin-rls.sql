-- Fix RLS policies for margin_settings to allow INSERT operations
-- Run this in your Supabase SQL Editor

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public insert margin_settings" ON margin_settings;
DROP POLICY IF EXISTS "Allow public update margin_settings" ON margin_settings;

-- Create new policies that allow public INSERT and UPDATE for margin_settings
CREATE POLICY "Allow public insert margin_settings" ON margin_settings
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update margin_settings" ON margin_settings
    FOR UPDATE USING (true) WITH CHECK (true);

-- Verify the policies are working
-- You can test this by running:
-- SELECT * FROM margin_settings ORDER BY created_at DESC LIMIT 5;
