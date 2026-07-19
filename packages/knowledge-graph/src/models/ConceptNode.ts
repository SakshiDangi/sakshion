export interface ConceptNode {
  /**
   * Globally unique concept identifier.
   */
  id: string;

  /**
   * Human-readable title.
   */
  title: string;

  /**
   * Short description of the concept.
   */
  description: string;

  /**
   * Subject (Math, Science, etc.).
   */
  subject: string;

  /**
   * Curriculum grade.
   */
  grade: number;

  /**
   * Relative difficulty (1–10).
   */
  difficulty: number;

  /**
   * Estimated learning time.
   */
  estimatedMinutes: number;

  /**
   * Expected learning outcomes.
   */
  learningObjectives: string[];
}