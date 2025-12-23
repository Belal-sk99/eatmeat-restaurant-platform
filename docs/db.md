# Database + Prisma workflow (EatMeat)

## Local dev database

Start Postgres:

- npm run db:up
  Or:
- docker compose up -d

Env:

- DATABASE_URL points to local Postgres
- DIRECT_URL same as DATABASE_URL in local dev

## Migrations (local dev)

1. Edit prisma/schema.prisma
2. Apply migration:
   - npm run prisma:migrate -- --name <short_name>
3. Open Prisma Studio:
   - npm run prisma:studio

## Notes

- Commit `prisma/migrations/**`
- Do NOT commit `.env.local`
