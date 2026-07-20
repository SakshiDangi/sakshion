export interface PracticeFeedback {
  strengths: readonly string[];
  mistakes: readonly string[];
  recommendations: readonly string[];
  nextAction: string;
}