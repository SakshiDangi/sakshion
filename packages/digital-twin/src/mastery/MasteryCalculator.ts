export class MasteryCalculator {


  static calculateIncrease(
    score:number
  ):number {


    if(score >= 0.9) {

      return 10;

    }


    if(score >= 0.7) {

      return 6;

    }


    if(score >= 0.5) {

      return 3;

    }


    return 0;

  }



  static calculateNewMastery(
    current:number,
    score:number
  ):number {


    const increase =
      this.calculateIncrease(score);


    return Math.min(
      100,
      Math.max(
        0,
        current + increase
      )
    );

  }


}