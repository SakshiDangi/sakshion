import { describe, expect, it } from "vitest";

import { DifficultySelector } from "../src/generator/DifficultySelector";
import { PracticeDifficulty } from "../src/models";

describe("DifficultySelector", () => {
  const selector = new DifficultySelector();

  it("selects easy difficulty", () => {
    expect(selector.select(0)).toBe(PracticeDifficulty.EASY);
    expect(selector.select(39)).toBe(PracticeDifficulty.EASY);
  });

  it("selects medium difficulty", () => {
    expect(selector.select(40)).toBe(PracticeDifficulty.MEDIUM);
    expect(selector.select(69)).toBe(PracticeDifficulty.MEDIUM);
  });

  it("selects hard difficulty", () => {
    expect(selector.select(70)).toBe(PracticeDifficulty.HARD);
    expect(selector.select(100)).toBe(PracticeDifficulty.HARD);
  });

  it("throws for mastery below zero", () => {
    expect(() => selector.select(-1)).toThrow(RangeError);
  });

  it("throws for mastery above one hundred", () => {
    expect(() => selector.select(101)).toThrow(RangeError);
  });
});