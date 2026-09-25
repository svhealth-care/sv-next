"use client";

import Image from "next/image";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AppLink } from "@/components/ui/AppLink";
import type { SiteEvent } from "@/lib/events";

type EventCardGridProps = {
  events: SiteEvent[];
};

let nextDelay = 0;
let resetTimer: ReturnType<typeof setTimeout> | null = null;
const DELAY_STEP = 0.14;
const RESET_MS = 450;

function takeSequentialDelay() {
  if (resetTimer) clearTimeout(resetTimer);
  const delay = nextDelay;
  nextDelay += DELAY_STEP;
  resetTimer = setTimeout(() => {
    nextDelay = 0;
    resetTimer = null;
  }, RESET_MS);
  return delay;
}

export function EventCardGrid({ events }: EventCardGridProps) {
  if (events.length === 0) {
    return (
      <div className="rounded-[var(--radius)] border border-line bg-white px-6 py-14 text-center">
        <p className="m-0 text-ink-soft">
          More moments from this category are on the way. Check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {events.map((event) => (
        <EventCardReveal key={event.id}>
          <EventListingCard event={event} />
        </EventCardReveal>
      ))}
    </div>
  );
}

function EventCardReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.28 });
  const reduce = useReducedMotion();
  const [delay, setDelay] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!inView || ready) return;
    setDelay(reduce ? 0 : takeSequentialDelay());
    setReady(true);
  }, [inView, ready, reduce]);

  return (
    <motion.div
      ref={ref}
      className="h-full"
      initial={reduce ? false : { opacity: 0, y: 44, scale: 0.98 }}
      animate={
        ready
          ? { opacity: 1, y: 0, scale: 1 }
          : reduce
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 44, scale: 0.98 }
      }
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function EventListingCard({ event }: { event: SiteEvent }) {
  return (
    <AppLink
      href={`/events/${event.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white text-inherit no-underline transition duration-200 hover:-translate-y-1 hover:border-brand hover:shadow-[0_14px_34px_rgba(15,41,68,0.1)] focus-visible:border-brand focus-visible:outline-none focus-visible:shadow-[0_14px_34px_rgba(15,41,68,0.1)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <span className="relative block min-h-[240px] overflow-hidden border-b border-line bg-surface">
        <Image
          src={event.coverImage}
          alt={event.coverImageAlt}
          fill
          sizes="(max-width: 760px) 92vw, (max-width: 1100px) 45vw, 31vw"
          className="object-cover transition duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <span className="absolute left-4 top-4 rounded-full bg-navy/80 px-3 py-1.5 text-[11px] font-bold tracking-[0.03em] text-white backdrop-blur-md">
          {event.categoryLabel}
        </span>
        <span className="absolute bottom-4 left-4 rounded-full bg-navy/80 px-3 py-1.5 text-[11px] font-bold tracking-[0.03em] text-white backdrop-blur-md">
          {event.date}
        </span>
      </span>
      <span className="flex flex-1 flex-col gap-3 p-[22px]">
        <span className="font-display text-xl font-extrabold leading-snug tracking-[-0.025em] text-ink transition group-hover:text-navy">
          {event.title}
        </span>
        <span className="line-clamp-3 flex-1 text-sm leading-relaxed text-ink-soft">
          {event.excerpt}
        </span>
        <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-[#8390a0]">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays size={13} aria-hidden="true" />
            {event.date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={13} aria-hidden="true" />
            {event.location}
          </span>
        </span>
        <span className="mt-auto inline-flex min-h-9 w-full items-center justify-center gap-1.5 rounded-[10px] border border-line text-xs font-extrabold text-ink transition group-hover:-translate-y-0.5 group-hover:border-brand group-hover:text-brand">
          View gallery
          <ArrowRight size={14} />
        </span>
      </span>
    </AppLink>
  );
}
