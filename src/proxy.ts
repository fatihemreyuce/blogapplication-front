import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["tr", "en"] as const;
const defaultLocale = "tr";

function getLocale(request: NextRequest): string {
  const acceptLang = request.headers.get("accept-language") ?? "";

  // "tr-TR,tr;q=0.9,en;q=0.8" gibi değerden ilk eşleşeni bul
  const preferred = acceptLang
    .split(",")
    .map((part) => part.split(";")[0].trim().slice(0, 2).toLowerCase())
    .find((lang) => locales.includes(lang as (typeof locales)[number]));

  return preferred ?? defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Pathname'de zaten locale var mı? (örn. /tr/blog, /en)
  const hasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (hasLocale) return;

  // Locale yok — tespit edip yönlendir
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // _next, api, static dosyaları ve favicon hariç her şey
    "/((?!_next/static|_next/image|api|favicon.ico|.*\\..*).*)",
  ],
};
