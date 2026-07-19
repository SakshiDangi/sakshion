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
      masteryWeight;

    const confidenceScore =
      (100 - input.confidence)
      *
      confidenceWeight;

    const difficultyScore =
      input.difficulty
      *
      difficultyWeight;

    return Math.round(

      masteryScore
      +
      confidenceScore
      +
      difficultyScore

    );


  }


}