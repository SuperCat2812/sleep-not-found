export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { isAxiosError } from 'axios';

import { api } from '@/app/api/api';
import { logErrorResponse } from '@/app/api/_utils/utils';

export async function GET() {
  try {
    const res = await api.get('/weeks/greeting/public');

    return NextResponse.json(res.data, {
      status: res.status,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
        {
          status: error.response?.status ?? 500,
        }
      );
    }

    logErrorResponse({
      message: (error as Error).message,
    });

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
