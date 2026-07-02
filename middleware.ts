import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';

// Protected routes that require authentication
const protectedRoutes = ['/dashboard', '/dashboard/earnings', '/dashboard/profile', '/dashboard/referrals'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if this is a protected route
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    const token = getTokenFromRequest(request);

    if (!token) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      // Redirect to login if token is invalid or expired
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Also redirect authenticated users away from login/signup pages
  if ((pathname === '/login' || pathname === '/signup') && getTokenFromRequest(request)) {
    const token = getTokenFromRequest(request);
    if (token && verifyToken(token)) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg).*)',
  ],
};
