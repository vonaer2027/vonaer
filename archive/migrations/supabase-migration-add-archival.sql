-- Migration: Add archival and price type support
-- Run this if you have an existing flights table

-- Add new columns
ALTER TABLE flights
ADD COLUMN IF NOT EXISTS price_type TEXT DEFAULT 'fixed' CHECK (price_type IN ('fixed', 'enquire')),
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS last_seen_at TIMESTAMPTZ DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ;

-- Update existing records to set is_active to true
UPDATE flights SET is_active = true WHERE is_active IS NULL;

-- Update existing records to set price_type to 'fixed' for records with numeric prices
UPDATE flights
SET price_type = 'fixed'
WHERE price_type IS NULL AND price_numeric IS NOT NULL;

-- Update existing records to set price_type to 'enquire' for records without numeric prices
UPDATE flights
SET price_type = 'enquire'
WHERE price_type IS NULL AND price_numeric IS NULL;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_flights_is_active ON flights(is_active);
CREATE INDEX IF NOT EXISTS idx_flights_price_type ON flights(price_type);

-- Create a view to show only active flights (optional)
CREATE OR REPLACE VIEW active_flights AS
SELECT * FROM flights
WHERE is_active = true
ORDER BY created_at DESC;

-- Create a view to show archived flights (optional)
CREATE OR REPLACE VIEW archived_flights AS
SELECT * FROM flights
WHERE is_active = false
ORDER BY archived_at DESC;

COMMENT ON COLUMN flights.price_type IS 'Type of pricing: fixed (has USD amount) or enquire (contact for price)';
COMMENT ON COLUMN flights.is_active IS 'Whether this flight is currently available on the website';
COMMENT ON COLUMN flights.last_seen_at IS 'Last time this flight was seen during a scrape';
COMMENT ON COLUMN flights.archived_at IS 'When this flight was marked as no longer available';
