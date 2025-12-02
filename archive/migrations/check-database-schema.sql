-- Check if custom_price column exists in flights table
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'flights' 
ORDER BY ordinal_position;

-- Check if customer_email column exists in booking_requests table
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'booking_requests' 
ORDER BY ordinal_position;

-- Check all tables in the current schema
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

