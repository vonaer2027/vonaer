-- Migration: Create tiered margin settings table
-- Run this SQL in your Supabase SQL Editor

-- Create tiered margin settings table
CREATE TABLE IF NOT EXISTS tiered_margin_settings (
  id SERIAL PRIMARY KEY,
  min_price NUMERIC NOT NULL,
  max_price NUMERIC NOT NULL,
  margin_percentage NUMERIC NOT NULL CHECK (margin_percentage >= 0 AND margin_percentage <= 100),
  is_active BOOLEAN DEFAULT true,
  created_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT valid_price_range CHECK (min_price < max_price)
);

-- Insert default tiered margins (you can adjust these values)
INSERT INTO tiered_margin_settings (min_price, max_price, margin_percentage, created_by) VALUES
  (0, 10000, 30, 'system'),
  (10000, 20000, 25, 'system'),
  (20000, 40000, 15, 'system'),
  (40000, 80000, 10, 'system'),
  (80000, 999999999, 5, 'system');

-- Enable RLS
ALTER TABLE tiered_margin_settings ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access" ON tiered_margin_settings
  FOR SELECT USING (true);

-- Create policy for all operations (adjust based on your auth needs)
CREATE POLICY "Allow all operations" ON tiered_margin_settings
  FOR ALL USING (true) WITH CHECK (true);

-- Create index for efficient lookups
CREATE INDEX idx_tiered_margin_price_range ON tiered_margin_settings (min_price, max_price);
