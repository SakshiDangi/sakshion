import { describe, expect, it } from "vitest";

import { GraphBuilder } from "../src/graph";
import {
  RelationshipType,
  type ConceptEdge,
  type ConceptNode,
} from "../src/models";
import { PrerequisiteTraversal } from "../src/traversal";

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

describe("PrerequisiteTraversal", () => {
  const graph = new GraphBuilder().build(nodes, edges);
  const traversal = new PrerequisiteTraversal(graph);

  it("returns direct prerequisites", () => {
    expect(
      traversal.getPrerequisites("percentages"),
    ).toEqual(["equivalent-fractions"]);
  });

  it("returns all ancestors", () => {
    expect(
      traversal.getAncestors("percentages"),
    ).toEqual([
      "division",
      "fractions",
      "equivalent-fractions",
    ]);
  });

  it("returns descendants", () => {
    expect(
      traversal.getDescendants("fractions"),
    ).toEqual([
      "equivalent-fractions",
      "percentages",
    ]);
  });

  it("returns dependents", () => {
    expect(
      traversal.getDependents("fractions"),
    ).toEqual([
      "equivalent-fractions",
      "percentages",
    ]);
  });

  it("returns empty prerequisites for root concept", () => {
    expect(
      traversal.getPrerequisites("division"),
    ).toEqual([]);
  });

  it("returns empty descendants for leaf concept", () => {
    expect(
      traversal.getDescendants("percentages"),
    ).toEqual([]);
  });

  it("throws on unknown concept", () => {
    expect(() =>
      traversal.getPrerequisites("unknown"),
    ).toThrow();
  });
});