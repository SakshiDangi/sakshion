import { diagnosticQuestions } from "./data/diagnosticQuestions";

import { QuestionRepository } from "./QuestionRepository";

export class QuestionLoader {
  constructor(
    private readonly repository: QuestionRepository,
  ) {}

  /**
   * Loads the default diagnostic
   * question bank.
   */
  load(): void {
    this.repository.clear();

    this.repository.addMany(
      diagnosticQuestions,
    );
  }

  /**
   * Reloads the default question bank.
   */
  reload(): void {
    this.load();
  }
}