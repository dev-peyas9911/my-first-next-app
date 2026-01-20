import { auth } from "@/auth";

export const middleware = auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  // Redirect logged-in users away from login page
  if (pathname === "/login" && isLoggedIn) {
    return Response.redirect(new URL("/items", req.nextUrl.origin));
  }
});

export const config = {
  matcher: ["/items/:path*", "/login"]
};
