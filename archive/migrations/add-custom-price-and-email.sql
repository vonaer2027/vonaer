-- Add custom_price column to flights table for individual price adjustments
ALTER TABLE flights ADD COLUMN custom_price DECIMAL(10,2);

-- Add customer_email column to booking_requests table
ALTER TABLE booking_requests ADD COLUMN customer_email VARCHAR(255);

-- Add index on custom_price for better query performance
CREATE INDEX idx_flights_custom_price ON flights(custom_price) WHERE custom_price IS NOT NULL;

-- Add index on customer_email for better query performance
CREATE INDEX idx_booking_requests_email ON booking_requests(customer_email) WHERE customer_email IS NOT NULL;

