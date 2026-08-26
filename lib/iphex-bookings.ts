import "server-only";

import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";

export type IphexBooking = {
  slotId: string;
  date: string;
  time: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  createdAt: string;
};

function getBookingsFilePath() {
  const configuredPath = process.env.IPHEX_BOOKINGS_PATH?.trim();
  return configuredPath
    ? path.resolve(configuredPath)
    : path.join(process.cwd(), "data", "iphex-bookings.json");
}

function readBookings(): IphexBooking[] {
  const filePath = getBookingsFilePath();
  if (!existsSync(filePath)) return [];

  try {
    const parsed = JSON.parse(readFileSync(filePath, "utf8")) as unknown;
    return Array.isArray(parsed) ? (parsed as IphexBooking[]) : [];
  } catch {
    return [];
  }
}

function writeBookings(bookings: IphexBooking[]) {
  const filePath = getBookingsFilePath();
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, `${JSON.stringify(bookings, null, 2)}\n`, "utf8");
}

export function getIphexBookingsFilePath() {
  return getBookingsFilePath();
}

export function getIphexBookings() {
  return readBookings().sort((left, right) =>
    left.createdAt.localeCompare(right.createdAt),
  );
}

export function getBookedIphexSlotIds() {
  return readBookings().map((booking) => booking.slotId);
}

export function claimIphexSlot(
  booking: Omit<IphexBooking, "createdAt">,
) {
  const bookings = readBookings();
  if (bookings.some((entry) => entry.slotId === booking.slotId)) {
    return false;
  }

  bookings.push({
    ...booking,
    createdAt: new Date().toISOString(),
  });
  writeBookings(bookings);
  return true;
}
