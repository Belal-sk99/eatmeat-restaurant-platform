# EatMeat — Restaurant Platform (Next.js + Prisma + Postgres)

EatMeat is a **single-restaurant** web platform (Dubai, UAE) with a public site, customer flows, and an admin panel.
It covers **authentication**, **table bookings**, **pickup orders (instant/scheduled)**, **payments (Stripe + external proof)**, **refunds**, **closures/blocks**, and **email notifications**.

> **Time rule:** all timestamps are stored in **UTC** and displayed in the restaurant’s time zone (default: **Asia/Dubai**).

---

## What you can do

### Guests / Customers

- Browse public pages (landing, menu, dish details).
- Create bookings by selecting **table types**, **start time**, **stay type** (SHORT/LONG), and optional **pre-order items**.
- Create **pickup orders** (instant or scheduled) using **Cart → Checkout**.
- Pay with **Stripe** (in-app) or choose **external payment** and upload proof.
- Cancel bookings/orders and receive refunds per policy.
- Receive email notifications for verification and lifecycle events (approvals, expiries, cancellations, reminders).

### Admins

- Manage **table types** (inventory, seat ranges, pricing, active).
- Manage **menu items** + categories (CRUD, availability).
- Approve/reject **bookings** and **external-payment orders**.
- Create **blocks/closures** (bookings/orders/both) with user-facing messages.
- Reconcile external payment proof and trigger/track refunds.
- Audit critical admin actions.

---

## Core business rules (SRS)

### Bookings (Reservations)

- **15-minute slots** (start times aligned).
- **2-hour minimum lead time** (rounded up to the next 15-min slot).
- **7-day horizon** (bookings allowed up to 7 days in advance).
- Stay types:
  - `SHORT` up to **2h**
  - `LONG` up to **5h** (total price **×2** including preorders)
- Inventory overlap uses **half-open intervals**: `[startAt, endAt)`.
- New booking is created as `PENDING_APPROVAL` and **holds inventory immediately**.
- Admin must approve/reject; if still pending after **60 minutes** it expires.

### Orders (Pickup-only MVP)

- `INSTANT` or `SCHEDULED`.
- Scheduled orders follow the same time rules (**2h lead**, **7-day window**, **15-min alignment**).
- External-payment orders require admin confirmation within **60 minutes** or expire.
- Status pipeline includes `PENDING_APPROVAL → ACCEPTED → (DUE) → READY → COMPLETED`.

### Payments

- **Stripe**: PaymentIntent / Checkout Session with webhook-driven confirmation.
- **External**: proof upload at `/payments/proof/[refType]/[refId]`, reviewed by admin.

### Refund policy

Refunds depend on time remaining before `scheduledAt` (booking start / scheduled order time) and total amount:

| Time before scheduledAt | Total ≤ $200 | Total > $200 |
| ----------------------- | -----------: | -----------: |
| > 24h                   |         100% |         100% |
| 12–24h                  |          90% |          75% |
| < 12h                   |          50% |          50% |

Notes:

- Applies to **bookings**, **scheduled orders**, and **booking preorders**.
- **Instant orders** default to **50%** refund (admin override supported).
- Stripe refunds are automatic; external refunds are manual but tracked.

### Blocks / closures

Admins can block intervals for **BOOKINGS**, **ORDERS**, or **BOTH** (with a message shown to users). Any attempt to book/order inside a block must fail with that message.

---

## Tech stack

- **Next.js** (App Router) + **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
  - Local dev DB via Docker
  - Production runtime DB: **Supabase Postgres**
- **Auth**: NextAuth (Credentials + Google/Facebook), DB sessions
- **Payments**: Stripe + external payment proof
- **UI**: Tailwind + shadcn/ui, Design System (**dark modern clean + red accent**)
- **Deploy**: Vercel (Preview + Production)

---

## Repository structure (high level)

```
app/        # Next.js routes (public/auth/user/admin) + API routes
lib/        # shared server/client utilities (time, validation, db helpers…)
prisma/     # schema + migrations
docs/       # SRS, DB schema notes, design system, backlog
public/     # static assets
scripts/    # local tooling (seeding, helpers, etc.)
```

---

## Getting started (local)

### Prerequisites

- Node.js 18+
- Docker Desktop (for local Postgres)

### 1) Install

```bash
git clone https://github.com/Belal-sk99/eatmeat-restaurant-platform.git
cd eatmeat-restaurant-platform
npm install
```

### 2) Environment variables

Create `.env.local` (do not commit). Minimal setup:

```bash
# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB?schema=public"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DB?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="..."

# OAuth (optional until M1)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
FACEBOOK_CLIENT_ID=""
FACEBOOK_CLIENT_SECRET=""

# Stripe (optional until M5)
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""

# Email (Notifications) — provider recommended in backlog: Resend
RESEND_API_KEY=""
EMAIL_FROM="no-reply@yourdomain.com"
```

### 3) Start local Postgres

```bash
docker compose up -d
```

### 4) Prisma: generate + migrate

```bash
npx prisma generate
npx prisma migrate dev
```

### 5) Run the app

```bash
npm run dev
```

### 6) Prisma Studio

```bash
npx prisma studio
```

---

## Deployment notes (Vercel + Supabase)

- Keep **Preview** and **Production** environment variables separate.
- Use the Supabase **pooled** connection string for serverless runtime; use **DIRECT_URL** for migrations/admin tooling.
- Webhooks (Stripe) must be configured per environment and handled idempotently.

---

## Roadmap

Milestones are tracked in GitHub Issues:

- **M0** Foundations + App Shell ✅
- **M1** Authentication + Notifications foundation
- **M2** Admin setup (menu/table types/blocks/reconciliation)
- **M3** Reservations
- **M4** Orders
- **M5** Payments (Stripe webhooks + refunds)
- **M6** Notifications + polish

---

## License

TBD
