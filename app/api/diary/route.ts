import { NextResponse } from "next/server";
import { getDiary } from "@/lib/diary";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 10);

  const data = await getDiary({ page, limit });

  return NextResponse.json(data);
}
