import type {
  Student,
  PracticeAttempt,
  StudentMastery,
  Roadmap,
  LearningEvent,
} from "@sakshion/database";

/**
 * Raw data loaded from repositories.
 *
 * Produced by DashboardQueries.
 */
export interface DashboardData {

  /**
   * Student profile.
   */
  student?: Student;

  /**
   * Practice history.
   */
  practices: PracticeAttempt[];

  /**
   * Student mastery records.
   */
  mastery: StudentMastery[];

  /**
   * Stored roadmap.
   */
  roadmap?: Roadmap;

  /**
   * Learning events.
   */
  learningEvents: LearningEvent[];
}

/**
 * Calculated dashboard metrics.
 *
 * Produced by DashboardCalculator.
 */
export interface DashboardMetrics {

  /**
   * Student level.
   */
  level: number;

  /**
   * Total XP.
   */
  experience: number;

  /**
   * Average mastery.
   */
  mastery: number;

  /**
   * Number of completed practice sessions.
   */
  practiceCount: number;

  /**
   * Latest practice score.
   */
  lastScore: number;

  /**
   * Verification state.
   */
  verified: boolean;

  /**
   * Learning Twin confidence.
   */
  confidence: number;
}