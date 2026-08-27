export const IPHEX_EVENT = {
  name: "iPHEX 2026",
  image: "/images/event/iphex.webp",
  venue: "Bharat Mandapam, New Delhi",
  timeZone: "Asia/Kolkata",
  datesLabel: "7–9 September 2026",
  hoursLabel: "10:00 AM–5:00 PM IST",
  slots: [
    {
      id: "2026-09-07-10",
      dateKey: "2026-09-07",
      dateLabel: "Monday, 7 September 2026",
      shortDateLabel: "7 Sep",
      timeLabel: "10:00 AM – 11:00 AM",
    },
    {
      id: "2026-09-07-11",
      dateKey: "2026-09-07",
      dateLabel: "Monday, 7 September 2026",
      shortDateLabel: "7 Sep",
      timeLabel: "11:00 AM – 12:00 PM",
    },
    {
      id: "2026-09-07-12",
      dateKey: "2026-09-07",
      dateLabel: "Monday, 7 September 2026",
      shortDateLabel: "7 Sep",
      timeLabel: "12:00 PM – 1:00 PM",
    },
    {
      id: "2026-09-07-13",
      dateKey: "2026-09-07",
      dateLabel: "Monday, 7 September 2026",
      shortDateLabel: "7 Sep",
      timeLabel: "1:00 PM – 2:00 PM",
    },
    {
      id: "2026-09-07-14",
      dateKey: "2026-09-07",
      dateLabel: "Monday, 7 September 2026",
      shortDateLabel: "7 Sep",
      timeLabel: "2:00 PM – 3:00 PM",
    },
    {
      id: "2026-09-07-15",
      dateKey: "2026-09-07",
      dateLabel: "Monday, 7 September 2026",
      shortDateLabel: "7 Sep",
      timeLabel: "3:00 PM – 4:00 PM",
    },
    {
      id: "2026-09-07-16",
      dateKey: "2026-09-07",
      dateLabel: "Monday, 7 September 2026",
      shortDateLabel: "7 Sep",
      timeLabel: "4:00 PM – 5:00 PM",
    },
    {
      id: "2026-09-08-10",
      dateKey: "2026-09-08",
      dateLabel: "Tuesday, 8 September 2026",
      shortDateLabel: "8 Sep",
      timeLabel: "10:00 AM – 11:00 AM",
    },
    {
      id: "2026-09-08-11",
      dateKey: "2026-09-08",
      dateLabel: "Tuesday, 8 September 2026",
      shortDateLabel: "8 Sep",
      timeLabel: "11:00 AM – 12:00 PM",
    },
    {
      id: "2026-09-08-12",
      dateKey: "2026-09-08",
      dateLabel: "Tuesday, 8 September 2026",
      shortDateLabel: "8 Sep",
      timeLabel: "12:00 PM – 1:00 PM",
    },
    {
      id: "2026-09-08-13",
      dateKey: "2026-09-08",
      dateLabel: "Tuesday, 8 September 2026",
      shortDateLabel: "8 Sep",
      timeLabel: "1:00 PM – 2:00 PM",
    },
    {
      id: "2026-09-08-14",
      dateKey: "2026-09-08",
      dateLabel: "Tuesday, 8 September 2026",
      shortDateLabel: "8 Sep",
      timeLabel: "2:00 PM – 3:00 PM",
    },
    {
      id: "2026-09-08-15",
      dateKey: "2026-09-08",
      dateLabel: "Tuesday, 8 September 2026",
      shortDateLabel: "8 Sep",
      timeLabel: "3:00 PM – 4:00 PM",
    },
    {
      id: "2026-09-08-16",
      dateKey: "2026-09-08",
      dateLabel: "Tuesday, 8 September 2026",
      shortDateLabel: "8 Sep",
      timeLabel: "4:00 PM – 5:00 PM",
    },
    {
      id: "2026-09-09-10",
      dateKey: "2026-09-09",
      dateLabel: "Wednesday, 9 September 2026",
      shortDateLabel: "9 Sep",
      timeLabel: "10:00 AM – 11:00 AM",
    },
    {
      id: "2026-09-09-11",
      dateKey: "2026-09-09",
      dateLabel: "Wednesday, 9 September 2026",
      shortDateLabel: "9 Sep",
      timeLabel: "11:00 AM – 12:00 PM",
    },
    {
      id: "2026-09-09-12",
      dateKey: "2026-09-09",
      dateLabel: "Wednesday, 9 September 2026",
      shortDateLabel: "9 Sep",
      timeLabel: "12:00 PM – 1:00 PM",
    },
    {
      id: "2026-09-09-14",
      dateKey: "2026-09-09",
      dateLabel: "Wednesday, 9 September 2026",
      shortDateLabel: "9 Sep",
      timeLabel: "2:00 PM – 3:00 PM",
    },
    {
      id: "2026-09-09-15",
      dateKey: "2026-09-09",
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

export function getIphexSlotDays() {
  const days: Array<{
    dateKey: string;
    dateLabel: string;
    shortDateLabel: string;
  }> = [];

  for (const slot of IPHEX_EVENT.slots) {
    if (!days.some((day) => day.dateKey === slot.dateKey)) {
      days.push({
        dateKey: slot.dateKey,
        dateLabel: slot.dateLabel,
        shortDateLabel: slot.shortDateLabel,
      });
    }
  }

  return days;
}
