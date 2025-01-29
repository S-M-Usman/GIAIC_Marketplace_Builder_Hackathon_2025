import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Check if user is authenticated and is admin
  const isAdmin = request.cookies.get("isAdmin")?.value === "true"
  const isAuthenticated = request.cookies.get("authenticated")?.value === "true"

  // Get the pathname of the request (e.g. /admin, /admin/users)
  const pathname = request.nextUrl.pathname

  // If trying to access admin routes and not an admin, redirect to sign in
  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/auth/signin", request.url))
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - assets (public assets)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|assets).*)",
  ],
}

