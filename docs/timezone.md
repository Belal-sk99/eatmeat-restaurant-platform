## Timezone rule

EatMeat stores all timestamps in **UTC** (DB + API).  
All display and scheduling rules use **Asia/Dubai** (restaurant local time).

Use `lib/time.ts` helpers—do not format dates ad-hoc in UI.
