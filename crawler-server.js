const express = require('express');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'emptyleg-crawler'
  });
});

// Authentication middleware
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const expectedToken = process.env.CRAWLER_SECRET;

  if (!expectedToken) {
    console.error('⚠️  CRAWLER_SECRET not set in environment variables');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  if (!authHeader || authHeader !== `Bearer ${expectedToken}`) {
    console.warn('🚫 Unauthorized crawl attempt');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
};

// Crawl endpoint
app.post('/crawl', authenticate, async (req, res) => {
  const startTime = Date.now();
  console.log('🚀 Crawl request received at', new Date().toISOString());

  try {
    // Run the crawler
    console.log('📡 Executing crawler script...');
    const { stdout, stderr } = await execPromise('node unified-crawler-with-upload.js', {
      timeout: 120000, // 2 minutes timeout
      maxBuffer: 1024 * 1024 * 10 // 10MB buffer
    });

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log('✅ Crawler completed successfully');
    console.log(`⏱️  Duration: ${duration}s`);

    // Parse the output to extract statistics
    const statsMatch = stdout.match(/Flights scraped: (\d+)/);
    const flightsScraped = statsMatch ? parseInt(statsMatch[1]) : 0;

    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      duration: `${duration}s`,
      flightsScraped,
      message: 'Crawler executed successfully'
    });

  } catch (error) {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.error('❌ Crawler failed:', error.message);
    console.error('Duration before failure:', `${duration}s`);

    res.status(500).json({
      success: false,
      timestamp: new Date().toISOString(),
      duration: `${duration}s`,
      error: error.message,
      stdout: error.stdout ? error.stdout.substring(0, 1000) : null,
      stderr: error.stderr ? error.stderr.substring(0, 1000) : null
    });
  }
});

// Manual trigger endpoint (for testing)
app.get('/crawl/trigger', authenticate, async (req, res) => {
  res.json({
    message: 'Crawl triggered. Check /status for progress.',
    tip: 'Use POST /crawl for synchronous execution'
  });

  // Trigger async (don't wait for completion)
  exec('node unified-crawler-with-upload.js', (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Async crawl failed:', error.message);
    } else {
      console.log('✅ Async crawl completed');
    }
  });
});

// Status endpoint
app.get('/status', (req, res) => {
  res.json({
    service: 'emptyleg-crawler',
    status: 'running',
    timestamp: new Date().toISOString(),
    environment: {
      nodeVersion: process.version,
      platform: process.platform,
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasCrawlerSecret: !!process.env.CRAWLER_SECRET
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('💥 Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log('🚀 Crawler server started');
  console.log(`📡 Listening on port ${PORT}`);
  console.log(`🔒 Authentication: ${process.env.CRAWLER_SECRET ? 'Enabled' : '⚠️  DISABLED - Set CRAWLER_SECRET!'}`);
  console.log('');
  console.log('Available endpoints:');
  console.log(`  GET  /health          - Health check`);
  console.log(`  GET  /status          - Service status`);
  console.log(`  POST /crawl           - Run crawler (sync)`);
  console.log(`  GET  /crawl/trigger   - Run crawler (async)`);
  console.log('');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received, shutting down gracefully');
  process.exit(0);
});
