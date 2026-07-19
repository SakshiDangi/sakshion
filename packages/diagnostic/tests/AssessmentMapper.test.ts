import { describe, expect, it } from "vitest";

import { AssessmentMapper } from "../src/mapper";

import type {
  ConceptScore,
} from "../src/models";

describe("AssessmentMapper", () => {
  const mapper =
    new AssessmentMapper();

  it("maps assessment result", () => {
    const conceptScores: ConceptScore[] = [
      {
        conceptId: "fractions",

        correct: 4,

        incorrect: 1,

        score: 80,

        mastery: 75,
      },

      {
        conceptId: "division",

        correct: 1,

        incorrect: 3,

        score: 25,

        mastery: 35,
      },
    ];

    const confidence =
      new Map<string, number>([
        [
          "fractions",
          90,
        ],

        [
          "division",
          60,
        ],
      ]);

    const result =
      mapper.map(
        conceptScores,
        confidence,
      );

    expect(
      result.overallScore,
    ).toBe(52.5);

    expect(
      result.conceptScores,
    ).toEqual(
      conceptScores,
    );

    expect(
      result.strongConcepts,
    ).toEqual([
      "fractions",
    ]);

    expect(
      result.weakConcepts,
    ).toEqual([
      "division",
    ]);

    expect(
      result.masteryMap,
    ).toEqual({
      fractions: 75,
      division: 35,
    });

    expect(
      result.confidenceMap,
    ).toEqual({
      fractions: 90,
      division: 60,
    });
  });

  it("returns empty maps for empty assessment", () => {
    const result =
      mapper.map(
        [],
        new Map(),
      );

    expect(
      result.overallScore,
    ).toBe(0);

    expect(
      result.conceptScores,
    ).toEqual([]);

    expect(
      result.strongConcepts,
    ).toEqual([]);

    expect(
      result.weakConcepts,
    ).toEqual([]);

    expect(
      result.masteryMap,
    ).toEqual({});

    expect(
      result.confidenceMap,
    ).toEqual({});
  });

  it("uses zero confidence when missing", () => {
    const conceptScores: ConceptScore[] = [
      {
        conceptId: "algebra",

        correct: 2,

        incorrect: 2,

        score: 50,

        mastery: 55,
      },
    ];

    const result =
      mapper.map(
        conceptScores,
        new Map(),
      );

    expect(
      result.masteryMap,
    ).toEqual({
      algebra: 55,
    });

    expect(
      result.confidenceMap,
    ).toEqual({
      algebra: 0,
    });
  });
});