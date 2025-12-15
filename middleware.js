import { NextResponse } from "next/server";

const COUNTRY_CODES = ["ae", "pk", "sa", "om"];
const DEFAULT_COUNTRY = "ae"; // You can change this to your preferred default

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Ignore Next internals and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  // 🚨 If country is missing → FORCE /ae (or your default)
  if (!COUNTRY_CODES.includes(firstSegment)) {
    // Clone the URL and prepend default country
    const newUrl = request.nextUrl.clone();
    
    // For root path, just go to /ae
    if (pathname === "/") {
      newUrl.pathname = `/${DEFAULT_COUNTRY}`;
    } else {
      newUrl.pathname = `/${DEFAULT_COUNTRY}${pathname}`;
    }
    
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
}

// Make sure middleware runs on all paths
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};