import type { DiagnosticQuestion } from "../models";

import { QuestionRepository } from "./QuestionRepository";

export class QuestionSelector {
  constructor(
    private readonly repository: QuestionRepository,
  ) {}

  /**
   * Selects questions for a diagnostic assessment.
   *
   * Strategy:
   * - Group by concept
   * - Sort by difficulty
   * - Take up to two questions per concept
   * - Stop when reaching the requested limit
   */
  select(
    limit = 20,
  ): DiagnosticQuestion[] {
    const grouped =
      new Map<string, DiagnosticQuestion[]>();

    for (const question of this.repository.getAll()) {
      const questions =
        grouped.get(question.conceptId) ?? [];

      questions.push(question);

      grouped.set(
        question.conceptId,
        questions,
      );
    }

    const selected: DiagnosticQuestion[] = [];

    for (const questions of grouped.values()) {
      questions.sort(
        (a, b) =>
          a.difficulty - b.difficulty,
      );

      selected.push(
        ...questions.slice(0, 2),
      );

      if (selected.length >= limit) {
        break;
      }
    }

    return selected.slice(0, limit);
  }

  /**
   * Returns questions for one concept.
   */
  selectByConcept(
    conceptId: string,
  ): DiagnosticQuestion[] {
    return this.repository.getByConcept(
      conceptId,
    );
  }

  /**
   * Returns every stored question.
   */
  selectAll(): DiagnosticQuestion[] {
    return this.repository.getAll();
  }
}