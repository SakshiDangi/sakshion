import type {
  BaseEntity,
  ID,
  Metadata,
} from "./common";

import type {
  ConceptReference,
} from "./concept";

import type {
  DifficultyLevel,
} from "../enums";

export interface PracticeQuestion {
  id: ID;

  concept: ConceptReference;

  difficulty: DifficultyLevel;

  prompt: string;

  options?: string[];

  correctAnswer?: string;

  explanation?: string;
}

export interface PracticeAttempt {
  questionId: ID;

  answer: string;

  isCorrect: boolean;

  score: number;

  timeSpentSeconds: number;
}

export interface PracticeResult {
  score: number;

  totalQuestions: number;

  correctAnswers: number;

  accuracy: number;

  completedAt: string;
}

export interface PracticeSession extends BaseEntity {
  studentId: ID;

  concept: ConceptReference;

  questions: PracticeQuestion[];

  attempts: PracticeAttempt[];

  result: PracticeResult;

  metadata?: Metadata;
}