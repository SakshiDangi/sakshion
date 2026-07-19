import type { DiagnosticQuestion } from "../models";

export class QuestionRepository {
  private readonly questions =
    new Map<string, DiagnosticQuestion>();

  /**
   * Adds a single question.
   */
  add(question: DiagnosticQuestion): void {
    this.questions.set(
      question.id,
      question,
    );
  }

  /**
   * Adds multiple questions.
   */
  addMany(
    questions: DiagnosticQuestion[],
  ): void {
    for (const question of questions) {
      this.add(question);
    }
  }

  /**
   * Returns a question by ID.
   */
  get(
    questionId: string,
  ): DiagnosticQuestion | undefined {
    return this.questions.get(
      questionId,
    );
  }

  /**
   * Returns all questions.
   */
  getAll(): DiagnosticQuestion[] {
    return [
      ...this.questions.values(),
    ];
  }

  /**
   * Returns all questions
   * belonging to a concept.
   */
  getByConcept(
    conceptId: string,
  ): DiagnosticQuestion[] {
    return this.getAll().filter(
      (question) =>
        question.conceptId ===
        conceptId,
    );
  }

  /**
   * Returns true if the question exists.
   */
  has(
    questionId: string,
  ): boolean {
    return this.questions.has(
      questionId,
    );
  }

  /**
   * Number of stored questions.
   */
  count(): number {
    return this.questions.size;
  }

  /**
   * Removes all questions.
   */
  clear(): void {
    this.questions.clear();
  }
}