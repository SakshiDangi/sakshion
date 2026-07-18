import type {
  BaseEntity,
  ID,
  Metadata,
} from "./common";

import type {
  ConceptReference,
} from "./concept";

export interface Diagnostic extends BaseEntity {
  studentId: ID;

  answers: DiagnosticAnswer[];

  result: DiagnosticResult;

  metadata?: Metadata;
}

export interface DiagnosticAnswer {
  questionId: ID;

  concept: ConceptReference;

  selectedAnswer: string;

  isCorrect: boolean;

  score: number;
}

export interface DiagnosticResult {
  score: number;

  strengths: ConceptReference[];

  weaknesses: ConceptReference[];

  recommendedStartingConcept?: ConceptReference;
}