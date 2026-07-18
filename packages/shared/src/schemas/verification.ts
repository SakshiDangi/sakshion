import { z } from "zod";

import {
  BaseEntitySchema,
  IdSchema,
  MetadataSchema,
  TimestampSchema,
} from "./common";

import {
  LearningEventType,
  VerificationStatus,
} from "../enums";

export const LearningEventSchema =
  BaseEntitySchema.extend({
    studentId: IdSchema,

    type: z.nativeEnum(
      LearningEventType
    ),

    timestamp: TimestampSchema,

    payload: z.record(
      z.string(),
      z.unknown()
    ),

    metadata:
      MetadataSchema.optional(),
  });

export const EventSignatureSchema =
  z.object({
    algorithm: z.enum([
      "ed25519",
      "secp256k1",
    ]),

    publicKey: z
      .string()
      .trim()
      .min(1),

    signature: z
      .string()
      .trim()
      .min(1),

    signedAt: TimestampSchema,
  });

export const VerificationResultSchema =
  z.object({
    status: z.nativeEnum(
      VerificationStatus
    ),

    verifiedAt:
      TimestampSchema.optional(),

    hash: z
      .string()
      .trim()
      .min(1),

    signature:
      EventSignatureSchema.optional(),

    reason: z
      .string()
      .trim()
      .max(1000)
      .optional(),
  });

export type LearningEventInput =
  z.infer<typeof LearningEventSchema>;

export type EventSignatureInput =
  z.infer<typeof EventSignatureSchema>;

export type VerificationResultInput =
  z.infer<
    typeof VerificationResultSchema
  >;