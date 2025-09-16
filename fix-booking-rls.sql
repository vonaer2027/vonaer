-- Fix RLS Policy for Booking Requests
-- Run this in your Supabase SQL Editor to allow anonymous bookings

-- Drop the existing policy
DROP POLICY IF EXISTS "Allow insert access to booking_requests" ON booking_requests;

-- Create new policy that allows anonymous users to insert booking requests
CREATE POLICY "Allow insert access to booking_requests" ON booking_requests
    FOR INSERT TO anon WITH CHECK (true);

-- Also allow authenticated users to insert (for flexibility)
CREATE POLICY "Allow insert access to booking_requests_auth" ON booking_requests
    FOR INSERT TO authenticated WITH CHECK (true);

-- Verify the policies are working
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'booking_requests';
