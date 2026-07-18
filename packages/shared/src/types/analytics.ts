import type {
  BaseEntity,
  ID,
  Metadata,
  Timestamp,
} from "./common";

import type {
  ConceptReference,
} from "./concept";

import type {
  MasteryLevel,
} from "../enums";

export interface LearningProgress extends BaseEntity {
  studentId: ID;

  overallMastery: number;

  masteredConcepts: number;

  totalConcepts: number;

  conceptMastery: ConceptMastery[];

  trends: MasteryTrend[];

  statistics: StudentStatistics;

  metadata?: Metadata;
}

export interface ConceptMastery {
  concept: ConceptReference;

  score: number;

  level: MasteryLevel;

  lastUpdated: Timestamp;
}

export interface MasteryTrend {
  timestamp: Timestamp;

  masteryScore: number;
}

export interface StudentStatistics {
  completedTutorSessions: number;

  completedPracticeSessions: number;

  totalStudyMinutes: number;

  totalXp: number;

  currentStreak: number;
}