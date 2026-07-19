import type {
  ConceptGraph,
  StudentMastery,
} from "../models";

import { PrerequisiteTraversal } from "../traversal";

import { PropagationError } from "./PropagationError";

export class ConfidencePropagation {
  private readonly traversal: PrerequisiteTraversal;

  constructor(
    private readonly graph: ConceptGraph,
  ) {
    this.traversal =
      new PrerequisiteTraversal(graph);
  }

  /**
   * Updates confidence based on a mastery change.
   */
  propagate(
    conceptId: string,
    masteryDelta: number,
    mastery: StudentMastery[],
  ): StudentMastery[] {
    const updated = mastery.map((record) => ({
      ...record,
    }));

    const current = updated.find(
      (record) => record.conceptId === conceptId,
    );

    if (!current) {
      throw new PropagationError(
        `Unknown concept: ${conceptId}`,
      );
    }

    current.confidence = this.clamp(
      current.confidence +
        masteryDelta * 0.40,
    );

    const prerequisites =
      this.traversal.getPrerequisites(
        conceptId,
      );

    for (const prerequisite of prerequisites) {
      this.applyDelta(
        updated,
        prerequisite,
        masteryDelta * 0.10,
      );
    }

    const dependents =
      this.traversal.getDependents(
        conceptId,
      );

    for (const dependent of dependents) {
      this.applyDelta(
        updated,
        dependent,
        masteryDelta * 0.05,
      );
    }

    return updated;
  }

  /**
   * Applies confidence delta.
   */
  private applyDelta(
    mastery: StudentMastery[],
    conceptId: string,
    delta: number,
  ): void {
    const record = mastery.find(
      (m) => m.conceptId === conceptId,
    );

    if (!record) {
      return;
    }

    record.confidence = this.clamp(
      record.confidence + delta,
    );
  }

  /**
   * Clamp confidence to [0, 100].
   */
  private clamp(
    value: number,
  ): number {
    return Math.max(
      0,
      Math.min(100, value),
    );
  }
}