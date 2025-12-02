-- Fix RLS policies for users table to allow INSERT, UPDATE, DELETE operations
-- Run this in your Supabase SQL Editor

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public insert users" ON users;
DROP POLICY IF EXISTS "Allow public update users" ON users;
DROP POLICY IF EXISTS "Allow public delete users" ON users;

-- Create new policies that allow public INSERT, UPDATE, and DELETE for users
CREATE POLICY "Allow public insert users" ON users
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update users" ON users
    FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow public delete users" ON users
    FOR DELETE USING (true);

-- Verify the policies are working
-- You can test this by running:
-- SELECT * FROM users ORDER BY created_at DESC LIMIT 5;
