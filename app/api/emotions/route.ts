import { getEmotions } from '@/lib/api/serverApi';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page') ?? 1);
  const limit = Number(searchParams.get('limit') ?? 20);

  try {
    const data = await getEmotions({ page, limit });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Emotions route error:', error);
    return NextResponse.json(
      {
        emotions: [],
        totalCount: 0,
        totalPages: 1,
        page,
        limit,
      },
      { status: 500 }
    );
  }
}
