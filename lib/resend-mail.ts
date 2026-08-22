import { SITE_CONFIG } from "@/lib/site-config";

type SendMailInput = {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

type SendMailResult =
  | { ok: true; id?: string }
  | { ok: false; message: string; status?: number };

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getMailConfig() {
  return {
    apiKey: process.env.RESEND_API_KEY?.trim() || "",
    toEmail:
      process.env.CONTACT_TO_EMAIL?.trim() || SITE_CONFIG.contact.email,
    fromEmail:
      process.env.CONTACT_FROM_EMAIL?.trim() || SITE_CONFIG.contact.email,
  };
}

async function sendWithResend(
  input: SendMailInput,
  apiKey: string,
  toEmail: string,
  fromEmail: string,
): Promise<SendMailResult> {
  const payload = {
    from: `S V Healthcare <${fromEmail}>`,
    to: [toEmail],
    subject: input.subject,
    text: input.text,
    html: input.html,
    ...(input.replyTo ? { reply_to: input.replyTo } : {}),
  };

  let lastMessage = "Unable to send email right now.";
  let lastStatus = 502;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => null)) as {
        id?: string;
        message?: string;
        name?: string;
      } | null;

      if (response.ok) {
        return { ok: true, id: data?.id };
      }

      lastStatus = response.status >= 400 ? response.status : 502;
      lastMessage =
        data?.message || "Unable to send email right now. Please try again.";

      if (response.status >= 500 || response.status === 429) {
        await sleep(250 * attempt);
        continue;
      }

      return { ok: false, message: lastMessage, status: lastStatus };
    } catch (error) {
      lastMessage =
        error instanceof Error
          ? error.message
          : "Unable to reach the email service.";
      lastStatus = 502;
      await sleep(250 * attempt);
    }
  }

  return { ok: false, message: lastMessage, status: lastStatus };
}

async function sendWithFormSubmit(
  input: SendMailInput,
  toEmail: string,
): Promise<SendMailResult> {
  try {
    const response = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(toEmail)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: input.subject,
          _template: "table",
          _captcha: "false",
          ...(input.replyTo ? { _replyto: input.replyTo, email: input.replyTo } : {}),
          message: input.text,
        }),
      },
    );

    const data = (await response.json().catch(() => null)) as {
      success?: string | boolean;
      message?: string;
    } | null;

    const success =
      data?.success === true ||
      data?.success === "true" ||
      response.ok;

    if (!success) {
      return {
        ok: false,
        message: data?.message || "Unable to send email right now.",
        status: 502,
      };
    }

    return { ok: true, id: "formsubmit" };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to reach the email service.",
      status: 502,
    };
  }
}

export async function sendSiteEmail(
  input: SendMailInput,
): Promise<SendMailResult> {
  const { apiKey, toEmail, fromEmail } = getMailConfig();

  if (!isValidEmail(toEmail) || !isValidEmail(fromEmail)) {
    return {
      ok: false,
      message: "Email service is not configured.",
      status: 500,
    };
  }

  if (apiKey) {
    return sendWithResend(input, apiKey, toEmail, fromEmail);
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[email:dev] RESEND_API_KEY missing — using FormSubmit fallback.", {
      to: toEmail,
      subject: input.subject,
      replyTo: input.replyTo,
    });
  }

  return sendWithFormSubmit(input, toEmail);
}

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
