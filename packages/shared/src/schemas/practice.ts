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
  DifficultyLevel,
} from "../enums";

export const PracticeQuestionSchema = z.object({
  id: IdSchema,

  concept: ConceptReferenceSchema,

  difficulty: z.nativeEnum(DifficultyLevel),

  prompt: z
    .string()
    .trim()
    .min(1)
    .max(5000),

  options: z
    .array(
      z.string().trim().min(1)
    )
    .optional(),

  correctAnswer: z
    .string()
    .trim()
    .optional(),

  explanation: z
    .string()
    .trim()
    .max(5000)
    .optional(),
});

export const PracticeAttemptSchema = z.object({
  questionId: IdSchema,

  answer: z
    .string()
    .trim()
    .min(1)
    .max(10000),

  isCorrect: z.boolean(),

  score: z
    .number()
    .min(0)
    .max(100),

  timeSpentSeconds: z
    .number()
    .int()
    .nonnegative(),
});

export const PracticeResultSchema = z.object({
  score: z
    .number()
    .min(0)
    .max(100),

  totalQuestions: z
    .number()
    .int()
    .positive(),

  correctAnswers: z
    .number()
    .int()
    .nonnegative(),

  accuracy: z
    .number()
    .min(0)
    .max(100),

  completedAt: TimestampSchema,
});

export const PracticeSessionSchema =
  BaseEntitySchema.extend({
    studentId: IdSchema,

    concept: ConceptReferenceSchema,

    questions: z
      .array(PracticeQuestionSchema)
      .min(1),

    attempts: z.array(
      PracticeAttemptSchema
    ),

    result: PracticeResultSchema,

    metadata: MetadataSchema.optional(),
  });

export type PracticeQuestionInput =
  z.infer<typeof PracticeQuestionSchema>;

export type PracticeAttemptInput =
  z.infer<typeof PracticeAttemptSchema>;

export type PracticeResultInput =
  z.infer<typeof PracticeResultSchema>;

export type PracticeSessionInput =
  z.infer<typeof PracticeSessionSchema>;