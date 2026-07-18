# @sakshion/shared

The framework-agnostic shared foundation for Sakshion.

This package contains reusable contracts and primitives shared across the Sakshion architecture.

## Responsibilities

- Shared domain types
- Runtime validation schemas
- Constants
- Enums
- API contracts
- Result types
- Common errors
- Generic utilities

## Dependency Rules

This package must remain framework-agnostic.

### Allowed

- Zod
- Nanoid

### Not allowed

- Next.js
- React
- OpenAI SDKs
- Database clients
- Drizzle
- Prisma
- Knowledge Graph business logic
- Finality business logic

## Usage

Import from the package root:

```ts
import {
  Student,
  StudentSchema,
  LearningEventType,
  ok,
  err,
} from "@sakshion/shared";