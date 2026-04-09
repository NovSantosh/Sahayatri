import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/',
    },
  }
)

export const config = {
  matcher: [
    '/home/:path*',
    '/family/:path*',
    '/sathi/:path*',
    '/memory/:path*',
    '/profile/:path*',
    '/edit-profile/:path*',
    '/notifications/:path*',
    '/search/:path*',
    '/wallet/:path*',
    '/book/:path*',
    '/bookings/:path*',
    '/professional/:path*',
  ],
}
