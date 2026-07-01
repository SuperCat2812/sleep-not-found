import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'cookie';
import { refreshServerSession } from '@/lib/api/serverApi';

const privateRoutes = ['/profile', '/journey', '/diary'];
const publicRoutes = ['/auth/login', '/auth/register'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (!accessToken && refreshToken) {
    try {
      const data = await refreshServerSession(
        request.headers.get('cookie') ?? ''
      );

      const setCookie = data?.headers['set-cookie'];

      if (data?.status === 200 && setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

        const response = isPublicRoute
          ? NextResponse.redirect(new URL('/', request.url))
          : NextResponse.next();

        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);

          const options = {
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            path: parsed.Path || '/',
            maxAge: parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined,
          };

          if (parsed.accessToken) {
            response.cookies.set('accessToken', parsed.accessToken, options);
          }

          if (parsed.refreshToken) {
            response.cookies.set('refreshToken', parsed.refreshToken, options);
          }
        }

        return response;
      }
    } catch (error) {
      console.log('Session refresh failed:', error);
    }
  }

  if (!accessToken && !refreshToken) {
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    return NextResponse.next();
  }

  if (isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/journey/:path*',
    '/diary/:path*',
    '/profile',
    '/auth/login',
    '/auth/register',
  ],
};
