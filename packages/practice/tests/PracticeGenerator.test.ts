import { describe, expect, it } from "vitest";

import {
  PracticeDifficulty,
  PracticeQuestionType,
  type PracticeQuestion,
} from "../src/models";

import { DifficultySelector } from "../src/generator/DifficultySelector";
import { PracticeGenerator } from "../src/generator/PracticeGenerator";
import { QuestionSelector } from "../src/generator/QuestionSelector";
import type { QuestionRepository } from "../src/generator/QuestionRepository";

class FakeRepository implements QuestionRepository {
  async findByConceptAndDifficulty(
    conceptId: string,
    difficulty: PracticeDifficulty,
  ): Promise<readonly PracticeQuestion[]> {
    return Array.from(
      { length: 5 },
      (_, index): PracticeQuestion => ({
        id: `${difficulty}-${index + 1}`,
        conceptId,
        difficulty,
        type: PracticeQuestionType.MULTIPLE_CHOICE,
        question: `Question ${index + 1}`,
        options: [
          {
            id: "A",
            text: "Option A",
          },
          {
            id: "B",
            text: "Option B",
          },
        ],
        correctAnswer: "A",
        explanation: "Explanation",
      }),
    );
  }
}

describe("PracticeGenerator", () => {
  function createGenerator(): PracticeGenerator {
    return new PracticeGenerator(
      new DifficultySelector(),
      new QuestionSelector(new FakeRepository()),
    );
  }

  it("generates five medium questions by default", async () => {
    const generator = createGenerator();

    const questions = await generator.generate({
      conceptId: "fractions",
      mastery: 55,
    });

    expect(questions).toHaveLength(5);

    const firstQuestion = questions[0];

    if (!firstQuestion) {
      throw new Error("Expected at least one question.");
    }

    expect(firstQuestion.difficulty).toBe(
      PracticeDifficulty.MEDIUM,
    );
  });

  it("supports custom question counts", async () => {
    const generator = createGenerator();

    const questions = await generator.generate({
      conceptId: "fractions",
      mastery: 80,
      count: 3,
    });

    expect(questions).toHaveLength(3);

    const firstQuestion = questions[0];

    if (!firstQuestion) {
      throw new Error("Expected at least one question.");
    }

    expect(firstQuestion.difficulty).toBe(
      PracticeDifficulty.HARD,
    );
  });

  it("generates easy questions for low mastery", async () => {
    const generator = createGenerator();

    const questions = await generator.generate({
      conceptId: "fractions",
      mastery: 20,
    });

    const firstQuestion = questions[0];

    if (!firstQuestion) {
      throw new Error("Expected at least one question.");
    }

    expect(firstQuestion.difficulty).toBe(
      PracticeDifficulty.EASY,
    );
  });

  it("throws when mastery is below zero", async () => {
    const generator = createGenerator();

    await expect(
      generator.generate({
        conceptId: "fractions",
        mastery: -1,
      }),
    ).rejects.toThrow(RangeError);
  });

  it("throws when mastery is above one hundred", async () => {
    const generator = createGenerator();

    await expect(
      generator.generate({
        conceptId: "fractions",
        mastery: 101,
      }),
    ).rejects.toThrow(RangeError);
  });
});