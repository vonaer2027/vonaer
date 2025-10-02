import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Trigger external scraping service
    // Options:
    // 1. GitHub Actions with scheduled workflow
    // 2. Railway/Render cron job
    // 3. AWS Lambda with EventBridge
    // 4. Google Cloud Functions with Cloud Scheduler
    
    const response = await fetch(process.env.EXTERNAL_SCRAPER_WEBHOOK!, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SCRAPER_AUTH_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: 'scrape_flights',
        target: 'korea_flights',
        timestamp: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error('Failed to trigger scraping job');
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Scraping job triggered successfully',
      jobId: await response.text()
    });

  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to trigger scraping job' 
    }, { status: 500 });
  }
}

