export interface PriorityInput {


  mastery:number;


  confidence:number;


  difficulty:number;


}



export class PriorityCalculator {



  static calculate(
    input:PriorityInput
  ):number {



    const masteryWeight =
      0.5;


    const confidenceWeight =
      0.25;


    const difficultyWeight =
      0.25;



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