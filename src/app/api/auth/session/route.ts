import { NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { sessionOptions, SessionData, defaultSession, isSessionValid } from '@/lib/session'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const session = await getIronSession<SessionData>(cookieStore, sessionOptions)

    if (!isSessionValid(session)) {
      return NextResponse.json({
        isLoggedIn: false,
        user: null,
      })
    }

    return NextResponse.json({
      isLoggedIn: true,
      user: {
        userId: session.userId,
        username: session.username,
      },
    })
  } catch (error) {
    console.error('Session check error:', error)
    return NextResponse.json({
      isLoggedIn: false,
      user: null,
    })
  }
}
