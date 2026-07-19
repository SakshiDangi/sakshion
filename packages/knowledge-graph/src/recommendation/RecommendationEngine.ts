import type {
  ConceptGraph,
  ConceptNode,
  StudentMastery,
} from "../models";

import { DifficultyEstimator } from "./DifficultyEstimator";
import { UnlockEngine } from "./UnlockEngine";

export class RecommendationEngine {
  private readonly unlockEngine: UnlockEngine;
  private readonly difficultyEstimator: DifficultyEstimator;

  constructor(
    private readonly graph: ConceptGraph,
    private readonly masteryThreshold = 70,
  ) {
    this.unlockEngine = new UnlockEngine(
      graph,
      masteryThreshold,
    );

    this.difficultyEstimator =
      new DifficultyEstimator();
  }

  /**
   * Returns the highest-priority recommendation.
   */
  recommend(
    mastery: StudentMastery[],
  ): ConceptNode | null {
    const candidates =
      this.getCandidates(mastery);

    return candidates[0] ?? null;
  }

  /**
   * Returns all recommended concepts ordered by priority.
   */
  recommendAll(
    mastery: StudentMastery[],
  ): ConceptNode[] {
    return this.getCandidates(mastery);
  }

  /**
   * Builds the ranked recommendation list.
   */
  private getCandidates(
    mastery: StudentMastery[],
  ): ConceptNode[] {
    const candidates: ConceptNode[] = [];

    for (const concept of this.graph.nodes.values()) {
      if (this.isMastered(concept.id, mastery)) {
        continue;
      }

      if (
        !this.unlockEngine.isUnlocked(
          concept.id,
          mastery,
        )
      ) {
        continue;
      }

      candidates.push(concept);
    }

    candidates.sort((a, b) => {
      const scoreA =
        this.difficultyEstimator.score(a);

      const scoreB =
        this.difficultyEstimator.score(b);

      return scoreA - scoreB;
    });

    return candidates;
  }

  /**
   * Returns true if the student has mastered the concept.
   */
  private isMastered(
    conceptId: string,
    mastery: StudentMastery[],
  ): boolean {
    const record = mastery.find(
      (entry) => entry.conceptId === conceptId,
    );

    return (
      record !== undefined &&
      record.mastery >= this.masteryThreshold
    );
  }
}