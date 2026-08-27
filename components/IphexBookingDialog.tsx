"use client";

import { CalendarDays, CheckCircle2, Clock3, MapPin } from "lucide-react";
import { type FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { holographicButtonClassName } from "@/components/ui/ButtonLink";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/cn";
import { getIphexSlotDays, IPHEX_EVENT } from "@/lib/iphex-event";
import {
  getCachedIphexSlots,
  invalidateIphexSlots,
  prefetchIphexSlots,
  type IphexAvailableSlot,
  IPHEX_SLOT_PLACEHOLDERS,
} from "@/lib/iphex-slots-client";

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
  const [slots, setSlots] = useState<IphexAvailableSlot[]>(
    () => getCachedIphexSlots() ?? IPHEX_SLOT_PLACEHOLDERS,
  );
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [loadingSlots, setLoadingSlots] = useState(
    () => getCachedIphexSlots() === null,
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState<{
    date: string;
    time: string;
    emailSent: boolean;
  } | null>(null);

  const days = useMemo(() => getIphexSlotDays(), []);
  const slotsForSelectedDay = useMemo(
    () => slots.filter((slot) => slot.dateKey === selectedDay),
    [selectedDay, slots],
  );

  const loadSlots = useCallback(async (force = false) => {
    if (force) invalidateIphexSlots();
    const cached = getCachedIphexSlots();
    if (cached && !force) {
      setSlots(cached);
      setLoadingSlots(false);
      setSelectedSlot((current) =>
        cached.some((slot) => slot.id === current && slot.available)
          ? current
          : "",
      );
      return;
    }

    setLoadingSlots(true);
    setError("");

    try {
      const nextSlots = await prefetchIphexSlots(force);
      setSlots(nextSlots);
      setSelectedSlot((current) =>
        nextSlots.some((slot) => slot.id === current && slot.available)
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
      setSelectedDay("");
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
        if (response.status === 409) void loadSlots(true);
        throw new Error(data.error || "Unable to complete your booking.");
      }

      invalidateIphexSlots();
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
                {IPHEX_EVENT.datesLabel}
              </p>
              <p className="flex gap-3">
                <Clock3 className="mt-0.5 shrink-0 text-brand" size={18} />
                {IPHEX_EVENT.hoursLabel}
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
                Meeting slot
              </legend>
              <div className="grid gap-3">
                <label className="text-sm font-semibold text-ink">
                  Day
                  <select
                    className={fieldClassName}
                    value={selectedDay}
                    onChange={(event) => {
                      setSelectedDay(event.target.value);
                      setSelectedSlot("");
                    }}
                    required
                  >
                    <option value="">Select a day</option>
                    {days.map((day) => (
                      <option key={day.dateKey} value={day.dateKey}>
                        {day.dateLabel}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-sm font-semibold text-ink">
                  Time
                  <select
                    className={fieldClassName}
                    value={selectedSlot}
                    onChange={(event) => setSelectedSlot(event.target.value)}
                    disabled={!selectedDay || loadingSlots}
                    required
                  >
                    <option value="">
                      {selectedDay
                        ? loadingSlots
                          ? "Checking availability…"
                          : "Select a time"
                        : "Select a day first"}
                    </option>
                    {slotsForSelectedDay.map((slot) => (
                      <option
                        key={slot.id}
                        value={slot.id}
                        disabled={!slot.available}
                      >
                        {slot.timeLabel}
                        {slot.available ? "" : " (Booked)"}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
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
