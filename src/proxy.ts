import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isValidLocale } from "@/i18n/config";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip for API routes, _next internals, and static files with known extensions
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/og") ||
    /\.(?:svg|png|jpe?g|gif|webp|webm|ico|mp3|mp4|ogg|wav|flac|woff2?|ttf|eot|css|js|json|xml|txt|pdf|map)$/i.test(
      pathname,
    )
  ) {
    return NextResponse.next();
  }

  // Determine locale from hostname: en.paxa.dev → "en", otherwise → "pt"
  const host = request.headers.get("host") || "";
  const locale = host.startsWith("en.") ? "en" : defaultLocale;

  // If the pathname starts with /pt or /en, redirect to the correct domain without prefix
  const firstSegment = pathname.split("/")[1];
  if (isValidLocale(firstSegment)) {
    if (process.env.NODE_ENV !== "production") {
      // In dev, the locale is already in the path — let Next.js route it via [locale]
      return NextResponse.next();
    }
    const cleanPath = pathname.replace(/^\/(pt|en)/, "") || "/";
    const targetHost = firstSegment === "en" ? "en.paxa.dev" : "paxa.dev";
    const url = request.nextUrl.clone();
    url.host = targetHost;
    url.pathname = cleanPath;
    return NextResponse.redirect(url);
  }

  // Rewrite internally to the [locale] route (URL stays clean in the browser)
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|images/|audio/|.*\\.(?:svg|png|jpe?g|gif|webp|webm|ico|mp3|mp4|ogg|wav|flac|woff2?|ttf|eot|css|js|json|xml|txt|pdf|map)$).*)",
  ],
};

export default proxy;
