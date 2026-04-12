import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname
        const protectedPaths = [
          '/home', '/family', '/memory', '/profile',
          '/sathi', '/bookings', '/notifications',
          '/care', '/companion',
        ]
        const isProtected = protectedPaths.some(p => pathname.startsWith(p))
        if (isProtected) return !!token
        return true
      }
    }
  }
)

export const config = {
  matcher: [
    '/home/:path*',
    '/family/:path*',
    '/memory/:path*',
    '/profile/:path*',
    '/sathi/:path*',
    '/bookings/:path*',
    '/notifications/:path*',
    '/care/:path*',
    '/companion/:path*',
  ]
}
