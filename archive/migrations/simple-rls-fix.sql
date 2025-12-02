-- Simple RLS fix for booking requests
-- This should definitely work - run in Supabase SQL Editor

-- First, let's disable RLS temporarily to test
ALTER TABLE booking_requests DISABLE ROW LEVEL SECURITY;

-- Test if this fixes the issue first. If it does, then re-enable with proper policies:
-- ALTER TABLE booking_requests ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Allow read access to booking_requests" ON booking_requests;
DROP POLICY IF EXISTS "Allow insert access to booking_requests" ON booking_requests;
DROP POLICY IF EXISTS "Allow insert access to booking_requests_auth" ON booking_requests;
DROP POLICY IF EXISTS "Allow full access to service role booking_requests" ON booking_requests;
DROP POLICY IF EXISTS "booking_requests_insert_anon" ON booking_requests;
DROP POLICY IF EXISTS "booking_requests_select_auth" ON booking_requests;
DROP POLICY IF EXISTS "booking_requests_update_auth" ON booking_requests;
DROP POLICY IF EXISTS "booking_requests_delete_auth" ON booking_requests;
DROP POLICY IF EXISTS "booking_requests_all_service_role" ON booking_requests;

-- Create the most permissive policy possible for inserts
CREATE POLICY "allow_all_inserts" ON booking_requests
    FOR INSERT
    WITH CHECK (true);

-- Allow authenticated users to read (for admin)
CREATE POLICY "allow_auth_select" ON booking_requests
    FOR SELECT TO authenticated
    USING (true);

-- Allow authenticated users to update (for marking as called)
CREATE POLICY "allow_auth_update" ON booking_requests
    FOR UPDATE TO authenticated
    USING (true)
    WITH CHECK (true);

-- Re-enable RLS
ALTER TABLE booking_requests ENABLE ROW LEVEL SECURITY;

-- Check what we have
SELECT * FROM pg_policies WHERE tablename = 'booking_requests';
