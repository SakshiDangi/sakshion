import { z } from "zod";

/* -------------------------------------------------------------------------- */
/*                                Primitive IDs                               */
/* -------------------------------------------------------------------------- */

export const IdSchema = z.string().trim().min(1);

export const UUIDSchema = z.uuid();

/* -------------------------------------------------------------------------- */
/*                              Date / Timestamp                              */
/* -------------------------------------------------------------------------- */

export const TimestampSchema = z.iso.datetime();

/* -------------------------------------------------------------------------- */
/*                                  Metadata                                  */
/* -------------------------------------------------------------------------- */

export const MetadataSchema = z.record(
  z.string(),
  z.unknown()
);

/* -------------------------------------------------------------------------- */
/*                                 Pagination                                 */
/* -------------------------------------------------------------------------- */

export const PaginationSchema = z.object({
  page: z.number().int().min(1),

  pageSize: z.number().int().positive(),

  totalItems: z.number().int().nonnegative(),

  totalPages: z.number().int().nonnegative(),
});

/* -------------------------------------------------------------------------- */
/*                                 Base Entity                                */
/* -------------------------------------------------------------------------- */

export const AuditInfoSchema = z.object({
  createdAt: TimestampSchema,

  updatedAt: TimestampSchema,
});

export const BaseEntitySchema =
  AuditInfoSchema.extend({
    id: IdSchema,
  });

/* -------------------------------------------------------------------------- */
/*                           Generic Paginated List                           */
/* -------------------------------------------------------------------------- */

export const createPaginatedResultSchema = <
  T extends z.ZodTypeAny
>(
  itemSchema: T
) =>
  z.object({
    items: z.array(itemSchema),

    pagination: PaginationSchema,
  });

/* -------------------------------------------------------------------------- */
/*                            Common Number Schemas                           */
/* -------------------------------------------------------------------------- */

export const PercentageSchema = z
  .number()
  .min(0)
  .max(100);

export const PositiveIntegerSchema = z
  .number()
  .int()
  .positive();

export const NonNegativeIntegerSchema = z
  .number()
  .int()
  .nonnegative();

export const PositiveNumberSchema = z
  .number()
  .positive();

export const NonNegativeNumberSchema = z
  .number()
  .nonnegative();

/* -------------------------------------------------------------------------- */
/*                             Common String Types                            */
/* -------------------------------------------------------------------------- */

export const NonEmptyStringSchema = z
  .string()
  .trim()
  .min(1);

export const ShortTextSchema =
  NonEmptyStringSchema.max(150);

export const MediumTextSchema =
  NonEmptyStringSchema.max(500);

export const LongTextSchema =
  NonEmptyStringSchema.max(10000);

export const EmailSchema = z.email();

export const UrlSchema = z.url();

/* -------------------------------------------------------------------------- */
/*                             Generic Collections                            */
/* -------------------------------------------------------------------------- */

export const StringArraySchema = z.array(
  NonEmptyStringSchema
);

export const BooleanSchema = z.boolean();