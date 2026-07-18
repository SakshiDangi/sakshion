import { z } from "zod";

import {
  BaseEntitySchema,
  IdSchema,
  MetadataSchema,
} from "./common";

import {
  DifficultyLevel,
} from "../enums";

export const LearningObjectiveSchema = z.object({
  id: IdSchema,

  description: z
    .string()
    .trim()
    .min(1)
    .max(500),
});

export const ConceptReferenceSchema = z.object({
  id: IdSchema,

  title: z
    .string()
    .trim()
    .min(1)
    .max(150),
});

export const ConceptSchema =
  BaseEntitySchema.extend({
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

    difficulty: z.nativeEnum(DifficultyLevel),

    objectives: z.array(
      LearningObjectiveSchema
    ),

    prerequisites: z.array(
      ConceptReferenceSchema
    ),

    metadata: MetadataSchema.optional(),
  });

export type ConceptInput =
  z.infer<typeof ConceptSchema>;

export type ConceptReferenceInput =
  z.infer<typeof ConceptReferenceSchema>;

export type LearningObjectiveInput =
  z.infer<typeof LearningObjectiveSchema>;