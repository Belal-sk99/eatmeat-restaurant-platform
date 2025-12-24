# EatMeat 🍽️ — Restaurant Platform (Next.js + Prisma + Supabase)

EatMeat is a full-stack **single-restaurant** platform (Palestine) built with **Next.js App Router + TypeScript**.  
It covers authentication (credentials + Google/Facebook), reservations with inventory holds + admin approval, instant & scheduled orders, in-app payments (Stripe) + external payment proof, refunds, blocks/closures, and an admin panel.

> **Timezone rule:** All times are stored in **UTC** and displayed in **Asia/Hebron**.

---

## Live

- Health endpoint: https://eatmeat.vercel.app/api/health

---

## Tech Stack

- **Next.js** (App Router) + **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
  - Local dev DB via **Docker**
  - Production DB: **Supabase Postgres**
- **Auth**: NextAuth (Credentials + Google + Facebook), **DB sessions**
- **Payments**: Stripe (in-app) + external payment proof (admin-reconciled)
- **Deploy**: Vercel (Preview + Production environments)

---

## Features (SRS-aligned)

### Authentication

- Credentials sign-up + **email verification required** before login
- Credentials login/logout (avoid user enumeration)
- OAuth: Google + Facebook
- Account linking by email (avoid duplicate users)
- Roles: `USER` / `ADMIN` (admin created via seeding/tooling)
- Protected `/admin/*` routes (RBAC)

### Reservations (Bookings)

- Table types with inventory (Small/Medium/Large or admin-defined)
- 15-minute slots, 2-hour minimum lead time, 7-day horizon
- Stay types:
  - `SHORT` (≤2h)
  - `LONG` (≤5h, **price x2**)
- Inventory hold immediately on creation in `PENDING_APPROVAL`
- Admin approve/reject
- Auto-expire after 60 minutes if not confirmed

### Orders

- Instant + Scheduled (pickup-only MVP)
- Scheduled orders follow the same time rules (2h lead, 7 days, 15-min slots)
- Status pipeline:
  - Instant: `ACCEPTED → READY → COMPLETED`
  - Scheduled: `ACCEPTED → DUE → READY → COMPLETED`
- External payments require admin confirmation (60-min SLA), else expire

### Payments & Refunds

- Stripe checkout/payment intents + webhook confirmation (later milestone)
- External payment proof upload + admin reconciliation
- Refund policy (bookings + scheduled orders + booking preorders):
  - > 24h: 100%
  - 12–24h: 90% (≤$200) / 75% (>$200)
  - <12h: 50%
  - Instant orders: 50% (unless admin overrides)

### Blocks / Closures

- Admin can block intervals for bookings/orders/both with a message shown to users

---

## Project Status / Roadmap

Milestones:

- **M0** Foundations ✅
- **M1** Auth
- **M2** Admin Setup
- **M3** Reservations
- **M4** Orders
- **M5** Payments
- **M6** Notifications & Polish

Completed foundation stories:

- **FND-1** Repo conventions + lint/format + env structure ✅
- **FND-2** Prisma + local DB + baseline migrations ✅
- **FND-3** Vercel Preview/Prod + health endpoint ✅

---

## Getting Started (Local Development)

### Prerequisites

- Node.js **18+**
- Docker Desktop (for local Postgres)

### 1) Install

```bash
git clone <YOUR_REPO_URL>
cd eatmeat
npm install
```

### 2) Environment variables

Create .env.local (never commit):

### Local dev DB (Docker)

DATABASE_URL="postgresql://postgres:postgres@localhost:54322/eatmeat?schema=public"
DIRECT_URL="postgresql://postgres:postgres@localhost:54322/eatmeat?schema=public"

### Auth (placeholders for now; real values come with Auth milestone)

NEXTAUTH_SECRET=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
FACEBOOK_CLIENT_ID=""
FACEBOOK_CLIENT_SECRET=""

### Payments (placeholders for now)

STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""

- Keep .env.example committed with empty placeholders only.

---

### 3) Start local Postgres

## `docker compose up -d`

---

### 4) Prisma: migrate + generate

```bash
npx prisma migrate dev --name init_auth
npx prisma generate
```

---

### 5) Run the app

### ` npm run dev`

---

### 6) Prisma Studio

### `npx prisma studio`

---

## Scripts

### Common scripts (see package.json):

```bash
npm run prisma:generate

npm run prisma:migrate

npm run prisma:studio
```

### Optional DB helpers (if added):

```bash
npm run db:up

npm run db:down
```

## Database & Prisma Workflow (Important)

- Dev migrations are created locally via prisma migrate dev.

- Commit: `prisma/migrations/**`

- Never commit: `.env.local`

### Production (Supabase + Vercel) strategy

- App runtime on Vercel should use Supabase pooler/transaction connection for stability under serverless traffic.

- Prisma migrations and admin tooling should use a direct connection string.

- Vercel environment variables must be separated for Preview and Production.

## Vercel Preview Deployments

- PRs generate Preview deployments automatically.

- `GET /api/health` returns:
  - `env`: `preview` or `production`

  - git branch + commit SHA

## Project Structure (High level)

```bash
app/
  api/
    health/route.ts
  (public)/
  (auth)/
  (user)/
  (admin)/
prisma/
  schema.prisma
  migrations/
docs/
.github/
  ISSUE_TEMPLATE/story.md
```

---

## Troubleshooting

### Docker is running but Postgres doesn’t start

`docker logs -f eatmeat-postgres`

### Prisma can’t connect to DB

- Confirm container is up:

  `docker ps`

- Confirm .env.local has the correct DATABASE_URL and port 54322.

### Studio opens but tables are missing

- You likely didn’t run migrations:

  `npx prisma migrate dev`

## License

### TBD

```bash
 If you paste your current `package.json` scripts + your actual folder structure under `app/`, I can adjust this README to match your repo **exactly** (no placeholders/assumptions).
::contentReference[oaicite:0]{index=0}
```
