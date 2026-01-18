import { auth } from "@/auth";

export const middleware = auth(function(req) {
  // This function only runs if auth succeeds
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // Redirect to items page if already logged in and trying to access login
  if (pathname === "/login" && isLoggedIn) {
    return Response.redirect(new URL("/items", req.nextUrl.origin));
  }
});

export const config = {
  matcher: ["/items/:path*", "/login"]
};
