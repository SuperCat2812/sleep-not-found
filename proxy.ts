import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'cookie';
import { checkServerSession } from '@/lib/api/serverApi';

const privateRoutes = ['/profile', '/journey', '/diary'];
const publicRoutes = ['/auth/login', '/auth/register'];

const attachCookiesToResponse = (
  response: NextResponse,
  setCookieHeader: string | string[]
) => {
  const cookieArray = Array.isArray(setCookieHeader)
    ? setCookieHeader
    : [setCookieHeader];

  for (const cookieStr of cookieArray) {
    const parsed = parse(cookieStr);
    const cookieName = Object.keys(parsed).find(
      key => key !== 'Path' && key !== 'Expires' && key !== 'Max-Age'
    );

    if (!cookieName) {
      continue;
    }

    const cookieValue = parsed[cookieName];
    const options = {
      path: parsed.Path || '/',
      expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
      maxAge: parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined,
      httpOnly: /HttpOnly/i.test(cookieStr),
      secure: /Secure/i.test(cookieStr),
      sameSite: parsed.SameSite as 'strict' | 'lax' | 'none' | undefined,
    };

    response.cookies.set(cookieName, cookieValue, options);
  }
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = request.cookies;
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some(route =>
    pathname.startsWith(route)
  );

  let refreshed = false;

  if (refreshToken) {
    try {
      const data = await checkServerSession();
      const setCookie = data.headers['set-cookie'];

      if (data.status === 200) {
        refreshed = true;
      }

      if (setCookie) {
        const response = isPublicRoute
          ? NextResponse.redirect(new URL('/', request.url))
          : NextResponse.next();

        attachCookiesToResponse(response, setCookie);

        if (isPublicRoute || isPrivateRoute) {
          return response;
        }
      }
    } catch (error) {
      console.log('Session refresh failed:', error);
    }
  }

  if (!accessToken && !refreshed) {
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    if (isPublicRoute) {
      return NextResponse.next();
    }
  }

  if (isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (isPrivateRoute) {
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/journey/:path*',
    '/diary/:path*',
    '/profile',
    '/auth/login',
    '/auth/register',
  ],
};
