import type {
  Hint
} from "../models/Hint";



export interface HintInput {


  concept:string;


  question:string;


  level:1 | 2 | 3;


}





export class HintGenerator {



  static generate(
    input:HintInput
  ):Hint {



    return {


      level:
        input.level,


      message:
        this.createHint(
          input
        )


    };


  }





  private static createHint(
    input:HintInput
  ):string {



    switch(
      input.level
    ){



      case 1:

        return (

          `Think about the main idea ` +
          `behind ${input.concept}.`

        );



      case 2:

        return (

          `Look at the relationship ` +
          `between the parts of ${input.concept}.`

        );



      case 3:

        return (

          `Use what you know about ` +
          `${input.concept} to solve ` +
          `the problem step by step.`

        );



    }


  }


}