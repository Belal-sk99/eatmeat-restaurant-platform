import {
  formatInDubai,
  dubaiLocalToUtc,
  ceilToSlotInDubai,
  isAlignedToSlotInDubai,
  utcToDubaiZonedDate,
} from "../lib/time"; // adjust path if you use src/lib/time.ts

function log(title: string, value: unknown) {
  console.log(`\n=== ${title} ===`);
  console.log(value);
}

// 1) Now (UTC instant)
const nowUtc = new Date();
log("Now UTC ISO", nowUtc.toISOString());
log("Now formatted in Dubai", formatInDubai(nowUtc));
log("Now as Dubai-zoned Date components", utcToDubaiZonedDate(nowUtc));

// 2) Parse a Dubai local datetime -> UTC instant
const localDubai = "2026-01-05T19:30"; // Dubai wall time
const utcFromDubai = dubaiLocalToUtc(localDubai);
log("Dubai local input", localDubai);
log("Converted to UTC ISO", utcFromDubai.toISOString());
log("Back formatted in Dubai", formatInDubai(utcFromDubai));

// 3) Slot rounding
const roundedUtc = ceilToSlotInDubai(nowUtc);
log("Rounded-to-slot UTC ISO", roundedUtc.toISOString());
log("Rounded formatted in Dubai", formatInDubai(roundedUtc));
log("Is rounded aligned to 15m in Dubai?", isAlignedToSlotInDubai(roundedUtc));
log("Is now aligned to 15m in Dubai?", isAlignedToSlotInDubai(nowUtc));
