import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getIronSession } from 'iron-session'
import { sessionOptions, SessionData, isSessionValid } from '@/lib/session'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow access to login page and auth API routes
  if (
    pathname === '/admin/login' ||
    pathname.startsWith('/api/auth/')
  ) {
    return NextResponse.next()
  }

  // Protect ALL /admin routes - require valid session
  if (pathname.startsWith('/admin')) {
    try {
      const response = NextResponse.next()
      const session = await getIronSession<SessionData>(request, response, sessionOptions)

      // Strict session validation - must have valid session with userId and isLoggedIn=true
      if (!isSessionValid(session)) {
        console.log(`[Auth] Unauthorized access attempt to: ${pathname}`)
        const loginUrl = new URL('/admin/login', request.url)
        loginUrl.searchParams.set('redirect', pathname)
        return NextResponse.redirect(loginUrl)
      }

      // Additional check: verify session data integrity
      if (!session.username || session.username !== 'vonaer') {
        console.log(`[Auth] Invalid session data for: ${pathname}`)
        const loginUrl = new URL('/admin/login', request.url)
        return NextResponse.redirect(loginUrl)
      }

      return response
    } catch (error) {
      console.error('[Auth] Middleware error:', error)
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin',
    '/admin/:path*',
    '/api/admin/:path*',
  ],
}
