import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const handleI18nRouting = createMiddleware(routing);
const SESSION_COOKIE_NAME = 'deepak_admin_session';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.includes('/admin');
  const isLoginPage = pathname.includes('/admin/login');

  // 1. Guard protected admin routes: redirect to login if session cookie is missing
  if (isAdminRoute && !isLoginPage) {
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionCookie) {
      const segments = pathname.split('/').filter(Boolean);
      const locale = routing.locales.includes(segments[0] as (typeof routing.locales)[number])
        ? segments[0]
        : routing.defaultLocale;

      const loginUrl = new URL(`/${locale}/admin/login`, request.url);
      loginUrl.searchParams.set('next', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. If user already has a session and visits /admin/login, redirect to /admin overview
  if (isLoginPage) {
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (sessionCookie) {
      const segments = pathname.split('/').filter(Boolean);
      const locale = routing.locales.includes(segments[0] as (typeof routing.locales)[number])
        ? segments[0]
        : routing.defaultLocale;
      return NextResponse.redirect(new URL(`/${locale}/admin`, request.url));
    }
  }

  return handleI18nRouting(request);
}

export default proxy;

export const config = {
  // Match only internationalized pathnames, ignore static files, api, _next
  matcher: ['/', '/(en|or)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
