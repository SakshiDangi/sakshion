import type { ConceptScore } from "./ConceptScore";

/**
 * Final output produced after
 * completing a diagnostic assessment.
 */
export interface AssessmentResult {
  /**
   * Overall assessment score (0–100).
   */
  overallScore: number;

  /**
   * Score for every assessed concept.
   */
  conceptScores: ConceptScore[];

  /**
   * Concepts needing improvement.
   */
  weakConcepts: string[];

  /**
   * Concepts already mastered.
   */
  strongConcepts: string[];

  /**
   * Mastery estimate for every concept.
   */
  masteryMap: Record<string, number>;

  /**
   * Confidence estimate for every concept.
   */
  confidenceMap: Record<string, number>;
}