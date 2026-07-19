export class ConfidenceCalculator {


  static calculateChange(
    success:boolean
  ):number {


    if(success){

      return 5;

    }


    return -2;

  }



  static calculateNewConfidence(
    current:number,
    success:boolean
  ):number {


    const change =
      this.calculateChange(success);



    return Math.min(
      100,
      Math.max(
        0,
        current + change
      )
    );

  }


}