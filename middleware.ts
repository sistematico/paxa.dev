import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isValidLocale } from "@/i18n/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip for API routes, _next internals, and static files with extensions
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/og") ||
    /\.[^/]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Check if the pathname already starts with a valid locale
  const firstSegment = pathname.split("/")[1];
  if (isValidLocale(firstSegment)) {
    return NextResponse.next();
  }

  // Redirect to the default locale
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|audio).*)"],
};
