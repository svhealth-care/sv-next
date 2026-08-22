import { NextResponse } from "next/server";
import {
  buildContactEmailHtml,
  buildContactEmailText,
} from "@/lib/email-templates";
import { isValidInternationalPhone, normalizePhone } from "@/lib/phone";
import { isValidEmail, sendSiteEmail } from "@/lib/resend-mail";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 400 },
    );
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phoneRaw = String(body.phone ?? "").trim();
  const subject = String(body.subject ?? "").trim().slice(0, 120);
  const message = String(body.message ?? "").trim();

  if (!name || !email || !phoneRaw || !subject || !message) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
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
  const result = await sendSiteEmail({
    subject: `Website enquiry: ${subject}`,
    text: buildContactEmailText({
      name,
      email,
      phone,
      subject,
      message,
    }),
    html: buildContactEmailHtml({
      name,
      email,
      phone,
      subject,
      message,
    }),
    replyTo: email,
  });

  if (!result.ok) {
    return NextResponse.json(
      {
        error:
          result.message ||
          "Unable to send your message right now. Please try again.",
      },
      { status: result.status && result.status >= 400 ? result.status : 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
