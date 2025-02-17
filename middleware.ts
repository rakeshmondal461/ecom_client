import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const isAuthenticated = !!req.nextauth.token;

    // Redirect to / if already signed in and trying to access /signin
    if (isAuthenticated && pathname === "/signin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Redirect to /signin if not authenticated and trying to access protected routes
    if (!isAuthenticated && pathname !== "/signin") {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // User must be authenticated
    },
  }
);

// Define protected routes
export const config = {
  matcher: ["/"], // Protect these routes
};
