import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import createIntlMiddleware from 'next-intl/middleware';
import { locales as configLocales, defaultLocale as configDefault } from "@/i18n/config";

// 使用 config 中的配置，因为两个文件可能不同步
const locales = configLocales;
const defaultLocale = configDefault;

const intlMiddleware = createIntlMiddleware({
  localePrefix: "as-needed",
  defaultLocale,
  locales,
  localeDetection: true
});

// 不需要登录就能访问的页面
const publicPages = ['/login'];

async function middleware(request: NextRequest) {
  // 如果是API或静态资源，直接放行
  if (request.nextUrl.pathname.startsWith('/_next') || 
      request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // 处理国际化
  const response = intlMiddleware(request);
  
  // 获取用户 token
  const token = await getToken({ req: request });
  const isAuthenticated = !!token;

  // 检查当前路径是否是公共页面
  const isPublicPage = publicPages.some(page => request.nextUrl.pathname === page);

  // 已登录用户访问登录页面，重定向到首页
  if (isAuthenticated && isPublicPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 未登录用户访问非公共页面，重定向到登录页
  if (!isAuthenticated && !isPublicPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return response;
}

export default middleware;

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
