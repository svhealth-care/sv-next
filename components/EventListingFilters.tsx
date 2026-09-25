"use client";

import { useMemo, useState } from "react";
import { EventCardGrid } from "@/components/EventCardGrid";
import { cn } from "@/lib/cn";
import {
  EVENT_CATEGORIES,
  type EventCategoryId,
  type SiteEvent,
} from "@/lib/events";

type EventListingFiltersProps = {
  events: SiteEvent[];
};

type FilterId = "all" | EventCategoryId;

export function EventListingFilters({ events }: EventListingFiltersProps) {
  const [active, setActive] = useState<FilterId>("all");

  const filtered = useMemo(() => {
    if (active === "all") return events;
    return events.filter((event) => event.category === active);
  }, [active, events]);

  const filters: Array<{ id: FilterId; label: string; count: number }> = [
    { id: "all", label: "All", count: events.length },
    ...EVENT_CATEGORIES.map((category) => ({
      id: category.id as FilterId,
      label: category.label,
      count: events.filter((event) => event.category === category.id).length,
    })),
  ];

  return (
    <div>
      <div
        className="mb-8 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter events by type"
      >
        {filters.map((filter) => {
          const selected = active === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(filter.id)}
              className={cn(
                "inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                selected
                  ? "border-brand bg-brand !text-white"
                  : "border-line bg-white text-ink hover:border-brand hover:text-brand",
              )}
            >
              {filter.label}
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[11px] font-extrabold",
                  selected
                    ? "bg-white/20 !text-white"
                    : "bg-surface text-ink-soft",
                )}
              >
                {filter.count}
              </span>
            </button>
          );
        })}
      </div>

      <EventCardGrid events={filtered} />
    </div>
  );
}
