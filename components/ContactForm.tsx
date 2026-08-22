"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { FormEvent, useState } from "react";
import {
  isValidInternationalPhone,
  normalizePhone,
  PHONE_VALIDATION_MESSAGE,
} from "@/lib/phone";

type ContactFormPlaceholders = {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
};

type ContactFormProps = {
  submitLabel?: string;
  placeholders?: ContactFormPlaceholders;
};

const defaultPlaceholders: Required<ContactFormPlaceholders> = {
  name: "Enter your name",
  email: "name@company.com",
  phone: "+91 98765 43210",
  subject: "How can we help?",
  message: "Tell us about your product or market requirements",
};

export function ContactForm({
  submitLabel = "Send enquiry",
  placeholders,
}: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const copy = { ...defaultPlaceholders, ...placeholders };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setPending(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const phoneRaw = String(formData.get("phone") ?? "").trim();

    if (!isValidInternationalPhone(phoneRaw)) {
      setError(PHONE_VALIDATION_MESSAGE);
      setPending(false);
      return;
    }

    const phone = normalizePhone(phoneRaw);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(formData.get("name") ?? ""),
          email: String(formData.get("email") ?? ""),
          phone,
          subject: String(formData.get("subject") ?? ""),
          message: String(formData.get("message") ?? ""),
        }),
      });

      const data = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        throw new Error(data?.error || "Unable to send your message.");
      }

      setSubmitted(true);
      form.reset();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to send your message.",
      );
    } finally {
      setPending(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          <span>Your name</span>
          <input
            name="name"
            type="text"
            placeholder={copy.name}
            required
            disabled={pending}
          />
        </label>
        <label>
          <span>Email address</span>
          <input
            name="email"
            type="email"
            placeholder={copy.email}
            required
            disabled={pending}
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          <span>Phone number</span>
          <input
            name="phone"
            type="tel"
            placeholder={copy.phone}
            autoComplete="tel"
            inputMode="tel"
            required
            disabled={pending}
          />
        </label>
        <label>
          <span>Subject</span>
          <input
            name="subject"
            type="text"
            placeholder={copy.subject}
            required
            disabled={pending}
          />
        </label>
      </div>
      <label>
        <span>Your message</span>
        <textarea
          name="message"
          rows={5}
          placeholder={copy.message}
          required
          disabled={pending}
        />
      </label>
      <div className="form-footer">
        <button
          className="button button-primary holographic-btn"
          type="submit"
          disabled={pending}
        >
          <span className="holographic-btn__label">
            {pending ? "Sending..." : submitLabel}{" "}
            {!pending ? <ArrowRight size={18} /> : null}
          </span>
        </button>
        <p className="form-note" aria-live="polite">
          {submitted ? (
            <>
              <CheckCircle2 size={18} />
              Thank you. Your enquiry has been sent successfully.
            </>
          ) : error ? (
            <span className="form-note-error">{error}</span>
          ) : (
            "We typically respond within one business day."
          )}
        </p>
      </div>
    </form>
  );
}
