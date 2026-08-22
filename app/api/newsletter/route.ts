import { NextResponse } from "next/server";
import {
  buildNewsletterEmailHtml,
  buildNewsletterEmailText,
} from "@/lib/email-templates";
import { isValidEmail, sendSiteEmail } from "@/lib/resend-mail";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const email = String(body.email ?? "").trim();

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const result = await sendSiteEmail({
    subject: "New newsletter subscription",
    text: buildNewsletterEmailText({ email }),
    html: buildNewsletterEmailHtml({ email }),
    replyTo: email,
  });

  if (!result.ok) {
    return NextResponse.json(
      {
        error:
          result.message ||
          "Unable to subscribe right now. Please try again.",
      },
      { status: result.status && result.status >= 400 ? result.status : 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
