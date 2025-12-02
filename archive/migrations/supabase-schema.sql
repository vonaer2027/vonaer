-- Supabase Schema for Admin Dashboard
-- Run this SQL in your Supabase SQL Editor

-- Create the flights table
CREATE TABLE IF NOT EXISTS flights (
  id SERIAL PRIMARY KEY,
  flight_id TEXT UNIQUE NOT NULL,
  raw_text TEXT,
  price TEXT,
  price_numeric DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  flight_date DATE,
  date_timestamp BIGINT,
  aircraft TEXT,
  seats INTEGER,
  from_city TEXT,
  from_country TEXT,
  from_formatted TEXT,
  to_city TEXT,
  to_country TEXT,
  to_formatted TEXT,
  route_summary TEXT,
  involves_korea BOOLEAN DEFAULT false,
  scraped_timestamp TIMESTAMPTZ,
  image_urls JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create the users table for user management
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone_number TEXT NOT NULL UNIQUE,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  notes TEXT
);

-- Create the margin_settings table for flight pricing
CREATE TABLE IF NOT EXISTS margin_settings (
  id SERIAL PRIMARY KEY,
  margin_percentage DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  is_active BOOLEAN DEFAULT true,
  created_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_flights_flight_id ON flights(flight_id);
CREATE INDEX IF NOT EXISTS idx_flights_date ON flights(flight_date);
CREATE INDEX IF NOT EXISTS idx_flights_from_city ON flights(from_city);
CREATE INDEX IF NOT EXISTS idx_flights_to_city ON flights(to_city);
CREATE INDEX IF NOT EXISTS idx_flights_involves_korea ON flights(involves_korea);
CREATE INDEX IF NOT EXISTS idx_flights_price_numeric ON flights(price_numeric);
CREATE INDEX IF NOT EXISTS idx_flights_aircraft ON flights(aircraft);

CREATE INDEX IF NOT EXISTS idx_users_phone_number ON users(phone_number);
CREATE INDEX IF NOT EXISTS idx_users_name ON users(name);
CREATE INDEX IF NOT EXISTS idx_users_is_active ON users(is_active);

CREATE INDEX IF NOT EXISTS idx_margin_settings_is_active ON margin_settings(is_active);

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_flights_updated_at ON flights;
CREATE TRIGGER update_flights_updated_at
    BEFORE UPDATE ON flights
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_margin_settings_updated_at ON margin_settings;
CREATE TRIGGER update_margin_settings_updated_at
    BEFORE UPDATE ON margin_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE flights ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE margin_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS (drop existing policies first to avoid conflicts)
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow read access to flights" ON flights;
DROP POLICY IF EXISTS "Allow read access to users" ON users;
DROP POLICY IF EXISTS "Allow read access to margin_settings" ON margin_settings;
DROP POLICY IF EXISTS "Allow full access to service role flights" ON flights;
DROP POLICY IF EXISTS "Allow full access to service role users" ON users;
DROP POLICY IF EXISTS "Allow full access to service role margin_settings" ON margin_settings;
DROP POLICY IF EXISTS "Allow full access to service role" ON flights;

-- Allow read access to authenticated users
CREATE POLICY "Allow read access to flights" ON flights
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow read access to users" ON users
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow read access to margin_settings" ON margin_settings
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow full access for service role or admin users
CREATE POLICY "Allow full access to service role flights" ON flights
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Allow full access to service role users" ON users
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Allow full access to service role margin_settings" ON margin_settings
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Insert default margin setting
INSERT INTO margin_settings (margin_percentage, is_active, created_by) 
VALUES (0.00, true, 'system') 
ON CONFLICT DO NOTHING;

-- Sample data for testing (optional)
-- INSERT INTO users (name, phone_number, email) VALUES 
-- ('김철수', '+82-10-1234-5678', 'kim@example.com'),
-- ('이영희', '+82-10-9876-5432', 'lee@example.com')
-- ON CONFLICT (phone_number) DO NOTHING;

-- Sample queries to verify the setup
-- SELECT COUNT(*) FROM flights;
-- SELECT * FROM flights WHERE involves_korea = true LIMIT 5;
-- SELECT DISTINCT aircraft FROM flights ORDER BY aircraft;