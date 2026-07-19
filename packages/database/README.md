# @sakshion/database

Type-safe PostgreSQL persistence layer for Sakshion.

## Features

- Drizzle ORM
- PostgreSQL (Neon)
- Repository pattern
- Type-safe schema
- Seed scripts
- Database migrations
- Transaction helper

## Structure

```
src/
├── client/
├── schema/
├── repositories/
├── seed/
├── migrations/
├── transactions/
└── index.ts
```

## Scripts

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:push
pnpm db:seed
pnpm test
```

## Architecture

```
API
 ↓
Repositories
 ↓
Drizzle ORM
 ↓
PostgreSQL
```