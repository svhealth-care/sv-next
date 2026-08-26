export const IPHEX_EVENT = {
  name: "iPHEX 2026",
  image: "/images/event/iphex.webp",
  venue: "Bharat Mandapam, New Delhi",
  timeZone: "Asia/Kolkata",
  slots: [
    {
      id: "2026-09-08-13",
      dateLabel: "Tuesday, 8 September 2026",
      shortDateLabel: "8 Sep",
      timeLabel: "1:00 PM – 2:00 PM",
    },
    {
      id: "2026-09-08-14",
      dateLabel: "Tuesday, 8 September 2026",
      shortDateLabel: "8 Sep",
      timeLabel: "2:00 PM – 3:00 PM",
    },
    {
      id: "2026-09-08-15",
      dateLabel: "Tuesday, 8 September 2026",
      shortDateLabel: "8 Sep",
      timeLabel: "3:00 PM – 4:00 PM",
    },
    {
      id: "2026-09-09-13",
      dateLabel: "Wednesday, 9 September 2026",
      shortDateLabel: "9 Sep",
      timeLabel: "1:00 PM – 2:00 PM",
    },
    {
      id: "2026-09-09-14",
      dateLabel: "Wednesday, 9 September 2026",
      shortDateLabel: "9 Sep",
      timeLabel: "2:00 PM – 3:00 PM",
    },
    {
      id: "2026-09-09-15",
      dateLabel: "Wednesday, 9 September 2026",
      shortDateLabel: "9 Sep",
      timeLabel: "3:00 PM – 4:00 PM",
    },
  ],
} as const;

export type IphexSlotId = (typeof IPHEX_EVENT.slots)[number]["id"];

export function getIphexSlot(slotId: string) {
  return IPHEX_EVENT.slots.find((slot) => slot.id === slotId);
}
