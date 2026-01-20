import { auth } from "@/auth";

export const middleware = auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // Redirect to items page if already logged in and trying to access login
  if (pathname === "/login" && isLoggedIn) {
    return Response.redirect(new URL("/items", req.nextUrl.origin));
  }

  return undefined;
});

export const config = {
  matcher: ["/items/:path*", "/login"]
};
