import { describe, expect, it } from "vitest";

import { DiagnosticService } from "../src/services";
import { QuestionRepository } from "../src/question-bank";

import type {
  Answer,
  AssessmentSession,
  DiagnosticQuestion,
} from "../src/models";

describe("DiagnosticService", () => {
  function createService(): DiagnosticService {
    const repository =
      new QuestionRepository();

    return new DiagnosticService(
      repository,
    );
  }

  function answerQuestion(
    service: DiagnosticService,
    question: DiagnosticQuestion,
    response: string,
  ): void {
    const answer: Answer = {
      questionId:
        question.id,

      response,

      timeSpent: 20,

      submittedAt:
        new Date(),
    };

    service.submitAnswer(
      answer,
    );
  }

  function answerEntireAssessment(
    service: DiagnosticService,
    session: AssessmentSession,
    correct = true,
  ): void {
    for (
      let index = 0;
      index <
      session.questions.length;
      index++
    ) {
      const question =
        session.questions[index]!;

      answerQuestion(
        service,
        question,
        correct
          ? question.correctAnswer
          : "__incorrect__",
      );

      if (
        index <
        session.questions.length -
          1
      ) {
        service.nextQuestion();
      }
    }
  }

  it("creates assessment session", () => {
    const service =
      createService();

    const session =
      service.createSession(
        "student-1",
      );

    expect(
      session.studentId,
    ).toBe(
      "student-1",
    );

    expect(
      session.questions.length,
    ).toBeGreaterThan(0);

    expect(
      session.answers,
    ).toEqual([]);

    expect(
      session.currentQuestionIndex,
    ).toBe(0);

    expect(
      session.isCompleted,
    ).toBe(false);
  });

  it("returns current question", () => {
    const service =
      createService();

    const session =
      service.createSession(
        "student-1",
      );

    expect(
      service.getCurrentQuestion(),
    ).toEqual(
      session.questions[0],
    );
  });

  it("submits an answer", () => {
    const service =
      createService();

    const session =
      service.createSession(
        "student-1",
      );

    const question =
      session.questions[0]!;

    answerQuestion(
      service,
      question,
      question.correctAnswer,
    );

    expect(
      service.getProgress()
        .answered,
    ).toBe(1);
  });

  it("moves to next question", () => {
    const service =
      createService();

    const session =
      service.createSession(
        "student-1",
      );

    if (
      session.questions.length <
      2
    ) {
      return;
    }

    const next =
      service.nextQuestion();

    expect(next).toEqual(
      session.questions[1],
    );
  });

  it("returns assessment progress", () => {
    const service =
      createService();

    const session =
      service.createSession(
        "student-1",
      );

    const question =
      session.questions[0]!;

    answerQuestion(
      service,
      question,
      question.correctAnswer,
    );

    expect(
      service.getProgress(),
    ).toEqual({
      answered: 1,
      total:
        session.questions
          .length,
    });
  });

  it("completes assessment", () => {
    const service =
      createService();

    const session =
      service.createSession(
        "student-1",
      );

    answerEntireAssessment(
      service,
      session,
      true,
    );

    const result =
      service.completeAssessment();

    expect(
      result.overallScore,
    ).toBeGreaterThan(0);

    expect(
      result.conceptScores
        .length,
    ).toBeGreaterThan(0);

    expect(
      Object.keys(
        result.masteryMap,
      ).length,
    ).toBeGreaterThan(0);

    expect(
      Object.keys(
        result.confidenceMap,
      ).length,
    ).toBeGreaterThan(0);
  });

  it("identifies strong concepts", () => {
    const service =
      createService();

    const session =
      service.createSession(
        "student-1",
      );

    answerEntireAssessment(
      service,
      session,
      true,
    );

    const result =
      service.completeAssessment();

    expect(
      result
        .strongConcepts
        .length,
    ).toBeGreaterThan(0);
  });

  it("identifies weak concepts", () => {
    const service =
      createService();

    const session =
      service.createSession(
        "student-1",
      );

    answerEntireAssessment(
      service,
      session,
      false,
    );

    const result =
      service.completeAssessment();

    expect(
      result
        .weakConcepts
        .length,
    ).toBeGreaterThan(0);
  });

  it("throws when assessment is incomplete", () => {
    const service =
      createService();

    service.createSession(
      "student-1",
    );

    expect(() =>
      service.completeAssessment(),
    ).toThrow(
      "Not all questions have been answered.",
    );
  });
});