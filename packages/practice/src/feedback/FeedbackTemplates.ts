import { PracticeNextAction } from "../models";

export const FeedbackTemplates = {
  excellent: {
    strengths: [
      "Excellent work. You answered every question correctly.",
      "You have demonstrated a strong understanding of this concept.",
    ],
    recommendation: "Move on to the next concept.",
    nextAction: PracticeNextAction.ADVANCE,
  },

  good: {
    strengths: [
      "Good job. Most answers were correct.",
      "You have a solid understanding with a few small gaps.",
    ],
    recommendation: "Review the incorrect questions before continuing.",
    nextAction: PracticeNextAction.CONTINUE,
  },

  fair: {
    strengths: [
      "You understand some of the concept.",
    ],
    recommendation: "Review this lesson and practice again.",
    nextAction: PracticeNextAction.RETRY,
  },

  needsImprovement: {
    strengths: [
      "Keep practicing. Learning takes time.",
    ],
    recommendation: "Study the lesson again before retrying.",
    nextAction: PracticeNextAction.REVIEW,
  },
} as const;