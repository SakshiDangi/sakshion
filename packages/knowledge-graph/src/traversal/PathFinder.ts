import type {
  ConceptGraph,
  LearningPath,
} from "../models";

import { PrerequisiteTraversal } from "./PrerequisiteTraversal";

export class PathFinder {
  private readonly traversal: PrerequisiteTraversal;

  constructor(
    private readonly graph: ConceptGraph,
  ) {
    this.traversal =
      new PrerequisiteTraversal(graph);
  }

  findLearningSequence(
    conceptId: string,
  ): string[] {
    return [
      ...this.traversal.getAncestors(conceptId),
      conceptId,
    ];
  }

  findPath(
    currentConcept: string | null,
    targetConcept: string,
  ): LearningPath {
    const sequence =
      this.findLearningSequence(targetConcept);

    const current =
      currentConcept == null
        ? null
        : this.graph.nodes.get(currentConcept) ?? null;

    return {
      currentConcept: current,

      completedConcepts: [],

      nextConcepts: sequence
        .map((id) => this.graph.nodes.get(id)!)
        .filter(Boolean),

      futureConcepts: [],
    };
  }
}