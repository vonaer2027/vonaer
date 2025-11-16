import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get IP address from various headers
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const cfConnectingIp = request.headers.get('cf-connecting-ip'); // Cloudflare

    // Extract IP address (take first one if there are multiple in x-forwarded-for)
    let ip = forwardedFor?.split(',')[0]?.trim()
      || realIp
      || cfConnectingIp
      || request.ip
      || 'unknown';

    // For development/localhost, default to Korean
    if (ip === 'unknown' || ip === '::1' || ip.startsWith('127.') || ip.startsWith('192.168.')) {
      return NextResponse.json({
        locale: 'kr',
        country: 'KR',
        ip: ip,
        source: 'development-default'
      });
    }

    // Use ipapi.co free API for geolocation (1000 requests/day, no key needed)
    const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: {
        'User-Agent': 'VONAER-Locale-Detector/1.0'
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!geoResponse.ok) {
      // Fallback to Korean if API fails
      return NextResponse.json({
        locale: 'kr',
        country: 'unknown',
        ip: ip,
        source: 'api-error-fallback',
        error: 'Geolocation API failed'
      });
    }

    const geoData = await geoResponse.json();

    // Check if it's an error response from the API
    if (geoData.error) {
      return NextResponse.json({
        locale: 'kr',
        country: 'unknown',
        ip: ip,
        source: 'api-error-fallback',
        error: geoData.reason || 'Geolocation failed'
      });
    }

    const countryCode = geoData.country_code; // e.g., 'KR', 'US', 'JP', etc.

    // Determine locale based on country
    let locale = 'en'; // Default to English for non-Korean IPs

    if (countryCode === 'KR') {
      locale = 'kr'; // Korean for South Korea
    }
    // You can add more country-specific defaults if needed:
    // else if (countryCode === 'JP') {
    //   locale = 'jp'; // Japanese for Japan
    // }
    // else if (countryCode === 'CN' || countryCode === 'TW' || countryCode === 'HK') {
    //   locale = 'cn'; // Chinese for China, Taiwan, Hong Kong
    // }

    return NextResponse.json({
      locale,
      country: countryCode,
      ip: ip,
      city: geoData.city,
      region: geoData.region,
      source: 'geolocation-api'
    });

  } catch (error) {
    console.error('Error detecting locale:', error);

    // Fallback to Korean on any error
    return NextResponse.json({
      locale: 'kr',
      country: 'unknown',
      source: 'error-fallback',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
