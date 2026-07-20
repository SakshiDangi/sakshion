import { describe, expect, it } from "vitest";

import { PracticeMasteryCalculator } from "../src/mastery/PracticeMasteryCalculator";

describe("PracticeMasteryCalculator", () => {
  function createCalculator() {
    return new PracticeMasteryCalculator();
  }

  it("adds 10 mastery for a perfect score", () => {
    const calculator = createCalculator();

    const result = calculator.calculate({
      mastery: 50,
      confidence: 40,
      score: 100,
    });

    expect(result.masteryBefore).toBe(50);
    expect(result.masteryAfter).toBe(60);

    expect(result.confidenceBefore).toBe(40);
    expect(result.confidenceAfter).toBe(45);

    expect(result.masteryDelta).toBe(10);
    expect(result.confidenceDelta).toBe(5);
  });

  it("adds 7 mastery for scores between 80 and 99", () => {
    const calculator = createCalculator();

    const result = calculator.calculate({
      mastery: 50,
      confidence: 40,
      score: 80,
    });

    expect(result.masteryAfter).toBe(57);
    expect(result.confidenceAfter).toBe(44);
    expect(result.masteryDelta).toBe(7);
    expect(result.confidenceDelta).toBe(4);
  });

  it("adds 4 mastery for scores between 60 and 79", () => {
    const calculator = createCalculator();

    const result = calculator.calculate({
      mastery: 50,
      confidence: 40,
      score: 60,
    });

    expect(result.masteryAfter).toBe(54);
    expect(result.confidenceAfter).toBe(43);
    expect(result.masteryDelta).toBe(4);
    expect(result.confidenceDelta).toBe(3);
  });

  it("adds 1 mastery for scores between 40 and 59", () => {
    const calculator = createCalculator();

    const result = calculator.calculate({
      mastery: 50,
      confidence: 40,
      score: 40,
    });

    expect(result.masteryAfter).toBe(51);
    expect(result.confidenceAfter).toBe(42);
    expect(result.masteryDelta).toBe(1);
    expect(result.confidenceDelta).toBe(2);
  });

  it("does not increase mastery below 40 percent", () => {
    const calculator = createCalculator();

    const result = calculator.calculate({
      mastery: 50,
      confidence: 40,
      score: 20,
    });

    expect(result.masteryAfter).toBe(50);
    expect(result.confidenceAfter).toBe(41);
    expect(result.masteryDelta).toBe(0);
    expect(result.confidenceDelta).toBe(1);
  });

  it("clamps mastery to 100", () => {
    const calculator = createCalculator();

    const result = calculator.calculate({
      mastery: 98,
      confidence: 40,
      score: 100,
    });

    expect(result.masteryAfter).toBe(100);
    expect(result.masteryDelta).toBe(10);
  });

  it("clamps confidence to 100", () => {
    const calculator = createCalculator();

    const result = calculator.calculate({
      mastery: 80,
      confidence: 98,
      score: 100,
    });

    expect(result.confidenceAfter).toBe(100);
    expect(result.confidenceDelta).toBe(5);
  });

  it("keeps mastery unchanged when already at 100", () => {
    const calculator = createCalculator();

    const result = calculator.calculate({
      mastery: 100,
      confidence: 80,
      score: 100,
    });

    expect(result.masteryAfter).toBe(100);
  });

  it("keeps confidence unchanged when already at 100", () => {
    const calculator = createCalculator();

    const result = calculator.calculate({
      mastery: 70,
      confidence: 100,
      score: 100,
    });

    expect(result.confidenceAfter).toBe(100);
  });

  it("throws when score is less than 0", () => {
    const calculator = createCalculator();

    expect(() =>
      calculator.calculate({
        mastery: 50,
        confidence: 40,
        score: -1,
      }),
    ).toThrow();
  });

  it("throws when score is greater than 100", () => {
    const calculator = createCalculator();

    expect(() =>
      calculator.calculate({
        mastery: 50,
        confidence: 40,
        score: 101,
      }),
    ).toThrow();
  });

  it("throws when mastery is outside the valid range", () => {
    const calculator = createCalculator();

    expect(() =>
      calculator.calculate({
        mastery: 101,
        confidence: 40,
        score: 80,
      }),
    ).toThrow();
  });

  it("throws when confidence is outside the valid range", () => {
    const calculator = createCalculator();

    expect(() =>
      calculator.calculate({
        mastery: 50,
        confidence: -1,
        score: 80,
      }),
    ).toThrow();
  });
});