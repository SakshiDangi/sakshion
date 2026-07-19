import type { ConceptNode } from "./ConceptNode";

export interface LearningPath {
  /**
   * Current focus concept.
   */
  currentConcept: ConceptNode | null;

  /**
   * Concepts already mastered.
   */
  completedConcepts: ConceptNode[];

  /**
   * Immediate next concepts.
   */
  nextConcepts: ConceptNode[];

  /**
   * Future recommended concepts.
   */
  futureConcepts: ConceptNode[];
}