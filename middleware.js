import { NextResponse } from "next/server";

const COUNTRY_CODES = ["ae", "pk", "sa", "om"];
const DEFAULT_COUNTRY = "ae";

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

  // Check if URL already has a valid country
  if (COUNTRY_CODES.includes(firstSegment)) {
    // Set a cookie for the country so we can access it in context
    const response = NextResponse.next();
    response.cookies.set("country", firstSegment, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    return response;
  }

  // Check for country in cookie (from localStorage)
  const cookieCountry = request.cookies.get("country")?.value;
  const preferredCountry = cookieCountry && COUNTRY_CODES.includes(cookieCountry) 
    ? cookieCountry 
    : DEFAULT_COUNTRY;

  // Clone the URL and prepend the preferred country
  const newUrl = request.nextUrl.clone();
  
  // For root path, just go to preferred country
  if (pathname === "/") {
    newUrl.pathname = `/${preferredCountry}`;
  } else {
    newUrl.pathname = `/${preferredCountry}${pathname}`;
  }
  
  // Set cookie for the redirected country
  const response = NextResponse.redirect(newUrl);
  response.cookies.set("country", preferredCountry, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
  
  return response;
}

// Make sure middleware runs on all paths
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};