"use client";

import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

export function NewsletterForm() {
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitted(false);
    setPending(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "").trim();

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        throw new Error(data?.error || "Unable to subscribe right now.");
      }

      if (!mountedRef.current) return;

      setSubmitted(true);
      form.reset();
    } catch (submitError) {
      if (!mountedRef.current) return;

      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to subscribe right now.",
      );
    } finally {
      if (mountedRef.current) {
        setPending(false);
      }
    }
  };

  return (
    <div className="newsletter-wrap">
      <form
        className="newsletter-form"
        onSubmit={handleSubmit}
        aria-busy={pending}
      >
        <label className="sr-only" htmlFor="newsletter-email">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          placeholder="Email address"
          required
          disabled={pending}
          onChange={() => {
            if (submitted) setSubmitted(false);
            if (error) setError(null);
          }}
        />
        <button
          type="submit"
          aria-label={pending ? "Subscribing" : "Join newsletter"}
          disabled={pending}
          data-pending={pending ? "true" : undefined}
        >
          {pending ? (
            <LoaderCircle className="newsletter-spinner" aria-hidden="true" />
          ) : submitted ? (
            <CheckCircle2 aria-hidden="true" />
          ) : (
            <ArrowRight aria-hidden="true" />
          )}
        </button>
      </form>
      <p className="newsletter-note" aria-live="polite">
        {submitted ? (
          <>
            <CheckCircle2 size={14} />
            Thanks — you&apos;re subscribed.
          </>
        ) : error ? (
          <span className="newsletter-note-error">{error}</span>
        ) : null}
      </p>
    </div>
  );
}
