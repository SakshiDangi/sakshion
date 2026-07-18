import { z } from "zod";

import {
  BaseEntitySchema,
  IdSchema,
  MetadataSchema,
} from "./common";

import {
  ConceptReferenceSchema,
} from "./concept";

export const DiagnosticAnswerSchema = z.object({
  questionId: IdSchema,

  concept: ConceptReferenceSchema,

  selectedAnswer: z
    .string()
    .trim()
    .min(1)
    .max(1000),

  isCorrect: z.boolean(),

  score: z
    .number()
    .min(0)
    .max(100),
});

export const DiagnosticResultSchema = z.object({
  score: z
    .number()
    .min(0)
    .max(100),

  strengths: z.array(
    ConceptReferenceSchema
  ),

  weaknesses: z.array(
    ConceptReferenceSchema
  ),

  recommendedStartingConcept:
    ConceptReferenceSchema.optional(),
});

export const DiagnosticSchema =
  BaseEntitySchema.extend({
    studentId: IdSchema,

    answers: z
      .array(DiagnosticAnswerSchema)
      .min(1),

    result: DiagnosticResultSchema,

    metadata: MetadataSchema.optional(),
  });

export type DiagnosticAnswerInput =
  z.infer<typeof DiagnosticAnswerSchema>;

export type DiagnosticResultInput =
  z.infer<typeof DiagnosticResultSchema>;

export type DiagnosticInput =
  z.infer<typeof DiagnosticSchema>;