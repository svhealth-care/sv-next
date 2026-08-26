import { SITE_CONFIG } from "@/lib/site-config";
import { escapeHtml } from "@/lib/resend-mail";

const colors = {
  ink: "#10243e",
  inkSoft: "#516176",
  navy: "#09213d",
  navyDeep: "#06172b",
  brand: "#2490eb",
  brandDark: "#1a78c9",
  sky: "#eaf4ff",
  surface: "#f5f8fb",
  line: "#dfe7ef",
  white: "#ffffff",
};

type EmailShellOptions = {
  eyebrow: string;
  title: string;
  intro?: string;
  bodyHtml: string;
  footerNote?: string;
};

function emailShell({
  eyebrow,
  title,
  intro,
  bodyHtml,
  footerNote,
}: EmailShellOptions) {
  const siteUrl = SITE_CONFIG.url;

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;padding:0;background:${colors.surface};font-family:Arial,Helvetica,sans-serif;color:${colors.ink};">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${colors.surface};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:${colors.white};border:1px solid ${colors.line};border-radius:24px;overflow:hidden;box-shadow:0 22px 70px rgba(15,41,68,0.12);">
            <tr>
              <td style="padding:28px 32px;background:linear-gradient(135deg, ${colors.navyDeep} 0%, ${colors.navy} 100%);color:${colors.white};">
                <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.72);">
                  ${escapeHtml(eyebrow)}
                </p>
                <h1 style="margin:0;font-size:28px;line-height:1.2;letter-spacing:-0.03em;font-weight:800;">
                  ${escapeHtml(SITE_CONFIG.name)}
                </h1>
                <p style="margin:10px 0 0;font-size:16px;line-height:1.5;color:rgba(255,255,255,0.88);">
                  ${escapeHtml(title)}
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                ${
                  intro
                    ? `<p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:${colors.inkSoft};">${escapeHtml(intro)}</p>`
                    : ""
                }
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px 28px;border-top:1px solid ${colors.line};background:${colors.surface};">
                <p style="margin:0 0 8px;font-size:12px;line-height:1.6;color:${colors.inkSoft};">
                  ${escapeHtml(footerNote ?? "This notification was sent from the S V Healthcare website.")}
                </p>
                <p style="margin:0;font-size:12px;line-height:1.6;">
                  <a href="${siteUrl}" style="color:${colors.brand};text-decoration:none;font-weight:700;">${escapeHtml(siteUrl.replace(/^https?:\/\//, ""))}</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function detailRow(
  label: string,
  value: string,
  href?: string,
  options?: { prominent?: boolean; noBorder?: boolean },
) {
  const safeValue = escapeHtml(value);
  const valueSize = options?.prominent ? "18px" : "15px";
  const valueWeight = options?.prominent ? "800" : "700";
  const valueHtml = href
    ? `<a href="${href}" style="color:${colors.brand};text-decoration:none;font-weight:${valueWeight};">${safeValue}</a>`
    : `<span style="color:${colors.ink};font-weight:${valueWeight};">${safeValue}</span>`;
  const padding = options?.prominent ? "22px 24px" : "16px 24px";
  const border = options?.noBorder ? "" : `border-bottom:1px solid ${colors.line};`;

  return `
    <tr>
      <td style="padding:${padding};${border}">
        <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${colors.inkSoft};">
          ${escapeHtml(label)}
        </p>
        <p style="margin:0;font-size:${valueSize};line-height:1.6;word-break:break-word;">
          ${valueHtml}
        </p>
      </td>
    </tr>
  `;
}

function infoCard(contentHtml: string) {
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${colors.surface};border:1px solid ${colors.line};border-radius:18px;overflow:hidden;">
      ${contentHtml}
    </table>
  `;
}

export function buildContactEmailHtml(input: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  const submittedAt = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date());

  const bodyHtml = `
    ${infoCard(`
      ${detailRow("Name", input.name)}
      ${detailRow("Email", input.email, `mailto:${input.email}`)}
      ${detailRow("Phone", input.phone, `tel:${input.phone.replace(/\s+/g, "")}`)}
      ${detailRow("Subject", input.subject)}
      <tr>
        <td style="padding:18px 24px 22px;">
          <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${colors.inkSoft};">
            Message
          </p>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
            <tr>
              <td style="padding:16px 18px;background:${colors.white};border:1px solid ${colors.line};border-radius:14px;font-size:15px;line-height:1.7;color:${colors.ink};white-space:pre-wrap;word-break:break-word;">
                ${escapeHtml(input.message)}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `)}
    <p style="margin:20px 0 0;font-size:13px;line-height:1.6;color:${colors.inkSoft};">
      Received on <strong style="color:${colors.ink};">${escapeHtml(submittedAt)}</strong>. Reply directly to this email to respond to the sender.
    </p>
  `;

  return emailShell({
    eyebrow: "Website enquiry",
    title: "New contact form submission",
    intro:
      "A visitor submitted the contact form on your website. Review the enquiry details below.",
    bodyHtml,
    footerNote: "Reply to this email to contact the sender directly.",
  });
}

export function buildContactEmailText(input: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  return [
    "New enquiry from the S V Healthcare website",
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone}`,
    `Subject: ${input.subject}`,
    "",
    "Message:",
    input.message,
  ].join("\n");
}

export function buildNewsletterEmailHtml(input: { email: string }) {
  const submittedAt = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date());

  const bodyHtml = `
    ${infoCard(`
      ${detailRow("Subscriber email", input.email, `mailto:${input.email}`, { prominent: true })}
      ${detailRow("Source", "Footer newsletter form")}
      ${detailRow("Submitted", submittedAt, undefined, { noBorder: true })}
    `)}
    <p style="margin:20px 0 0;font-size:13px;line-height:1.6;color:${colors.inkSoft};">
      Add this contact to your newsletter list when you are ready to send healthcare and export updates.
    </p>
  `;

  return emailShell({
    eyebrow: "Stay informed",
    title: "New newsletter subscription",
    intro:
      "Someone joined your mailing list from the website footer. Save this email for future updates and campaigns.",
    bodyHtml,
    footerNote: "Newsletter signup notification from the S V Healthcare website.",
  });
}

