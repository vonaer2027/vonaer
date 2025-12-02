-- Fix RLS policies to allow public read access for admin dashboard
-- This allows the client-side code to read data using the anon key

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Allow read access to flights" ON flights;
DROP POLICY IF EXISTS "Allow read access to users" ON users;
DROP POLICY IF EXISTS "Allow read access to margin_settings" ON margin_settings;

-- Create new policies that allow public read access
-- For flights table
CREATE POLICY "Allow public read access to flights" ON flights
    FOR SELECT USING (true);

-- For users table  
CREATE POLICY "Allow public read access to users" ON users
    FOR SELECT USING (true);

-- For margin_settings table
CREATE POLICY "Allow public read access to margin_settings" ON margin_settings
    FOR SELECT USING (true);

-- Keep the service role policies for full access (insert, update, delete)
-- These should already exist from the original schema
