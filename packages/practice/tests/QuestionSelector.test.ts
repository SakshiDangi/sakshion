import { describe, expect, it } from "vitest";

import {
  PracticeDifficulty,
  PracticeQuestionType,
  type PracticeQuestion,
} from "../src/models";

import { QuestionSelector } from "../src/generator/QuestionSelector";
import type { QuestionRepository } from "../src/generator/QuestionRepository";

class FakeRepository implements QuestionRepository {
  constructor(
    private readonly questions: readonly PracticeQuestion[],
  ) {}

  async findByConceptAndDifficulty() {
    return this.questions;
  }
}

function createQuestion(id: string): PracticeQuestion {
  return {
    id,
    conceptId: "fractions",
    difficulty: PracticeDifficulty.EASY,
    type: PracticeQuestionType.MULTIPLE_CHOICE,
    question: `Question ${id}`,
    options: [
      { id: "A", text: "A" },
      { id: "B", text: "B" },
    ],
    correctAnswer: "A",
    explanation: "Explanation",
  };
}

describe("QuestionSelector", () => {
  it("returns the requested number of questions", async () => {
    const selector = new QuestionSelector(
      new FakeRepository([
        createQuestion("1"),
        createQuestion("2"),
        createQuestion("3"),
        createQuestion("4"),
        createQuestion("5"),
      ]),
    );

    const result = await selector.select(
      "fractions",
      PracticeDifficulty.EASY,
    );

    expect(result).toHaveLength(5);
  });

  it("removes duplicate questions", async () => {
    const selector = new QuestionSelector(
      new FakeRepository([
        createQuestion("1"),
        createQuestion("2"),
        createQuestion("2"),
        createQuestion("3"),
        createQuestion("4"),
        createQuestion("5"),
      ]),
    );

    const result = await selector.select(
      "fractions",
      PracticeDifficulty.EASY,
    );

    expect(result).toHaveLength(5);
  });

  it("throws when there are not enough questions", async () => {
    const selector = new QuestionSelector(
      new FakeRepository([
        createQuestion("1"),
        createQuestion("2"),
      ]),
    );

    await expect(
      selector.select(
        "fractions",
        PracticeDifficulty.EASY,
      ),
    ).rejects.toThrow();
  });
});