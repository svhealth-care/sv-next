import { NextResponse } from "next/server";
import {
  buildIphexBookingAdminHtml,
  buildIphexBookingAdminText,
  buildIphexBookingConfirmationHtml,
  buildIphexBookingConfirmationText,
} from "@/lib/email-templates";
import { claimIphexSlot } from "@/lib/iphex-bookings";
import { getIphexSlot, IPHEX_EVENT } from "@/lib/iphex-event";
import { isValidInternationalPhone, normalizePhone } from "@/lib/phone";
import { isValidEmail, sendSiteEmail } from "@/lib/resend-mail";
import { SITE_CONFIG } from "@/lib/site-config";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { error: "Please complete all booking details." },
      { status: 400 },
    );
  }

  const slotId = String(body.slotId ?? "").trim();
  const name = String(body.name ?? "").trim().slice(0, 100);
  const company = String(body.company ?? "").trim().slice(0, 140);
  const email = String(body.email ?? "").trim().toLowerCase().slice(0, 254);
  const phoneRaw = String(body.phone ?? "").trim();
  const slot = getIphexSlot(slotId);

  if (!slot || !name || !company || !email || !phoneRaw) {
    return NextResponse.json(
      { error: "Please complete all booking details." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (!isValidInternationalPhone(phoneRaw)) {
    return NextResponse.json(
      {
        error:
          "Please enter a valid phone number with country code (e.g. +91 9876543210).",
      },
      { status: 400 },
    );
  }

  const phone = normalizePhone(phoneRaw);
  const booking = {
    slotId,
    date: slot.dateLabel,
    time: slot.timeLabel,
    name,
    company,
    email,
    phone,
  };

  if (!claimIphexSlot(booking)) {
    return NextResponse.json(
      {
        error:
          "That slot was just booked by someone else. Please choose another time.",
      },
      { status: 409 },
    );
  }

  const emailInput = {
    name,
    company,
    email,
    phone,
    date: slot.dateLabel,
    time: slot.timeLabel,
    venue: IPHEX_EVENT.venue,
  };

  const [adminResult, attendeeResult] = await Promise.all([
    sendSiteEmail({
      subject: `iPHEX booking: ${slot.shortDateLabel}, ${slot.timeLabel}`,
      text: buildIphexBookingAdminText(emailInput),
      html: buildIphexBookingAdminHtml(emailInput),
      replyTo: email,
    }),
    sendSiteEmail({
      to: email,
      subject: `Confirmed: Your ${IPHEX_EVENT.name} meeting`,
      text: buildIphexBookingConfirmationText(emailInput),
      html: buildIphexBookingConfirmationHtml(emailInput),
      replyTo: SITE_CONFIG.contact.email,
    }),
  ]);

  if (!adminResult.ok || !attendeeResult.ok) {
    console.error("[iphex-booking] Booking saved but email delivery failed.", {
      slotId,
      adminEmailSent: adminResult.ok,
      attendeeEmailSent: attendeeResult.ok,
    });
  }

  return NextResponse.json({
    ok: true,
    booking: {
      date: slot.dateLabel,
      time: slot.timeLabel,
    },
    emailSent: adminResult.ok && attendeeResult.ok,
  });
}
