import { describe, expect, it } from "vitest";

import {
  PracticeDifficulty,
  PracticeQuestionType,
} from "../src/models";

import { DifficultySelector } from "../src/generator/DifficultySelector";
import { PracticeGenerator } from "../src/generator/PracticeGenerator";
import { QuestionSelector } from "../src/generator/QuestionSelector";
import type { QuestionRepository } from "../src/generator/QuestionRepository";

class FakeRepository implements QuestionRepository {
  async findByConceptAndDifficulty(
    conceptId,
    difficulty,
  ) {
    return Array.from({ length: 5 }, (_, index) => ({
      id: `${difficulty}-${index}`,
      conceptId,
      difficulty,
      type: PracticeQuestionType.MULTIPLE_CHOICE,
      question: `Question ${index + 1}`,
      options: [
        { id: "A", text: "Option A" },
        { id: "B", text: "Option B" },
      ],
      correctAnswer: "A",
      explanation: "Explanation",
    }));
  }
}

describe("PracticeGenerator", () => {
  it("generates five questions", async () => {
    const generator = new PracticeGenerator(
      new DifficultySelector(),
      new QuestionSelector(new FakeRepository()),
    );

    const questions = await generator.generate({
      conceptId: "fractions",
      mastery: 55,
    });

    expect(questions).toHaveLength(5);
    expect(questions[0].difficulty).toBe(
      PracticeDifficulty.MEDIUM,
    );
  });

  it("supports custom question counts", async () => {
    const generator = new PracticeGenerator(
      new DifficultySelector(),
      new QuestionSelector(new FakeRepository()),
    );

    const questions = await generator.generate({
      conceptId: "fractions",
      mastery: 80,
      count: 3,
    });

    expect(questions).toHaveLength(3);
    expect(questions[0].difficulty).toBe(
      PracticeDifficulty.HARD,
    );
  });
});