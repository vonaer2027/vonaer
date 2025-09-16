-- Booking Requests Table for Client-Facing App
-- Run this SQL in your Supabase SQL Editor after the main schema

-- Create the booking_requests table
CREATE TABLE IF NOT EXISTS booking_requests (
  id SERIAL PRIMARY KEY,
  flight_id TEXT NOT NULL REFERENCES flights(flight_id),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  consent_given BOOLEAN NOT NULL DEFAULT false,
  called BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_booking_requests_flight_id ON booking_requests(flight_id);
CREATE INDEX IF NOT EXISTS idx_booking_requests_created_at ON booking_requests(created_at);
CREATE INDEX IF NOT EXISTS idx_booking_requests_customer_phone ON booking_requests(customer_phone);

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_booking_requests_updated_at ON booking_requests;
CREATE TRIGGER update_booking_requests_updated_at
    BEFORE UPDATE ON booking_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE booking_requests ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow read access to booking_requests" ON booking_requests;
DROP POLICY IF EXISTS "Allow insert access to booking_requests" ON booking_requests;
DROP POLICY IF EXISTS "Allow full access to service role booking_requests" ON booking_requests;

-- Allow read access to authenticated users (admin)
CREATE POLICY "Allow read access to booking_requests" ON booking_requests
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow insert access for anonymous users (client booking)
CREATE POLICY "Allow insert access to booking_requests" ON booking_requests
    FOR INSERT TO anon WITH CHECK (true);

-- Allow full access for service role or admin users
CREATE POLICY "Allow full access to service role booking_requests" ON booking_requests
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
