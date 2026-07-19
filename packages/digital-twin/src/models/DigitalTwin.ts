import type { ConceptMastery } from "./ConceptMastery";
import type { ConceptConfidence } from "./ConceptConfidence";
import type { LearningState } from "./LearningState";
import type { ProgressSnapshot } from "./ProgressSnapshot";


export interface DigitalTwin {

  studentId: string;

  mastery: Record<string, ConceptMastery>;

  confidence: Record<string, ConceptConfidence>;

  learningState: LearningState;

  xp: number;

  streak: {
    current: number;
    longest: number;
    lastActiveDate: string;
  };

  statistics: {
    totalPractices: number;
    completedConcepts: number;
    averageMastery: number;
  };

  history: ProgressSnapshot[];

  updatedAt: Date;
}