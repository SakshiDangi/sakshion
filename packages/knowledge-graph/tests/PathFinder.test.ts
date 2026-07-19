import { describe, expect, it } from "vitest";

import { GraphBuilder } from "../src/graph";
import {
  RelationshipType,
  type ConceptEdge,
  type ConceptNode,
} from "../src/models";
import { PathFinder } from "../src/traversal";

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

describe("PathFinder", () => {
  const graph = new GraphBuilder().build(nodes, edges);
  const finder = new PathFinder(graph);

  it("builds a learning sequence", () => {
    expect(
      finder.findLearningSequence("percentages"),
    ).toEqual([
      "division",
      "fractions",
      "equivalent-fractions",
      "percentages",
    ]);
  });

  it("includes the target concept", () => {
    const sequence =
      finder.findLearningSequence("percentages");

    expect(sequence.at(-1)).toBe("percentages");
  });

  it("returns root concept correctly", () => {
    expect(
      finder.findLearningSequence("division"),
    ).toEqual(["division"]);
  });

  it("creates a LearningPath", () => {
    const path = finder.findPath(
      "fractions",
      "percentages",
    );

    expect(path.currentConcept?.id).toBe("fractions");

    expect(path.nextConcepts.map((c) => c.id)).toEqual([
      "division",
      "fractions",
      "equivalent-fractions",
      "percentages",
    ]);
  });

  it("supports null current concept", () => {
    const path = finder.findPath(
      null,
      "percentages",
    );

    expect(path.currentConcept).toBeNull();
  });

  it("throws on unknown target", () => {
    expect(() =>
      finder.findPath(null, "unknown"),
    ).toThrow();
  });
});