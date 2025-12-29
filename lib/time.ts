// lib/time.ts
import { formatInTimeZone, fromZonedTime, toZonedTime } from "date-fns-tz";
import { isValid, parse } from "date-fns";

/**
 * Timezone policy:
 * - All timestamps stored in DB are UTC instants (Date / ISO with Z).
 * - All user/admin display + business "clock rules" use the restaurant timezone.
 */
export const RESTAURANT_TZ = "Asia/Dubai" as const;
export const SLOT_MINUTES = 15;

const DEFAULT_FMT = "EEE, dd MMM yyyy • HH:mm";

/** Normalize input into a Date (UTC instant). */
export function asUtcDate(input: Date | string): Date {
  const d = typeof input === "string" ? new Date(input) : input;
  if (!isValid(d)) throw new Error(`Invalid date input: ${String(input)}`);
  return d;
}

/**
 * Format a UTC instant for display in Dubai timezone.
 * Use this in UI instead of date.toLocaleString() / manual formatting.
 */
export function formatInDubai(
  input: Date | string,
  fmt: string = DEFAULT_FMT
): string {
  const d = asUtcDate(input);
  return formatInTimeZone(d, RESTAURANT_TZ, fmt);
}

/**
 * Parse a "local" datetime string (no timezone) as restaurant time, then convert to UTC.
 * Expected format: "yyyy-MM-dd'T'HH:mm" (e.g. "2026-01-05T19:30")
 */
export function dubaiLocalToUtc(localIso: string): Date {
  const naive = parse(localIso, "yyyy-MM-dd'T'HH:mm", new Date());
  if (!isValid(naive)) throw new Error(`Invalid local datetime: ${localIso}`);
  return fromZonedTime(naive, RESTAURANT_TZ);
}

/** Convert a UTC instant into a Date whose *display components* match Dubai time. */
export function utcToDubaiZonedDate(input: Date | string): Date {
  const d = asUtcDate(input);
  return toZonedTime(d, RESTAURANT_TZ);
}

/**
 * Ceil a UTC instant to the next 15-min slot using restaurant timezone clock.
 * Returns a UTC instant (safe to store/compare).
 */
export function ceilToSlotInDubai(
  inputUtc: Date,
  stepMinutes = SLOT_MINUTES
): Date {
  const utc = asUtcDate(inputUtc);

  const zoned = utcToDubaiZonedDate(utc);
  const rounded = new Date(zoned.getTime());

  rounded.setSeconds(0, 0);

  const m = rounded.getMinutes();
  const r = m % stepMinutes;
  if (r !== 0) rounded.setMinutes(m + (stepMinutes - r));

  // Interpret the *zoned* wall-clock time as Dubai time, convert back to UTC instant
  return fromZonedTime(rounded, RESTAURANT_TZ);
}

/** Check if a UTC instant is aligned to the 15-min grid in Dubai time. */
export function isAlignedToSlotInDubai(
  inputUtc: Date,
  stepMinutes = SLOT_MINUTES
): boolean {
  const zoned = utcToDubaiZonedDate(inputUtc);
  return (
    zoned.getSeconds() === 0 &&
    zoned.getMilliseconds() === 0 &&
    zoned.getMinutes() % stepMinutes === 0
  );
}
