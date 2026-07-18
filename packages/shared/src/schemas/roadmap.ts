import { z } from "zod";

import {
  BaseEntitySchema,
  IdSchema,
  MetadataSchema,
} from "./common";

import {
  ConceptReferenceSchema,
} from "./concept";

import {
  Status,
} from "../enums";

export const RecommendationSchema = z.object({
  id: IdSchema,

  message: z
    .string()
    .trim()
    .min(1)
    .max(500),

  priority: z
    .number()
    .int()
    .min(1),
});

export const RoadmapNodeSchema = z.object({
  id: IdSchema,

  concept: ConceptReferenceSchema,

  order: z
    .number()
    .int()
    .min(1),

  estimatedMinutes: z
    .number()
    .int()
    .positive(),

  completed: z.boolean(),
});

export const RoadmapSchema =
  BaseEntitySchema.extend({
    studentId: IdSchema,

    title: z
      .string()
      .trim()
      .min(1)
      .max(150),

    description: z
      .string()
      .trim()
      .max(2000)
      .optional(),

    status: z.nativeEnum(Status),

    nodes: z
      .array(RoadmapNodeSchema)
      .min(1),

    recommendations: z.array(
      RecommendationSchema
    ),

    metadata: MetadataSchema.optional(),
  });

export type RecommendationInput =
  z.infer<typeof RecommendationSchema>;

export type RoadmapNodeInput =
  z.infer<typeof RoadmapNodeSchema>;

export type RoadmapInput =
  z.infer<typeof RoadmapSchema>;