export function buildNewsletterEmailText(input: { email: string }) {
  return [
    "New newsletter signup from the S V Healthcare website",
    "",
    `Email: ${input.email}`,
    "Source: Footer newsletter form",
  ].join("\n");
}

type IphexBookingEmailInput = {
  name: string;
  company: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  venue: string;
};

function iphexBookingCard(input: IphexBookingEmailInput) {
  return infoCard(`
    ${detailRow("Date", input.date, undefined, { prominent: true })}
    ${detailRow("Time", `${input.time} (IST)`)}
    ${detailRow("Venue", input.venue)}
    ${detailRow("Attendee", input.name)}
    ${detailRow("Company", input.company)}
    ${detailRow("Email", input.email, `mailto:${input.email}`)}
    ${detailRow("Phone", input.phone, `tel:${input.phone.replace(/\s+/g, "")}`, { noBorder: true })}
  `);
}

export function buildIphexBookingAdminHtml(input: IphexBookingEmailInput) {
  return emailShell({
    eyebrow: "iPHEX 2026 meeting",
    title: "A new meeting slot has been booked",
    intro:
      "A visitor reserved an iPHEX meeting slot. The confirmed appointment and attendee details are below.",
    bodyHtml: iphexBookingCard(input),
    footerNote: "Reply to this email to contact the attendee directly.",
  });
}

export function buildIphexBookingAdminText(input: IphexBookingEmailInput) {
  return [
    "New iPHEX 2026 meeting booking",
    "",
    `Date: ${input.date}`,
    `Time: ${input.time} (IST)`,
    `Venue: ${input.venue}`,
    `Attendee: ${input.name}`,
    `Company: ${input.company}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone}`,
  ].join("\n");
}

export function buildIphexBookingConfirmationHtml(
  input: IphexBookingEmailInput,
) {
  return emailShell({
    eyebrow: "Booking confirmed",
    title: "Your iPHEX 2026 meeting is confirmed",
    intro: `Hello ${input.name}, thank you for scheduling time with S V Healthcare. We look forward to meeting you in New Delhi.`,
    bodyHtml: iphexBookingCard(input),
    footerNote:
      "Need to make a change? Reply to this email and our team will assist you.",
  });
}

export function buildIphexBookingConfirmationText(
  input: IphexBookingEmailInput,
) {
  return [
    `Hello ${input.name},`,
    "",
    "Your meeting with S V Healthcare at iPHEX 2026 is confirmed.",
    "",
    `Date: ${input.date}`,
    `Time: ${input.time} (IST)`,
    `Venue: ${input.venue}`,
    `Company: ${input.company}`,
    "",
    "Need to make a change? Reply to this email and our team will assist you.",
  ].join("\n");
}
