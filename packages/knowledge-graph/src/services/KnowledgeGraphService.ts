import type {
  ConceptEdge,
  ConceptGraph,
  ConceptNode,
  StudentMastery,
  LearningPath,
} from "../models";

import { GraphBuilder } from "../graph";
import { GraphValidator } from "../validation";
import {
  PrerequisiteTraversal,
  PathFinder,
} from "../traversal";
import { RecommendationEngine } from "../recommendation";
import {
  MasteryPropagation,
  ConfidencePropagation,
} from "../propagation";
import { KnowledgeGraphServiceError } from "./KnowledgeGraphServiceError";

export class KnowledgeGraphService {
  private graph: ConceptGraph | null = null;

  private readonly builder =
    new GraphBuilder();

  /**
   * Builds and validates the knowledge graph.
   */
  loadGraph(
    nodes: ConceptNode[],
    edges: ConceptEdge[],
  ): void {
    const graph =
      this.builder.build(
        nodes,
        edges,
      );

    const validator =
      new GraphValidator(graph);

    validator.validate();

    this.graph = graph;
  }


  /**
   * Returns the currently loaded graph.
   */
  getGraph(): ConceptGraph {
    if (this.graph === null) {
      throw new KnowledgeGraphServiceError(
        "Knowledge graph has not been loaded.",
      );
    }
    return this.graph;
  }


  /**
   * Returns true if graph exists.
   */
  isLoaded(): boolean {
    return this.graph !== null;
  }


  /**
   * Clears current graph.
   */
  clear(): void {
    this.graph = null;
  }


  /**
   * Finds a concept by ID.
   */
  findConcept(
    conceptId: string,
  ): ConceptNode | undefined {
    const graph =
      this.getGraph();

    return graph.nodes.get(
      conceptId,
    );
  }


  /**
   * Validates the current graph.
   */
  validate(): void {
    const graph =
      this.getGraph();

    const validator =
      new GraphValidator(graph);

    validator.validate();
  }


  /**
   * Returns direct prerequisites
   * for a concept.
   *
   * TODO:
   * Implement using PrerequisiteTraversal.
   */
getPrerequisites(
  conceptId: string,
): string[] {
  const graph =
    this.getGraph();

  if (!graph.nodes.has(conceptId)) {
    throw new KnowledgeGraphServiceError(
      `Unknown concept: ${conceptId}`,
    );
  }

  const traversal =
    new PrerequisiteTraversal(graph);

  return traversal.getPrerequisites(
    conceptId,
  );
}

/**
 * Finds learning path.
 */
findPath(
  currentConceptId: string | null,
  targetConceptId: string,
): LearningPath {
  const graph =
    this.getGraph();

  if (!graph.nodes.has(targetConceptId)) {
    throw new KnowledgeGraphServiceError(
      `Unknown concept: ${targetConceptId}`,
    );
  }

  const pathFinder =
    new PathFinder(graph);

  return pathFinder.findPath(
    currentConceptId,
    targetConceptId,
  );
}


  /**
   * Returns next recommended concept.
   *
   * TODO:
   * Implement using RecommendationEngine.
   */
recommend(
  mastery: StudentMastery[],
): ConceptNode | null {
  const graph =
    this.getGraph();

  const engine =
    new RecommendationEngine(graph);

  return engine.recommend(
    mastery,
  );
}


  /**
   * Returns all recommended concepts.
   *
   * TODO:
   * Implement using RecommendationEngine.
   */
recommendAll(
  mastery: StudentMastery[],
): ConceptNode[] {
  const graph =
    this.getGraph();

  const engine =
    new RecommendationEngine(graph);

  return engine.recommendAll(
    mastery,
  );
}


  /**
   * Updates mastery and propagates changes.
   *
   * TODO:
   * Implement using MasteryPropagation.
   */
propagateMastery(
  conceptId: string,
  newMastery: number,
  mastery: StudentMastery[],
): StudentMastery[] {
  const graph =
    this.getGraph();

  if (!graph.nodes.has(conceptId)) {
    throw new KnowledgeGraphServiceError(
      `Unknown concept: ${conceptId}`,
    );
  }

  const propagation =
    new MasteryPropagation(graph);

  return propagation.propagate(
    conceptId,
    newMastery,
    mastery,
  );
}


  /**
   * Updates confidence propagation.
   *
   * TODO:
   * Implement using ConfidencePropagation.
   */
propagateConfidence(
  conceptId: string,
  confidenceDelta: number,
  mastery: StudentMastery[],
): StudentMastery[] {
  const graph =
    this.getGraph();


  if (!graph.nodes.has(conceptId)) {
    throw new KnowledgeGraphServiceError(
      `Unknown concept: ${conceptId}`,
    );
  }


  const propagation =
    new ConfidencePropagation(graph);


  return propagation.propagate(
    conceptId,
    confidenceDelta,
    mastery,
  );
}
}