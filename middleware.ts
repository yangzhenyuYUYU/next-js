import createMiddleware from "next-intl/middleware";
import { locales as configLocales, defaultLocale as configDefault } from "@/i18n/config";

// 使用 config 中的配置，因为两个文件可能不同步
const locales = configLocales;
const defaultLocale = configDefault;

const middleware = createMiddleware({
  localePrefix: "as-needed",
  defaultLocale,
  locales,
  localeDetection: true
});

export default middleware;

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
