/** Strip spaces, dashes, and brackets; keep a leading + and digits only. */
export function normalizePhone(value: string): string {
  const compact = value.trim().replace(/[\s\-().]/g, "");

  if (!compact.startsWith("+")) {
    return compact.replace(/\D/g, "");
  }

  return `+${compact.slice(1).replace(/\D/g, "")}`;
}

/** E.164: + followed by 8–15 digits; country code cannot start with 0. */
export function isValidInternationalPhone(value: string): boolean {
  const normalized = normalizePhone(value);
  return /^\+[1-9]\d{7,14}$/.test(normalized);
}

export const PHONE_VALIDATION_MESSAGE =
  "Please enter a valid phone number with country code (e.g. +91 9876543210).";
