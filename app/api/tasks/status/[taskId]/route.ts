import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '../../../api';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../../_utils/utils';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ taskId: string }> }
) {
  try {
    const { taskId } = await params;
    const cookieStore = await cookies();
    const body = await request.json();

    const res = await api.patch(`/tasks/status/${taskId}`, body, {
      headers: {
        Cookie: cookieStore.toString(),
        'Content-Type': 'application/json',
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
