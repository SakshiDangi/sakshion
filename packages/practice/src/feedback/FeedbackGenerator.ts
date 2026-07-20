import type { PracticeFeedback } from "../models";

import type { PracticeEvaluation } from "../evaluator/PracticeEvaluation";
import { FeedbackTemplates } from "./FeedbackTemplates";

/**
 * Generates learner feedback from a practice evaluation.
 */
export class FeedbackGenerator {
  /**
   * Generate learner feedback.
   */
  generate(
    evaluation: PracticeEvaluation,
  ): PracticeFeedback {
    if (evaluation.score === 100) {
      return {
        strengths:
          FeedbackTemplates.excellent.strengths,

        mistakes: [],

        recommendations: [
          FeedbackTemplates.excellent.recommendation,
        ],

        nextAction:
          FeedbackTemplates.excellent.nextAction,
      };
    }

    if (evaluation.score >= 80) {
      return {
        strengths:
          FeedbackTemplates.good.strengths,

        mistakes: evaluation.weakQuestionIds.map(
          id => `Review question "${id}".`,
        ),

        recommendations: [
          FeedbackTemplates.good.recommendation,
        ],

        nextAction:
          FeedbackTemplates.good.nextAction,
      };
    }

    if (evaluation.score >= 40) {
      return {
        strengths:
          FeedbackTemplates.fair.strengths,

        mistakes: evaluation.weakQuestionIds.map(
          id => `Review question "${id}".`,
        ),

        recommendations: [
          FeedbackTemplates.fair.recommendation,
        ],

        nextAction:
          FeedbackTemplates.fair.nextAction,
      };
    }

    return {
      strengths:
        FeedbackTemplates.needsImprovement.strengths,

      mistakes: evaluation.weakQuestionIds.map(
        id => `Review question "${id}".`,
      ),

      recommendations: [
        FeedbackTemplates.needsImprovement.recommendation,
      ],

      nextAction:
        FeedbackTemplates.needsImprovement.nextAction,
    };
  }
}