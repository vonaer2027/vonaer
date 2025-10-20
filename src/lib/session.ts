import { SessionOptions } from 'iron-session'

export interface SessionData {
  userId?: string
  username?: string
  isLoggedIn: boolean
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
}

export const sessionOptions: SessionOptions = {
  password: process.env.AUTH_SECRET_KEY!,
  cookieName: 'vonaer-admin-session',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  },
}

// Helper to check if session is valid
export function isSessionValid(session: SessionData): boolean {
  return session.isLoggedIn === true && !!session.userId
}
