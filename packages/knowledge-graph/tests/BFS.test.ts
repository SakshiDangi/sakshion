import { describe, expect, it } from "vitest";

import { GraphBuilder } from "../src/graph";
import {
  RelationshipType,
  type ConceptEdge,
  type ConceptNode,
} from "../src/models";
import { BFS } from "../src/traversal";

const nodes: ConceptNode[] = [
  {
    id: "division",
    title: "Division",
    description: "",
    subject: "Math",
    grade: 6,
    difficulty: 1,
    estimatedMinutes: 20,
    learningObjectives: [],
  },
  {
    id: "fractions",
    title: "Fractions",
    description: "",
    subject: "Math",
    grade: 6,
    difficulty: 2,
    estimatedMinutes: 30,
    learningObjectives: [],
  },
  {
    id: "equivalent-fractions",
    title: "Equivalent Fractions",
    description: "",
    subject: "Math",
    grade: 6,
    difficulty: 3,
    estimatedMinutes: 30,
    learningObjectives: [],
  },
  {
    id: "percentages",
    title: "Percentages",
    description: "",
    subject: "Math",
    grade: 6,
    difficulty: 4,
    estimatedMinutes: 30,
    learningObjectives: [],
  },
];

const edges: ConceptEdge[] = [
  {
    source: "division",
    target: "fractions",
    relationship: RelationshipType.PREREQUISITE,
  },
  {
    source: "fractions",
    target: "equivalent-fractions",
    relationship: RelationshipType.PREREQUISITE,
  },
  {
    source: "equivalent-fractions",
    target: "percentages",
    relationship: RelationshipType.PREREQUISITE,
  },
];

describe("BFS", () => {
  const graph = new GraphBuilder().build(nodes, edges);
  const bfs = new BFS();

  it("visits every reachable node", () => {
    expect(bfs.traverse(graph, "division")).toEqual([
      "division",
      "fractions",
      "equivalent-fractions",
      "percentages",
    ]);
  });

  it("starts from the requested node", () => {
    expect(bfs.traverse(graph, "fractions")).toEqual([
      "fractions",
      "equivalent-fractions",
      "percentages",
    ]);
  });

  it("does not revisit nodes", () => {
    const result = bfs.traverse(graph, "division");

    expect(new Set(result).size).toBe(result.length);
  });

  it("throws for unknown nodes", () => {
    expect(() =>
      bfs.traverse(graph, "unknown"),
    ).toThrow();
  });

  it("handles a leaf node", () => {
    expect(bfs.traverse(graph, "percentages")).toEqual([
      "percentages",
    ]);
  });
});