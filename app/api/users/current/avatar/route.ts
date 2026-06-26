import { NextResponse } from "next/server";

export async function PATCH() {
  return NextResponse.json(
    { message: "Avatar upload route is not implemented yet" },
    { status: 501 },
  );
}