"use client";

import { CalendarDays, CheckCircle2, Clock3, MapPin } from "lucide-react";
import { type FormEvent, useCallback, useEffect, useState } from "react";
import { holographicButtonClassName } from "@/components/ui/ButtonLink";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/cn";
import { IPHEX_EVENT } from "@/lib/iphex-event";

type AvailableSlot = (typeof IPHEX_EVENT.slots)[number] & {
  available: boolean;
};

type IphexBookingDialogProps = {
  open: boolean;
  onClose: () => void;
};

const fieldClassName =
  "mt-1.5 h-[50px] w-full rounded-[10px] border border-line bg-[#fafcfe] px-[15px] text-sm text-ink outline-none transition placeholder:text-ink/45 focus:border-brand focus-visible:outline-none focus-visible:outline-offset-0";

export function IphexBookingDialog({
  open,
  onClose,
}: IphexBookingDialogProps) {
  const [slots, setSlots] = useState<AvailableSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState<{
    date: string;
    time: string;
    emailSent: boolean;
  } | null>(null);

  const loadSlots = useCallback(async () => {
    setLoadingSlots(true);
    setError("");

    try {
      const response = await fetch("/api/iphex/slots/", { cache: "no-store" });
      const data = (await response.json()) as {
        slots?: AvailableSlot[];
        error?: string;
      };
      if (!response.ok || !data.slots) {
        throw new Error(data.error || "Unable to load available slots.");
      }
      setSlots(data.slots);
      setSelectedSlot((current) =>
        data.slots?.some((slot) => slot.id === current && slot.available)
          ? current
          : "",
      );
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to load available slots.",
      );
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    queueMicrotask(() => {
      setConfirmation(null);
      setSelectedSlot("");
      void loadSlots();
    });
  }, [loadSlots, open]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedSlot) {
      setError("Please choose an available meeting slot.");
      return;
    }

    setSubmitting(true);
    setError("");
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/iphex/book/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slotId: selectedSlot,
          name: form.get("name"),
          company: form.get("company"),
          email: form.get("email"),
          phone: form.get("phone"),
        }),
      });
      const data = (await response.json()) as {
        error?: string;
        booking?: { date: string; time: string };
        emailSent?: boolean;
      };

      if (!response.ok || !data.booking) {
        if (response.status === 409) void loadSlots();
        throw new Error(data.error || "Unable to complete your booking.");
      }

      setConfirmation({
        ...data.booking,
        emailSent: data.emailSent !== false,
      });
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to complete your booking.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Book an iPHEX meeting"
      className="max-w-3xl"
    >
      {confirmation ? (
        <div className="px-6 py-14 text-center sm:px-12">
          <CheckCircle2
            className="mx-auto mb-5 text-brand"
            size={54}
            aria-hidden="true"
          />
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-brand">
            Booking confirmed
          </p>
          <h3 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
            We look forward to meeting you
          </h3>
          <div className="mx-auto mt-6 max-w-md rounded-2xl border border-line bg-surface p-5 text-left">
            <p className="font-bold text-ink">{confirmation.date}</p>
            <p className="mt-1 text-ink/70">{confirmation.time} (IST)</p>
            <p className="mt-1 text-ink/70">{IPHEX_EVENT.venue}</p>
          </div>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-ink/65">
            {confirmation.emailSent
              ? "Booking details have been emailed to you."
              : "Your slot is reserved. If the confirmation email is delayed, our team will contact you directly."}
          </p>
          <button
            type="button"
            onClick={onClose}
            className={cn("mt-7", holographicButtonClassName)}
          >
            <span className="holographic-btn__label">Done</span>
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-[0.82fr_1.18fr]">
          <div className="bg-ink px-6 py-9 text-white sm:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/65">
              Meet S V Healthcare
            </p>
            <h3 className="mt-3 font-display text-3xl font-extrabold">
              {IPHEX_EVENT.name}
            </h3>
            <p className="mt-4 text-sm leading-6 text-white/70">
              Reserve a focused one-hour meeting with our team during the
              exhibition.
            </p>
            <div className="mt-8 space-y-4 text-sm">
              <p className="flex gap-3">
                <CalendarDays className="mt-0.5 shrink-0 text-brand" size={18} />
                8–9 September 2026
              </p>
              <p className="flex gap-3">
                <Clock3 className="mt-0.5 shrink-0 text-brand" size={18} />
                1:00 PM–4:00 PM IST
              </p>
              <p className="flex gap-3">
                <MapPin className="mt-0.5 shrink-0 text-brand" size={18} />
                {IPHEX_EVENT.venue}
              </p>
            </div>
          </div>

          <form className="px-6 py-8 sm:px-8" onSubmit={handleSubmit}>
            <h3 className="font-display text-2xl font-extrabold text-ink">
              Choose your meeting time
            </h3>
            <p className="mt-2 text-sm text-ink/60">
              Bookings are confirmed instantly and each slot can be reserved
              only once.
            </p>

            <fieldset className="mt-6" disabled={loadingSlots || submitting}>
              <legend className="mb-3 text-sm font-bold text-ink">
                Available slots
              </legend>
              {loadingSlots ? (
                <p className="rounded-xl border border-line bg-surface p-4 text-sm text-ink/60">
                  Checking availability…
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {slots.map((slot) => (
                    <label
                      key={slot.id}
                      className={`rounded-xl border p-3 text-sm transition ${
                        slot.available
                          ? selectedSlot === slot.id
                            ? "cursor-pointer border-brand bg-brand/10 text-ink ring-1 ring-brand"
                            : "cursor-pointer border-line hover:border-brand/50"
                          : "cursor-not-allowed border-line bg-surface text-ink/35 line-through"
                      }`}
                    >
                      <input
                        type="radio"
                        name="slot"
                        value={slot.id}
                        checked={selectedSlot === slot.id}
                        disabled={!slot.available}
                        onChange={() => setSelectedSlot(slot.id)}
                        className="sr-only"
                      />
                      <span className="block font-bold">
                        {slot.shortDateLabel}
                      </span>
                      <span className="mt-0.5 block text-xs">
                        {slot.timeLabel}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </fieldset>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <label className="text-sm font-semibold text-ink">
                Name
                <input
                  className={fieldClassName}
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter Your Name"
                  required
                  maxLength={100}
                />
              </label>
              <label className="text-sm font-semibold text-ink">
                Company
                <input
                  className={fieldClassName}
                  name="company"
                  type="text"
                  autoComplete="organization"
                  placeholder="Enter Your Company"
                  required
                  maxLength={140}
                />
              </label>
              <label className="text-sm font-semibold text-ink">
                Email
                <input
                  className={fieldClassName}
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter Your Email"
                  required
                  maxLength={254}
                />
              </label>
              <label className="text-sm font-semibold text-ink">
                Phone with country code
                <input
                  className={fieldClassName}
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+91 98765 43210"
                  required
                />
              </label>
            </div>

            {error && (
              <p
                className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                role="alert"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting || loadingSlots || !selectedSlot}
              className={cn(
                "mt-5 w-full disabled:cursor-not-allowed disabled:opacity-50",
                holographicButtonClassName,
              )}
            >
              <span className="holographic-btn__label">
                {submitting ? "Confirming your slot…" : "Confirm booking"}
              </span>
            </button>
          </form>
        </div>
      )}
    </Modal>
  );
}
