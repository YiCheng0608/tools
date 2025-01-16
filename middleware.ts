import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const SUPPORTED_LOCALES = ["en", "zh", "ja", "ko"];
const DEFAULT_LOCALE = "en";

export function middleware(request: NextRequest) {
  // 檢查是否為靜態文件
  if (
    PUBLIC_FILE.test(request.nextUrl.pathname) ||
    request.nextUrl.pathname.startsWith("/images/") ||
    request.nextUrl.pathname.startsWith("/_next/") ||
    request.nextUrl.pathname.startsWith("/api/")
  ) {
    return;
  }

  const pathname = request.nextUrl.pathname;

  // 處理根路徑 "/"
  if (pathname === "/") {
    const browserLocale = request.headers
      .get("accept-language")
      ?.split(",")[0]
      .split("-")[0];

    const preferredLocale =
      request.cookies.get("NEXT_LOCALE")?.value ||
      (SUPPORTED_LOCALES.includes(browserLocale || "")
        ? browserLocale
        : DEFAULT_LOCALE);

    return NextResponse.redirect(new URL(`/${preferredLocale}`, request.url));
  }

  // 處理語系根目錄 "/en" 或 "/zh"
  if (SUPPORTED_LOCALES.includes(pathname.slice(1))) {
    return;
  }

  // 獲取當前請求的語言
  const locale = pathname.split("/")[1];

  // 如果已經有支援的語言前綴，不做任何處理
  if (SUPPORTED_LOCALES.includes(locale)) {
    return;
  }

  // 其他路徑添加語言前綴
  const preferredLocale =
    request.cookies.get("NEXT_LOCALE")?.value ||
    request.headers.get("accept-language")?.split(",")[0].split("-")[0] ||
    DEFAULT_LOCALE;

  // 重定向到帶有語言前綴的 URL
  return NextResponse.redirect(
    new URL(
      `/${
        SUPPORTED_LOCALES.includes(preferredLocale)
          ? preferredLocale
          : DEFAULT_LOCALE
      }${pathname}`,
      request.url
    )
  );
}

export const config = {
  matcher: [
    // 排除不需要重定向的路徑
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*)",
  ],
};
