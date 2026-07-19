import type {
  Answer,
  AssessmentSession,
  DiagnosticQuestion,
} from "../models";

export class AssessmentSessionManager {
  private session: AssessmentSession | null =
    null;

  constructor(
    private readonly questions: DiagnosticQuestion[],
  ) {}

  /**
   * Starts a new assessment session.
   */
  start(
    studentId: string,
  ): AssessmentSession {
    const session: AssessmentSession = {
      sessionId:
        crypto.randomUUID(),

      studentId,

      questions: [
        ...this.questions,
      ],

      answers: [],

      currentQuestionIndex: 0,

      startedAt:
        new Date(),

      completedAt: null,

      isCompleted: false,
    };

    this.session = session;

    return session;
  }

  /**
   * Returns the active session.
   */
  getSession(): AssessmentSession {
    if (this.session === null) {
      throw new Error(
        "Assessment session has not been started.",
      );
    }

    return this.session;
  }

  /**
   * Returns true if a session is active.
   */
  isActive(): boolean {
    return (
      this.session !== null &&
      !this.session.isCompleted
    );
  }

  /**
   * Returns the current question.
   */
  getCurrentQuestion():
    | DiagnosticQuestion
    | undefined {
    const session =
      this.getSession();

    return session.questions[
      session.currentQuestionIndex
    ];
  }

  /**
   * Records an answer.
   */
  submitAnswer(
    answer: Answer,
  ): void {
    const session =
      this.getSession();

    if (session.isCompleted) {
      throw new Error(
        "Assessment session has already been completed.",
      );
    }

    session.answers.push(
      answer,
    );
  }

  /**
   * Moves to the next question.
   */
  nextQuestion():
    | DiagnosticQuestion
    | undefined {
    const session =
      this.getSession();

    if (
      session.currentQuestionIndex <
      session.questions.length - 1
    ) {
      session.currentQuestionIndex++;
    }

    return this.getCurrentQuestion();
  }

  /**
   * Returns assessment progress.
   */
  getProgress(): {
    answered: number;
    total: number;
  } {
    const session =
      this.getSession();

    return {
      answered:
        session.answers.length,

      total:
        session.questions.length,
    };
  }

  /**
   * Completes the assessment.
   */
  finish(): AssessmentSession {
    const session =
      this.getSession();

    session.completedAt =
      new Date();

    session.isCompleted =
      true;

    return session;
  }
}