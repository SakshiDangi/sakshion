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
  MasteryLevel,
} from "../enums";

export const ConceptMasterySchema = z.object({
  concept: ConceptReferenceSchema,

  score: z
    .number()
    .min(0)
    .max(100),

  level: z.nativeEnum(MasteryLevel),

  lastUpdated: TimestampSchema,
});

export const MasteryTrendSchema = z.object({
  timestamp: TimestampSchema,

  masteryScore: z
    .number()
    .min(0)
    .max(100),
});

export const StudentStatisticsSchema =
  z.object({
    completedTutorSessions: z
      .number()
      .int()
      .nonnegative(),

    completedPracticeSessions: z
      .number()
      .int()
      .nonnegative(),

    totalStudyMinutes: z
      .number()
      .int()
      .nonnegative(),

    totalXp: z
      .number()
      .int()
      .nonnegative(),

    currentStreak: z
      .number()
      .int()
      .nonnegative(),
  });

export const LearningProgressSchema =
  BaseEntitySchema.extend({
    studentId: IdSchema,

    overallMastery: z
      .number()
      .min(0)
      .max(100),

    masteredConcepts: z
      .number()
      .int()
      .nonnegative(),

    totalConcepts: z
      .number()
      .int()
      .positive(),

    conceptMastery: z.array(
      ConceptMasterySchema
    ),

    trends: z.array(
      MasteryTrendSchema
    ),

    statistics:
      StudentStatisticsSchema,

    metadata:
      MetadataSchema.optional(),
  });

export type ConceptMasteryInput =
  z.infer<typeof ConceptMasterySchema>;

export type MasteryTrendInput =
  z.infer<typeof MasteryTrendSchema>;

export type StudentStatisticsInput =
  z.infer<typeof StudentStatisticsSchema>;

export type LearningProgressInput =
  z.infer<typeof LearningProgressSchema>;