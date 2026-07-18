import { z } from "zod";

import {
  BaseEntitySchema,
  MetadataSchema,
} from "./common";

export const StudentProfileSchema = z.object({
  displayName: z.string().trim().min(1).max(100),

  email: z.email().optional(),

  avatarUrl: z.url().optional(),

  preferredLanguage: z.string().min(2).max(10).optional(),

  timezone: z.string().min(1).max(100).optional(),

  bio: z.string().max(500).optional(),
});

export const StudentSummarySchema = z.object({
  id: BaseEntitySchema.shape.id,

  displayName: z.string().trim().min(1).max(100),

  avatarUrl: z.url().optional(),

  mastery: z.number().min(0).max(100),
});

export const StudentSchema =
  BaseEntitySchema.extend({
    id: z.string().min(1),

    profile: StudentProfileSchema,

    metadata: MetadataSchema.optional(),

    summary: StudentSummarySchema,
  });