import { NextResponse } from "next/server";
import { isValidIphexAdminKey } from "@/lib/iphex-admin";
import { getIphexBookings } from "@/lib/iphex-bookings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const key = new URL(request.url).searchParams.get("key");
  if (!isValidIphexAdminKey(key)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  return new NextResponse(JSON.stringify(getIphexBookings(), null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": 'attachment; filename="iphex-bookings.json"',
      "Cache-Control": "no-store",
    },
  });
}
