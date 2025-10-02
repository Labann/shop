// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname; // e.g. "/products/123"

  // clone headers and add custom one
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-current-path", path);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// Apply to all routes
export const config = {
  matcher: ["/:path*"],
};
