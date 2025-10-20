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

  // Protect /admin routes
  if (pathname.startsWith('/admin')) {
    try {
      const response = NextResponse.next()
      const session = await getIronSession<SessionData>(request, response, sessionOptions)

      // Check if session is valid
      if (!isSessionValid(session)) {
        // Redirect to login page
        const loginUrl = new URL('/admin/login', request.url)
        loginUrl.searchParams.set('redirect', pathname)
        return NextResponse.redirect(loginUrl)
      }

      return response
    } catch (error) {
      console.error('Middleware error:', error)
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
  ],
}
