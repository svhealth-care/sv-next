import { IPHEX_EVENT } from "@/lib/iphex-event";

export type IphexAvailableSlot = (typeof IPHEX_EVENT.slots)[number] & {
  available: boolean;
};

export const IPHEX_SLOT_PLACEHOLDERS: IphexAvailableSlot[] =
  IPHEX_EVENT.slots.map((slot) => ({
    ...slot,
    available: true,
  }));

let cachedSlots: IphexAvailableSlot[] | null = null;
let inflight: Promise<IphexAvailableSlot[]> | null = null;

export function getCachedIphexSlots() {
  return cachedSlots;
}

export function invalidateIphexSlots() {
  cachedSlots = null;
  inflight = null;
}

export function prefetchIphexSlots(force = false) {
  if (!force && cachedSlots) return Promise.resolve(cachedSlots);
  if (!force && inflight) return inflight;

  inflight = fetch("/api/iphex/slots/", { cache: "no-store" })
    .then(async (response) => {
      const data = (await response.json()) as {
        slots?: IphexAvailableSlot[];
        error?: string;
      };
      if (!response.ok || !data.slots) {
        throw new Error(data.error || "Unable to load available slots.");
      }
      cachedSlots = data.slots;
      return data.slots;
    })
    .finally(() => {
      inflight = null;
    });

  return inflight;
}
