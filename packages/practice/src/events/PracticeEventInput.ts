export interface PracticeEventInput {
  studentId: string;

  conceptId: string;

  sessionId: string;

  score: number;

  masteryBefore: number;

  masteryAfter: number;

  confidenceBefore: number;

  confidenceAfter: number;

  timestamp?: Date;
}