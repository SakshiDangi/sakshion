import type { Answer } from "./Answer";
import type { DiagnosticQuestion } from "./DiagnosticQuestion";

export interface AssessmentSession {
  /**
   * Unique assessment session.
   */
  sessionId: string;

  /**
   * Student taking the assessment.
   */
  studentId: string;

  /**
   * Questions selected for this session.
   */
  questions: DiagnosticQuestion[];

  /**
   * Answers submitted so far.
   */
  answers: Answer[];

  /**
   * Index of the current question.
   */
  currentQuestionIndex: number;

  /**
   * Assessment start time.
   */
  startedAt: Date;

  /**
   * Completion time.
   *
   * Null until finished.
   */
  completedAt: Date | null;

  /**
   * Whether the assessment
   * is still active.
   */
  isCompleted: boolean;
}