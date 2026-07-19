export interface DifficultyInput {


  currentMastery:number;


  conceptDifficulty:number;


}



export class DifficultyRanker {



  static isSuitable(
    input:DifficultyInput
  ):boolean {


    const gap =
      input.conceptDifficulty -
      input.currentMastery;



    return gap <= 30;


  }



  static calculateDifficultyScore(
    input:DifficultyInput
  ):number {


    const difference =
      Math.abs(
        input.currentMastery -
        input.conceptDifficulty
      );



    if(
      difference <= 10
    ){

      return 100;

    }



    if(
      difference <= 30
    ){

      return 70;

    }



    return 30;


  }


}