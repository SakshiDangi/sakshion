export type ExplanationLevel =

  | "BEGINNER"

  | "INTERMEDIATE"

  | "ADVANCED";



export interface ExplanationInput {


  concept:string;


  mastery:number;


  confidence:number;


}



export interface Explanation {


  level:ExplanationLevel;


  content:string;


  examples:string[];


}

export class ExplanationGenerator {



  static generate(
    input:ExplanationInput
  ):Explanation {


    const level =
      this.determineLevel(
        input.mastery
      );



    return {


      level,


      content:
        this.generateContent(
          input.concept,
          level
        ),


      examples:
        this.generateExamples(
          input.concept,
          level
        )


    };


  }





  private static determineLevel(
    mastery:number
  ):ExplanationLevel {



    if(
      mastery < 40
    ){

      return "BEGINNER";

    }



    if(
      mastery < 75
    ){

      return "INTERMEDIATE";

    }



    return "ADVANCED";


  }





  private static generateContent(
    concept:string,
    level:ExplanationLevel
  ):string {



    switch(level){


      case "BEGINNER":

        return (

          `${concept} explained using ` +
          `simple steps and basic ideas.`

        );



      case "INTERMEDIATE":

        return (

          `${concept} explained with ` +
          `connections and examples.`

        );



      case "ADVANCED":

        return (

          `${concept} explained with ` +
          `deeper reasoning and edge cases.`

        );


    }


  }





  private static generateExamples(
    concept:string,
    level:ExplanationLevel
  ):string[] {



    if(
      level === "BEGINNER"
    ){

      return [

        `Basic example of ${concept}`

      ];

    }



    if(
      level === "INTERMEDIATE"
    ){

      return [

        `Practical example of ${concept}`

      ];

    }



    return [

      `Advanced application of ${concept}`

    ];


  }


}