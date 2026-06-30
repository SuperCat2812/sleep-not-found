import { NextResponse } from 'next/server';
import { getEmotions } from '@/lib/emotions';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page') ?? 1);
  const limit = Number(searchParams.get('limit') ?? 20);

  const data = await getEmotions({ page, limit });
  return NextResponse.json(data);
}
