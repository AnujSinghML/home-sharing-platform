import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Update to use the new config format
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Define protected routes
export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/listings/create',
    '/bookings/:path*',
  ],
};
