import { auth } from "@/auth";

export const middleware = auth((req) => {
  try {
    const isLoggedIn = !!req.auth;
    const { pathname } = req.nextUrl;

    // Protected routes that require authentication
    const protectedRoutes = ["/items"];

    // Check if the current route is protected
    const isProtectedRoute = protectedRoutes.some(route =>
      pathname.startsWith(route)
    );

    // Redirect to login if trying to access protected route without authentication
    if (isProtectedRoute && !isLoggedIn) {
      const loginUrl = new URL("/login", req.nextUrl.origin);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return Response.redirect(loginUrl);
    }

    // Redirect to items page if already logged in and trying to access login
    if (pathname === "/login" && isLoggedIn) {
      return Response.redirect(new URL("/items", req.nextUrl.origin));
    }
  } catch (error) {
    console.error("Middleware error:", error);
    // Continue if there's any error, don't block the request
  }
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)"
  ]
};
