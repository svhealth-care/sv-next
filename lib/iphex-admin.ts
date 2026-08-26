import { timingSafeEqual } from "node:crypto";

export function getIphexAdminKey() {
  return process.env.IPHEX_ADMIN_KEY?.trim() || "";
}

export function isValidIphexAdminKey(key: string | null | undefined) {
  const expected = getIphexAdminKey();
  const provided = key?.trim() || "";
  if (!expected || !provided) return false;

  const expectedBuffer = Buffer.from(expected);
  const providedBuffer = Buffer.from(provided);
  if (expectedBuffer.length !== providedBuffer.length) return false;

  return timingSafeEqual(expectedBuffer, providedBuffer);
}
