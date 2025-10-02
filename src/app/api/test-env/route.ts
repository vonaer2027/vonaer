import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.json({
    BIZGO_API_KEY: process.env.BIZGO_API_KEY ? 'SET' : 'NOT SET',
    BIZGO_BASE_URL: process.env.BIZGO_BASE_URL || 'NOT SET',
    NODE_ENV: process.env.NODE_ENV,
    allEnvKeys: Object.keys(process.env).filter(key => key.includes('BIZGO'))
  })
}


