# Flight Scraper for Vercel/Next.js

This document explains how the flight scraper has been adapted to work on Vercel/Next.js using serverless functions.

## Overview

The original `unified-crawler-with-upload.js` script has been converted into a Next.js API route that can run on Vercel's serverless infrastructure.

## Architecture

### Components

1. **API Route**: `/src/app/api/scrape-flights/route.ts`
   - Serverless function that handles the scraping logic
   - Uses Playwright with `@sparticuz/chromium` for browser automation
   - Automatically uploads results to Supabase

2. **UI Component**: `/src/components/flight-scraper.tsx`
   - Admin dashboard component to trigger scraping
   - Shows real-time status and results
   - Displays scraping statistics

3. **Configuration**: `vercel.json`
   - Extended timeout (5 minutes) for scraping function
   - Increased memory allocation (1GB)
   - Environment variables setup

### Key Changes from Original Script

| Original Script | Serverless Version |
|----------------|-------------------|
| Puppeteer with local Chrome | Playwright with @sparticuz/chromium |
| Long-running Node.js process | Serverless function with timeout |
| File system writes | Direct database upload only |
| Manual execution | Web UI trigger |

## Dependencies

```json
{
  "playwright-core": "^1.40.0",
  "@sparticuz/chromium": "^138.0.2",
  "@supabase/supabase-js": "^2.38.0"
}
```

## Environment Variables

Required in Vercel deployment:

```bash
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_ANON_KEY=your_anon_key  # fallback
```

## Usage

### Via Admin Dashboard

1. Navigate to `/admin`
2. Go to the "Settings" tab
3. Find the "Flight Scraper" component
4. Click "Start Scraping"
5. Monitor progress and results

### Via API

```bash
# GET - Check status
curl https://your-app.vercel.app/api/scrape-flights

# POST - Start scraping
curl -X POST https://your-app.vercel.app/api/scrape-flights
```

## Limitations

### Vercel Constraints

- **Execution Time**: 5 minutes maximum (Pro plan)
- **Memory**: 1GB allocated
- **Cold Starts**: First request may be slower
- **Concurrent Executions**: Limited by plan

### Scraping Constraints

- Reduced "View More" clicks (5 max vs 10 in original)
- No file system caching
- Simplified error handling for serverless environment

## Performance Optimizations

1. **Reduced Timeouts**: Faster page load detection
2. **Batch Processing**: Efficient database uploads
3. **Memory Management**: Proper browser cleanup
4. **Duplicate Prevention**: Skip existing flights

## Monitoring

### Success Metrics

- Total flights found
- New flights uploaded
- Duplicate flights skipped
- Processing time

### Error Handling

- Browser launch failures
- Network timeouts
- Database connection issues
- Parsing errors

## Deployment

### Vercel Configuration

The `vercel.json` file includes:

```json
{
  "functions": {
    "app/api/scrape-flights/route.ts": {
      "maxDuration": 300,
      "memory": 1024
    }
  }
}
```

### Environment Setup

1. Add environment variables in Vercel dashboard
2. Ensure Supabase database has the `flights` table
3. Verify RLS policies allow service role access

## Troubleshooting

### Common Issues

1. **Timeout Errors**
   - Reduce scraping scope
   - Optimize selectors
   - Check network connectivity

2. **Memory Issues**
   - Ensure proper browser cleanup
   - Monitor memory usage
   - Consider reducing concurrent operations

3. **Database Errors**
   - Verify environment variables
   - Check Supabase connection
   - Validate table schema

### Debug Mode

Enable detailed logging by checking Vercel function logs:

```bash
vercel logs your-deployment-url
```

## Comparison with Alternatives

| Approach | Pros | Cons |
|----------|------|------|
| **Serverless (Current)** | Easy deployment, auto-scaling | Time/memory limits |
| **Scheduled Jobs** | Reliable, no timeouts | Complex setup |
| **External Services** | Specialized tools | Additional costs |
| **Edge Functions** | Global distribution | Limited capabilities |

## Future Improvements

1. **Caching**: Implement Redis for session data
2. **Queuing**: Use background job processing
3. **Monitoring**: Add detailed analytics
4. **Scheduling**: Automatic periodic runs
5. **Notifications**: Alert on failures/success

## Testing

Run the test script to verify setup:

```bash
node test-scraper.js
```

This tests the API endpoint without running the full scraper.

## Support

For issues or questions:

1. Check Vercel function logs
2. Verify environment variables
3. Test database connectivity
4. Review browser compatibility

The scraper maintains the same core functionality as the original script while being optimized for serverless deployment on Vercel.

