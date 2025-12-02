# Combined Crawler Improvements

## 🎯 Issues Addressed

### 1. Invalid Flights with "Unknown" Locations ❌ FIXED
**Problem**: Flights like "Dominican → Seoul" with "Unknown" country were being scraped and uploaded.

**Root Cause**: FlyXO crawler (flyxo-crawler-with-upload.js:247) defaults to `country: 'Unknown'` when city is not in the predefined cityMap.

**Solution**: Added comprehensive validation in `combineAndDeduplicate()` method:
- ✅ Filters out flights with "Unknown" country
- ✅ Validates all critical location data (city, country, formatted)
- ✅ Logs filtered flights with specific reasons
- ✅ Provides breakdown of filtering reasons

### 2. Missing Default Images 📸 ENHANCED
**Problem**: Some flights displayed without images (showing broken image icons).

**Previous State**: Default image fallback existed but image validation was basic.

**Improvements**:
- ✅ Enhanced image URL validation (checks for http prefix, non-empty, trimmed)
- ✅ Better filtering of invalid image URLs
- ✅ Logging when default image is used for debugging
- ✅ Robust fallback to default image: `https://xsctqzbwa1mbabgs.public.blob.vercel-storage.com/1.webp`

### 3. "TBD" Seats Display ℹ️ CLARIFIED (By Design)
**Observation**: Some flights show "TBD" for seats.

**Explanation**: This is **by design** and **expected behavior**:
- FlyXO source does not provide seat information in their data
- FlyXO crawler sets `seats: null` (line 287 in flyxo-crawler-with-upload.js)
- Frontend displays `null` as "TBD"
- This is **valid** - the flights are real, just without seat count data

**Note**: JetBay flights DO have seat information when available.

## 🛡️ New Validation System

### Validation Rules (combined-crawler.js:115-179)

Every flight is now validated against these criteria:

1. **Location Validation**:
   - ✅ No "Unknown" countries
   - ✅ Both cities must be present
   - ✅ Both countries must be present
   - ✅ Formatted location strings required

2. **Date Validation**:
   - ✅ Date must be present
   - ✅ Timestamp must be valid
   - ✅ Flight date cannot be in the past

3. **Price Validation**:
   - ✅ Price information required
   - ✅ Can be fixed price or "Enquire"

4. **Route Validation**:
   - ✅ Route summary must be present

### Filtering Process

```
Raw Flights (FlyXO + JetBay)
    ↓
STEP 1: Validation
    ├─ ✅ Valid → Keep
    └─ ❌ Invalid → Filter out + Log reason
    ↓
Valid Flights Only
    ↓
STEP 2: Deduplication
    ├─ Same route+date+price → Keep best version
    └─ Unique flights → Keep all
    ↓
Final Dataset → Upload to Supabase
```

## 📊 Enhanced Logging

### During Validation
```
🔍 Validating flights...
   ❌ Filtered out [flyxo]: Dominican → Seoul - Unknown location (Dominican)
   ❌ Filtered out [jetbay]: Paris → Unknown - Missing country information
   ❌ Filtered out [flyxo]: Tokyo → Seoul - Past flight date

📊 Validation Results:
   Valid flights: 45
   Invalid flights filtered: 12
   Reasons for filtering:
      Unknown location: 5 flights
      Missing country information: 3 flights
      Past flight date: 4 flights
```

### During Image Processing
```
   📸 Using default image for flight flyxo_1763793125101_1 (Tokyo → Seoul)
```

### In Saved JSON File
```json
{
  "metadata": {
    "dataQuality": {
      "withSeats": 20,
      "withoutSeats": 25,
      "withDefaultImage": 25,
      "notes": [
        "FlyXO source does not provide seat information (null is expected)",
        "FlyXO source does not provide images (default image is used)",
        "All flights are validated for location data, dates, and prices"
      ]
    }
  }
}
```

## 🔧 Technical Improvements

### Code Changes

