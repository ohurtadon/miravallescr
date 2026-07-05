import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const queryLocale = request.nextUrl.searchParams.get("lang");
  const cookieLocale = request.cookies.get("rv-locale")?.value;
  const locale = queryLocale === "en" || queryLocale === "es"
    ? queryLocale
    : cookieLocale === "en"
      ? "en"
      : "es";
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set("x-rv-locale", locale);

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|robots.txt|sitemap.xml).*)"]
};
