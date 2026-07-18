import type {
  BaseEntity,
  ID,
  Metadata,
} from "./common";

import type {
  ConceptReference,
} from "./concept";

import type {
  TutorRole,
} from "../enums";

export interface TutorSession extends BaseEntity {
  studentId: ID;

  concept: ConceptReference;

  context: TutorContext;

  messages: TutorMessage[];

  feedback?: TutorFeedback;

  metadata?: Metadata;
}

export interface TutorContext {
  roadmapId?: ID;

  learningObjectives: string[];

  previousConcepts: ConceptReference[];
}

export interface TutorMessage {
  id: ID;

  role: TutorRole;

  content: string;

  timestamp: string;
}

export interface TutorFeedback {
  understandingScore: number;

  summary: string;

  recommendedNextConcept?: ConceptReference;
}