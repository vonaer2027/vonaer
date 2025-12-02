# Setup Booking Requests Table

## Issue
The booking form is failing because the `booking_requests` table doesn't exist in your Supabase database yet.

## Solution
Run the SQL script `booking-requests-schema.sql` in your Supabase SQL Editor:

1. **Go to your Supabase Dashboard**
2. **Navigate to SQL Editor**
3. **Copy and paste the contents of `booking-requests-schema.sql`**
4. **Click "RUN"**

## What this creates:
- `booking_requests` table with proper structure
- Indexes for performance
- RLS policies for security
- Triggers for automatic timestamps

## Test the booking flow:
1. Visit `/flights` 
2. Click "Request Booking" on any flight
3. Fill out the form and submit
4. Check the admin dashboard "Bookings" tab to see the request

## Common Issues:
- **RLS Policy Error**: Make sure you're using the service role key for admin operations
- **Missing Table**: Run the schema script first
- **Permission Error**: Check that the policies allow inserts for anonymous users

The booking system will work once the database table is properly set up!
