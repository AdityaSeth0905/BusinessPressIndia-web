import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * Middleware function to add security headers to responses
 * Enhances security by setting appropriate HTTP headers
 *
 * @param request - The incoming request
 * @returns Response with added security headers
 */
export function middleware(request: NextRequest) {
  // Get the response
  const response = NextResponse.next()

  // Add security headers
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")

  // Add Content-Security-Policy header for form pages
  if (request.nextUrl.pathname.startsWith("/apply")) {
    response.headers.set(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'",
    )
  }

  return response
}

/**
 * Matcher configuration for the middleware
 * Specifies which routes the middleware should run on
 */
export const config = {
  matcher: ["/apply/:path*"],
}