1. **combined-crawler.js**:
   - Added `validateFlight(flight)` method (lines 115-179)
   - Enhanced `combineAndDeduplicate()` with validation step (lines 181-282)
   - Improved `transformForSupabase()` with robust image handling (lines 284-342)
   - Enhanced `saveToFile()` with data quality statistics (lines 455-497)

2. **Validation Logic**:
   - Comprehensive field validation
   - Past date filtering
   - Clear rejection reasons
   - Statistical breakdown

3. **Image Handling**:
   - URL validation (http prefix check)
   - Empty/whitespace filtering
   - Debug logging
   - Guaranteed default fallback

## 📈 Expected Results

### Before Improvements
- ❌ Flights with "Unknown" locations uploaded
- ⚠️ Some flights without images (broken icons)
- ❓ No clarity on why flights were filtered
- ❓ No visibility into data quality

### After Improvements
- ✅ All flights have valid location data
- ✅ All flights have images (default if source doesn't provide)
- ✅ Clear logging of filtered flights and reasons
- ✅ Data quality statistics in output
- ✅ Past-dated flights automatically excluded

## 🚀 Usage

### Running the Improved Crawler
```bash
node combined-crawler.js
```

### Expected Output
```
🚀 Combined Empty Leg Crawler (FlyXO + JetBay)
================================================

🔵 Running FlyXO scraper...
✅ FlyXO complete: 30 flights found

🟢 Running JetBay scraper...
✅ JetBay complete: 25 flights found

🔍 Validating flights...
   ❌ Filtered out [flyxo]: Dominican → Seoul - Unknown location (Dominican)

📊 Validation Results:
   Valid flights: 50
   Invalid flights filtered: 5
   Reasons for filtering:
      Unknown location: 3 flights
      Past flight date: 2 flights

🔄 Deduplicating valid flights...
   🔍 Potential duplicate found:
      flyxo: Tokyo → Seoul - $15,170 USD (Nov 25, 2025)
      jetbay: Tokyo → Seoul - $15,170 USD (Nov 25, 2025)
      ✅ Keeping JetBay version (more details)

📊 Deduplication Results:
   Unique flights: 45
   Duplicates removed: 5
   Final breakdown:
      flyxo: 20 flights
      jetbay: 25 flights

💾 Saving combined data to JSON file...
   📸 Using default image for flight flyxo_1763793125101_1 (Tokyo → Seoul)
✅ Data saved to combined_flights_2025-11-24.json

🚀 Starting unified Supabase upload...
✅ Successfully uploaded 45 flights

🎉 Process completed successfully!
```

## 🔍 Data Quality Notes

### About "TBD" Seats
- **Expected for FlyXO flights**: FlyXO source doesn't provide seat counts
- **Available for JetBay flights**: When seat info is in the source data
- **Not an error**: Frontend shows `null` as "TBD" - this is intentional
- **Business logic**: Flights without seat counts are still valid empty legs

### About Default Images
- **FlyXO flights**: Always use default image (source has no images)
- **JetBay flights**: Use source images when available, default if missing
- **Default image**: Professional private jet photo from Vercel storage
- **Prevents broken images**: Ensures all flights display properly

### About Location Validation
- **Strict filtering**: Only flights with complete location data pass
- **"Unknown" rejected**: Indicates incomplete/invalid source data
- **Quality assurance**: Prevents confusing data in the application
- **User experience**: All displayed flights have valid, complete information

## 🎯 Summary

The improved crawler now provides:
1. ✅ **Robust validation** - Filters out invalid flights with clear reasons
2. ✅ **Better image handling** - Guaranteed images for all flights
3. ✅ **Enhanced logging** - Full visibility into filtering and processing
4. ✅ **Data quality metrics** - Statistics in output files
5. ✅ **Clear documentation** - Understanding of data limitations and by-design behavior

The "Unknown" location issue is **completely resolved** - no invalid flights will reach the database.

The "missing image" issue is **completely resolved** - all flights will have images (source or default).

The "TBD seats" is **not an issue** - it's expected behavior for FlyXO source data.
