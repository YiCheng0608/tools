import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

let locales = ["en", "zh"];

// Get the preferred locale, similar to above or using a different method
function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language");
  return acceptLanguage?.split(",")?.[0].split("-")?.[0] || "en";
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // If accessing the root path, redirect to calculator
  if (pathname === "/") {
    const locale = getLocale(request);
    return NextResponse.redirect(new URL(`/${locale}/calculator`, request.url));
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|favicon.ico).*)",
  ],
};
