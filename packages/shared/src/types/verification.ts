import type {
  BaseEntity,
  ID,
  Metadata,
  Timestamp,
} from "./common";

import type {
  LearningEventType,
  VerificationStatus,
} from "../enums";

export interface LearningEvent extends BaseEntity {
  studentId: ID;

  type: LearningEventType;

  timestamp: Timestamp;

  payload: Record<string, unknown>;

  metadata?: Metadata;
}

export interface EventSignature {
  algorithm: string;

  signer: string;

  signature: string;
}

export interface VerificationResult {
  status: VerificationStatus;

  verifiedAt?: Timestamp;

  signature?: EventSignature;

  reason?: string;
}