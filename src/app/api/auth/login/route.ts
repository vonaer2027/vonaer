import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { sessionOptions, SessionData, defaultSession } from '@/lib/session'

// Hardcoded credentials (in production, these should be in a secure database)
const ADMIN_CREDENTIALS = {
  username: 'vonaer',
  // This is the bcrypt hash of 'vonaer@2027'
  // Generated using: bcrypt.hashSync('vonaer@2027', 10)
  passwordHash: '$2b$10$WfCA0T/ZZfEudGm5o0bVN.5NSZttzfo9R5qa2cx5gDeGBdnRqc9BC',
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required' },
        { status: 400 }
      )
    }

    // Check username
    if (username !== ADMIN_CREDENTIALS.username) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, ADMIN_CREDENTIALS.passwordHash)

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Create session
    const cookieStore = await cookies()
    const session = await getIronSession<SessionData>(cookieStore, sessionOptions)

    session.userId = 'admin-1'
    session.username = username
    session.isLoggedIn = true

    await session.save()

    return NextResponse.json({
      success: true,
      user: {
        username: session.username,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed. Use POST to login.' },
    { status: 405 }
  )
}
