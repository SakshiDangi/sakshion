import type {
  DigitalTwin
} from "../models/DigitalTwin";


export class ProgressTracker {


  /**
   * Calculate average mastery
   */
  static calculateAverageMastery(
    twin: DigitalTwin
  ): number {


    const concepts =
      Object.values(
        twin.mastery
      );


    if(concepts.length === 0){

      return 0;

    }


    const total =
      concepts.reduce(
        (sum, concept)=>
          sum + concept.mastery,
        0
      );


    return Math.round(
      total / concepts.length
    );

  }



  /**
   * Count completed concepts
   *
   * MVP rule:
   * mastery >= 80
   */
  static calculateCompletedConcepts(
    twin: DigitalTwin
  ): number {


    return Object.values(
      twin.mastery
    )
    .filter(
      concept =>
        concept.mastery >= 80
    )
    .length;


  }



  /**
   * Update statistics
   */
  static updateStatistics(
    twin:DigitalTwin
  ):DigitalTwin {


    return {


      ...twin,


      statistics:{


        ...twin.statistics,


        averageMastery:
          this.calculateAverageMastery(twin),



        completedConcepts:
          this.calculateCompletedConcepts(twin)


      },


      updatedAt:
        new Date()


    };


  }


}