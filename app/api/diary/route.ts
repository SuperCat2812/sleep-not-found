import { NextResponse } from 'next/server';
import { getDiary } from '@/lib/diary';
import { cookies } from 'next/headers';
import { api } from '@/app/api/api';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../_utils/utils';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = Number(searchParams.get('page') ?? 1);
  const limit = Number(searchParams.get('limit') ?? 10);

  const data = await getDiary({ page, limit });

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const body = await request.json();

    const res = await api.post('/diary', body, {
      headers: {
        Cookie: cookieStore.toString(),
        'Content-Type': 'application/json',
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error);
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
