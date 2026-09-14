import { NextResponse } from "next/server";
import { getBookedIphexSlotIds } from "@/lib/iphex-bookings";
import { IPHEX_EVENT, isIphexEventEnabled } from "@/lib/iphex-event";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  if (!isIphexEventEnabled()) {
    return NextResponse.json(
      { error: "This event booking is currently closed." },
      { status: 410 },
    );
  }

  const bookedSlots = new Set(getBookedIphexSlotIds());

  return NextResponse.json(
    {
      slots: IPHEX_EVENT.slots.map((slot) => ({
        ...slot,
        available: !bookedSlots.has(slot.id),
      })),
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
