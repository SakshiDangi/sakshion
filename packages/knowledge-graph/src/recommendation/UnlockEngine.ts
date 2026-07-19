import type {
  ConceptGraph,
  StudentMastery,
} from "../models";

import { PrerequisiteTraversal } from "../traversal";

export class UnlockEngine {
  private readonly traversal: PrerequisiteTraversal;

  constructor(
    private readonly graph: ConceptGraph,
    private readonly threshold = 70,
  ) {
    this.traversal =
      new PrerequisiteTraversal(graph);
  }

  isUnlocked(
    conceptId: string,
    mastery: StudentMastery[],
  ): boolean {
    const prerequisites =
      this.traversal.getPrerequisites(conceptId);

    return prerequisites.every((id) => {
      const record = mastery.find(
        (m) => m.conceptId === id,
      );

      return (
        record !== undefined &&
        record.mastery >= this.threshold
      );
    });
  }
}