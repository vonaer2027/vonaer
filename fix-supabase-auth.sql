-- Complete fix for Supabase authentication and RLS policies
-- Run this in your Supabase SQL Editor

-- First, let's check if the table exists
SELECT table_name FROM information_schema.tables WHERE table_name = 'booking_requests';

-- Drop all existing policies for booking_requests
DROP POLICY IF EXISTS "Allow read access to booking_requests" ON booking_requests;
DROP POLICY IF EXISTS "Allow insert access to booking_requests" ON booking_requests;
DROP POLICY IF EXISTS "Allow insert access to booking_requests_auth" ON booking_requests;
DROP POLICY IF EXISTS "Allow full access to service role booking_requests" ON booking_requests;

-- Create comprehensive RLS policies
-- 1. Allow anonymous users to INSERT booking requests (for customer bookings)
CREATE POLICY "booking_requests_insert_anon" ON booking_requests
    FOR INSERT TO anon
    WITH CHECK (true);

-- 2. Allow authenticated users to SELECT booking requests (for admin dashboard)
CREATE POLICY "booking_requests_select_auth" ON booking_requests
    FOR SELECT TO authenticated
    USING (true);

-- 3. Allow authenticated users to UPDATE booking requests (for marking as called)
CREATE POLICY "booking_requests_update_auth" ON booking_requests
    FOR UPDATE TO authenticated
    USING (true)
    WITH CHECK (true);

-- 4. Allow authenticated users to DELETE booking requests (for cleanup)
CREATE POLICY "booking_requests_delete_auth" ON booking_requests
    FOR DELETE TO authenticated
    USING (true);

-- 5. Allow service role full access (for admin operations)
CREATE POLICY "booking_requests_all_service_role" ON booking_requests
    FOR ALL TO service_role
    USING (true)
    WITH CHECK (true);

-- Verify RLS is enabled
ALTER TABLE booking_requests ENABLE ROW LEVEL SECURITY;

-- Check the policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'booking_requests'
ORDER BY policyname;
