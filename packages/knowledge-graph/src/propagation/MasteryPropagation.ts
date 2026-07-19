import type {
  ConceptGraph,
  StudentMastery,
} from "../models";

import { PrerequisiteTraversal } from "../traversal";

import { PropagationError } from "./PropagationError";

export class MasteryPropagation {
  private readonly traversal: PrerequisiteTraversal;

  constructor(
    private readonly graph: ConceptGraph,
  ) {
    this.traversal =
      new PrerequisiteTraversal(graph);
  }

  /**
   * Updates the mastery of a concept and propagates
   * the change through the knowledge graph.
   */
  propagate(
    conceptId: string,
    newMastery: number,
    mastery: StudentMastery[],
  ): StudentMastery[] {
    // Never mutate the original mastery state.
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

    const delta =
      newMastery - current.mastery;

    // Update the concept itself.
    current.mastery =
      this.clamp(newMastery);

    // Direct prerequisites receive 25% of the change.
    const prerequisites =
      this.traversal.getPrerequisites(
        conceptId,
      );

    for (const prerequisite of prerequisites) {
      this.applyDelta(
        updated,
        prerequisite,
        delta * 0.25,
      );
    }

    // Direct and indirect dependents receive 10%.
    const dependents =
      this.traversal.getDependents(
        conceptId,
      );

    for (const dependent of dependents) {
      this.applyDelta(
        updated,
        dependent,
        delta * 0.10,
      );
    }

    return updated;
  }

  /**
   * Applies a mastery delta to a concept.
   * Missing concepts are ignored.
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

    record.mastery = this.clamp(
      record.mastery + delta,
    );
  }

  /**
   * Ensures mastery always stays
   * between 0 and 100.
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