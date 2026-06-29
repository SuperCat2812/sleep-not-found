import { NextResponse } from 'next/server';
import { getEmotions } from '@/lib/emotions';

export async function GET() {
  const data = await getEmotions();
  return NextResponse.json(data);
}
