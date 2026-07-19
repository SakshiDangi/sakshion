import { describe, expect, it } from "vitest";

import { GraphBuilder } from "../src/graph";
import {
  RelationshipType,
  type ConceptEdge,
  type ConceptNode,
} from "../src/models";
import { DFS } from "../src/traversal";

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

describe("DFS", () => {
  const graph = new GraphBuilder().build(nodes, edges);
  const dfs = new DFS();

  it("visits every reachable node", () => {
    expect(dfs.traverse(graph, "division")).toEqual([
      "division",
      "fractions",
      "equivalent-fractions",
      "percentages",
    ]);
  });

  it("starts from the requested node", () => {
    expect(dfs.traverse(graph, "fractions")).toEqual([
      "fractions",
      "equivalent-fractions",
      "percentages",
    ]);
  });

  it("does not revisit nodes", () => {
    const result = dfs.traverse(graph, "division");

    expect(new Set(result).size).toBe(result.length);
  });

  it("throws for unknown nodes", () => {
    expect(() =>
      dfs.traverse(graph, "unknown"),
    ).toThrow();
  });

  it("handles a leaf node", () => {
    expect(dfs.traverse(graph, "percentages")).toEqual([
      "percentages",
    ]);
  });
});