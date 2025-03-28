import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";
import { NextRequest } from "next/server";

const locales = ["en", "zh"];
const defaultLocale = "en";
const cookieName = "i18nlang";

// Get the preferred locale
function getLocale(request: NextRequest): string {
  if (request.cookies.has(cookieName))
    return request.cookies.get(cookieName)!.value;
  const acceptLang = request.headers.get("Accept-Language");
  if (!acceptLang) return defaultLocale;
  const headers = { "accept-language": acceptLang };
  const languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
}

const middleware = createMiddleware({
  ...routing,
  localePrefix: "always",
  defaultLocale,
  locales,
  localeDetection: (request) => {
    return getLocale(request);
  }
});

export default middleware;

export const config = {
  matcher: [
    "/",
    "/(en|en-US|zh|zh-CN|zh-TW|zh-HK|zh-MO|ja|ko|ru|fr|de|ar|es|it)/:path*",
    "/((?!privacy-policy|terms-of-service|api/|_next|_vercel|.*\\..*).*)",
  ],
};
