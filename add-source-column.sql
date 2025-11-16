-- Add source column to flights table
-- This column tracks whether a flight was scraped from 'flyxo' or 'jetbay'

ALTER TABLE flights
ADD COLUMN IF NOT EXISTS source TEXT;

-- Add index for better query performance when filtering by source
CREATE INDEX IF NOT EXISTS idx_flights_source ON flights(source);

-- Add constraint to ensure source is either 'flyxo' or 'jetbay'
ALTER TABLE flights
ADD CONSTRAINT check_source_valid
CHECK (source IN ('flyxo', 'jetbay') OR source IS NULL);

-- Optionally, add a comment to the column
COMMENT ON COLUMN flights.source IS 'Source of the flight data: flyxo or jetbay';
