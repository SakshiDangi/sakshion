import type { ConceptNode } from "../models";

export class DifficultyEstimator {
  score(node: ConceptNode): number {
    return Math.max(1, Math.min(node.difficulty, 10));
  }
}