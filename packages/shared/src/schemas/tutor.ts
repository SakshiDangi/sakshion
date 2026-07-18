import { z } from "zod";

import {
  BaseEntitySchema,
  IdSchema,
  MetadataSchema,
  TimestampSchema,
} from "./common";

import {
  ConceptReferenceSchema,
} from "./concept";

import {
  TutorRole,
} from "../enums";

export const TutorContextSchema = z.object({
  roadmapId: IdSchema.optional(),

  learningObjectives: z.array(
    z.string().trim().min(1).max(500)
  ),

  previousConcepts: z.array(
    ConceptReferenceSchema
  ),
});

export const TutorMessageSchema = z.object({
  id: IdSchema,

  role: z.nativeEnum(TutorRole),

  content: z
    .string()
    .trim()
    .min(1)
    .max(10000),

  timestamp: TimestampSchema,
});

export const TutorFeedbackSchema = z.object({
  understandingScore: z
    .number()
    .min(0)
    .max(100),

  summary: z
    .string()
    .trim()
    .min(1)
    .max(2000),

  recommendedNextConcept:
    ConceptReferenceSchema.optional(),
});

export const TutorSessionSchema =
  BaseEntitySchema.extend({
    studentId: IdSchema,

    concept: ConceptReferenceSchema,

    context: TutorContextSchema,

    messages: z
      .array(TutorMessageSchema)
      .min(1),

    feedback:
      TutorFeedbackSchema.optional(),

    metadata: MetadataSchema.optional(),
  });

export type TutorContextInput =
  z.infer<typeof TutorContextSchema>;

export type TutorMessageInput =
  z.infer<typeof TutorMessageSchema>;

export type TutorFeedbackInput =
  z.infer<typeof TutorFeedbackSchema>;

export type TutorSessionInput =
  z.infer<typeof TutorSessionSchema>;