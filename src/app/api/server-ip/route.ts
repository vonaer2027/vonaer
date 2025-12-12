import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Get outbound IP by making request to external service
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()

    return NextResponse.json({
      outboundIP: data.ip,
      timestamp: new Date().toISOString(),
      message: 'This is the IP address that Vercel uses for outbound requests. Whitelist this IP with BizGO/Infobank.'
    })
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to get IP',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
