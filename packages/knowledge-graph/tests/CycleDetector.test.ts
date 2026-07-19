import { describe, expect, it } from "vitest";

import { GraphBuilder } from "../src/graph";
import type { ConceptNode, ConceptEdge } from "../src/models";
import { RelationshipType } from "../src/models";
import { CycleDetector } from "../src/validation";

describe("CycleDetector", () => {
  const builder = new GraphBuilder();

  it("returns false for an empty graph", () => {
    const graph = builder.build([], []);

    const detector = new CycleDetector(graph);

    expect(detector.hasCycle()).toBe(false);
  });

  it("returns false for a single node", () => {
    const nodes: ConceptNode[] = [
      {
        id: "A",
        title: "A",
        description: "",
        subject: "Math",
        grade: 6,
        difficulty: 1,
        estimatedMinutes: 10,
        learningObjectives: [],
      },
    ];

    const graph = builder.build(nodes, []);

    const detector = new CycleDetector(graph);

    expect(detector.hasCycle()).toBe(false);
  });

  it("returns false for a linear graph", () => {
    const nodes: ConceptNode[] = [
      {
        id: "A",
        title: "A",
        description: "",
        subject: "Math",
        grade: 6,
        difficulty: 1,
        estimatedMinutes: 10,
        learningObjectives: [],
      },
      {
        id: "B",
        title: "B",
        description: "",
        subject: "Math",
        grade: 6,
        difficulty: 2,
        estimatedMinutes: 10,
        learningObjectives: [],
      },
      {
        id: "C",
        title: "C",
        description: "",
        subject: "Math",
        grade: 6,
        difficulty: 3,
        estimatedMinutes: 10,
        learningObjectives: [],
      },
    ];

    const edges: ConceptEdge[] = [
      {
        source: "A",
        target: "B",
        relationship: RelationshipType.PREREQUISITE,
      },
      {
        source: "B",
        target: "C",
        relationship: RelationshipType.PREREQUISITE,
      },
    ];

    const graph = builder.build(nodes, edges);

    const detector = new CycleDetector(graph);

    expect(detector.hasCycle()).toBe(false);
  });

  it("returns false for a branching graph", () => {
    const nodes: ConceptNode[] = [
      {
        id: "A",
        title: "A",
        description: "",
        subject: "Math",
        grade: 6,
        difficulty: 1,
        estimatedMinutes: 10,
        learningObjectives: [],
      },
      {
        id: "B",
        title: "B",
        description: "",
        subject: "Math",
        grade: 6,
        difficulty: 2,
        estimatedMinutes: 10,
        learningObjectives: [],
      },
      {
        id: "C",
        title: "C",
        description: "",
        subject: "Math",
        grade: 6,
        difficulty: 2,
        estimatedMinutes: 10,
        learningObjectives: [],
      },
      {
        id: "D",
        title: "D",
        description: "",
        subject: "Math",
        grade: 6,
        difficulty: 3,
        estimatedMinutes: 10,
        learningObjectives: [],
      },
    ];

    const edges: ConceptEdge[] = [
      {
        source: "A",
        target: "B",
        relationship: RelationshipType.PREREQUISITE,
      },
      {
        source: "A",
        target: "C",
        relationship: RelationshipType.PREREQUISITE,
      },
      {
        source: "B",
        target: "D",
        relationship: RelationshipType.PREREQUISITE,
      },
      {
        source: "C",
        target: "D",
        relationship: RelationshipType.PREREQUISITE,
      },
    ];

    const graph = builder.build(nodes, edges);

    const detector = new CycleDetector(graph);

    expect(detector.hasCycle()).toBe(false);
  });

  it("detects a simple cycle", () => {
    const nodes: ConceptNode[] = [
      {
        id: "A",
        title: "A",
        description: "",
        subject: "Math",
        grade: 6,
        difficulty: 1,
        estimatedMinutes: 10,
        learningObjectives: [],
      },
      {
        id: "B",
        title: "B",
        description: "",
        subject: "Math",
        grade: 6,
        difficulty: 2,
        estimatedMinutes: 10,
        learningObjectives: [],
      },
    ];

    const edges: ConceptEdge[] = [
      {
        source: "A",
        target: "B",
        relationship: RelationshipType.PREREQUISITE,
      },
      {
        source: "B",
        target: "A",
        relationship: RelationshipType.PREREQUISITE,
      },
    ];

    const graph = builder.build(nodes, edges);

    const detector = new CycleDetector(graph);

    expect(detector.hasCycle()).toBe(true);
  });

  it("detects a larger cycle", () => {
    const nodes: ConceptNode[] = [
      {
        id: "A",
        title: "A",
        description: "",
        subject: "Math",
        grade: 6,
        difficulty: 1,
        estimatedMinutes: 10,
        learningObjectives: [],
      },
      {
        id: "B",
        title: "B",
        description: "",
        subject: "Math",
        grade: 6,
        difficulty: 2,
        estimatedMinutes: 10,
        learningObjectives: [],
      },
      {
        id: "C",
        title: "C",
        description: "",
        subject: "Math",
        grade: 6,
        difficulty: 3,
        estimatedMinutes: 10,
        learningObjectives: [],
      },
      {
        id: "D",
        title: "D",
        description: "",
        subject: "Math",
        grade: 6,
        difficulty: 4,
        estimatedMinutes: 10,
        learningObjectives: [],
      },
    ];

    const edges: ConceptEdge[] = [
      {
        source: "A",
        target: "B",
        relationship: RelationshipType.PREREQUISITE,
      },
      {
        source: "B",
        target: "C",
        relationship: RelationshipType.PREREQUISITE,
      },
      {
        source: "C",
        target: "D",
        relationship: RelationshipType.PREREQUISITE,
      },
      {
        source: "D",
        target: "B",
        relationship: RelationshipType.PREREQUISITE,
      },
    ];

    const graph = builder.build(nodes, edges);

    const detector = new CycleDetector(graph);

    expect(detector.hasCycle()).toBe(true);
  });
});