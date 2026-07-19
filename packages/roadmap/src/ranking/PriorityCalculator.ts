import {
  ROADMAP_CONSTANTS
} from "../utils/constants";


export interface PriorityInput {
  mastery:number;
  confidence:number;
  difficulty:number;
}


export class PriorityCalculator {

  static calculate(
    input:PriorityInput
  ):number {

    const weights =
      ROADMAP_CONSTANTS.PRIORITY_WEIGHTS;

    const masteryScore =
      (100 - input.mastery)
      *
      weights.MASTERY;

    const confidenceScore =
      (100 - input.confidence)
      *
      weights.CONFIDENCE;

    const difficultyScore =
      input.difficulty
      *
      weights.DIFFICULTY;

    return Math.round(

      masteryScore
      +
      confidenceScore
      +
      difficultyScore

    );
  }

}