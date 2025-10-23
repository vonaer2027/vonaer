# Crawler Updates - Archival & Price Enquiry Support

## Summary of Changes

The unified crawler has been enhanced with two major features:

### 1. **"Enquire for Price" Support**
   - Crawler now captures flights without explicit USD pricing
   - Handles patterns: "Enquire for Price", "Contact for Price", "Request Quote", "POA"
   - New `price_type` field distinguishes between `fixed` and `enquire` pricing

### 2. **Automatic Archival System**
   - Only **currently active** flights are displayed from Supabase
   - Old flights (no longer on website) are automatically archived
   - New fields: `is_active`, `last_seen_at`, `archived_at`

## Database Schema Updates

### New Columns Added:
- `price_type` - TEXT: 'fixed' or 'enquire'
- `is_active` - BOOLEAN: true for active flights, false for archived
- `last_seen_at` - TIMESTAMPTZ: last time flight was seen during scrape
- `archived_at` - TIMESTAMPTZ: when flight was archived

## How It Works

### Archival Flow:
1. **Scrape** → Get current flights from website
2. **Compare** → Check against active flights in database
3. **Archive** → Mark missing flights as `is_active = false`
4. **Update** → Update `last_seen_at` for existing flights still available
5. **Insert** → Add new flights as `is_active = true`

### Query Active Flights:
```sql
SELECT * FROM flights
WHERE is_active = true
ORDER BY created_at DESC;
```

### Query Archived Flights:
```sql
SELECT * FROM flights
WHERE is_active = false
ORDER BY archived_at DESC;
```

## Setup Instructions

### For Existing Supabase Tables:

**Step 1:** Run the migration SQL in your Supabase SQL Editor
```bash
# File location: /Users/kjyoo/emptyleg/supabase-migration-add-archival.sql
```

**Step 2:** Go to your Supabase project → SQL Editor

**Step 3:** Copy and paste the contents of `supabase-migration-add-archival.sql`

**Step 4:** Click "Run" to execute the migration

### For New Installations:

The crawler will automatically create the table with all new fields when run for the first time.

## Migration File Contents

The migration adds:
- ✅ New columns (`price_type`, `is_active`, `last_seen_at`, `archived_at`)
- ✅ Indexes for better query performance
- ✅ Views: `active_flights` and `archived_flights` for easy querying
- ✅ Default values for existing records

## Testing the Updates

Run the crawler:
```bash
node unified-crawler-with-upload.js
```

Expected output:
```
📊 Upload Summary:
   Total flights scraped: X
   Active flights in DB: Y
   Flights to archive: Z
   Existing flights to update: A
   New flights to insert: B
```

## Features Demonstrated

### Price Type Handling:
- **Fixed Price**: "8,388 USD" → `price_type = 'fixed'`, `price_numeric = 8388`
- **Enquire Price**: "Enquire for Price" → `price_type = 'enquire'`, `price_numeric = null`

### Archival Statistics:
After each run, you'll see:
- ✅ **New flights inserted**: Flights added to database
- 🔄 **Existing flights updated**: Flights still available (last_seen_at updated)
- 📦 **Old flights archived**: Flights no longer on website (is_active = false)

## Frontend Integration

### Display Active Flights Only:
```javascript
// In your Next.js API or component:
const { data } = await supabase
  .from('flights')
  .select('*')
  .eq('is_active', true)
  .order('created_at', { ascending: false });
```

### Show Price Appropriately:
```javascript
// Handle both price types:
{flight.price_type === 'fixed'
  ? `$${flight.price_numeric.toLocaleString()}`
  : 'Enquire for Price'
}
```

## Benefits

1. **Data Accuracy**: Only current flights are shown to users
2. **Historical Data**: Archived flights preserved for analytics
3. **Automatic Maintenance**: No manual cleanup required
4. **Price Flexibility**: Both fixed and enquiry-based pricing supported
5. **Performance**: Indexed queries for fast retrieval

## Rollback (If Needed)

To rollback the changes:
```sql
-- Remove new columns
ALTER TABLE flights
DROP COLUMN IF EXISTS price_type,
DROP COLUMN IF EXISTS is_active,
DROP COLUMN IF EXISTS last_seen_at,
DROP COLUMN IF EXISTS archived_at;

-- Drop new indexes
DROP INDEX IF EXISTS idx_flights_is_active;
DROP INDEX IF EXISTS idx_flights_price_type;

-- Drop views
DROP VIEW IF EXISTS active_flights;
DROP VIEW IF EXISTS archived_flights;
```

## Files Modified

1. `unified-crawler-with-upload.js` - Main crawler script
2. `supabase-migration-add-archival.sql` - Database migration (NEW)
3. `CRAWLER_UPDATES.md` - This documentation (NEW)

## Support

For issues or questions:
1. Check the migration ran successfully in Supabase
2. Verify all new columns exist: `price_type`, `is_active`, `last_seen_at`, `archived_at`
3. Check Supabase logs for detailed error messages
4. Ensure `.env.local` has correct Supabase credentials
