import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { parse } from 'cookie';
import { logErrorResponse } from '../../_utils/utils';
import { api } from '../../api';

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    const apiRes = await api.post(
      '/auth/logout',
      {},
      {
        headers: {
          Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
        },
      }
    );

    const setCookie = apiRes.headers['set-cookie'];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);

        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path,
          maxAge: Number(parsed['Max-Age']),
        };
        if (parsed.accessToken !== undefined)
          cookieStore.set('accessToken', parsed.accessToken, options);
        if (parsed.refreshToken !== undefined)
          cookieStore.set('refreshToken', parsed.refreshToken, options);
      }
    }

    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');

    return NextResponse.json({ message: 'Logout successful' }, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
