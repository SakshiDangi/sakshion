import type { DigitalTwin } from "../models/DigitalTwin";


export interface InitialConceptAssessment {

  conceptId:string;

  mastery:number;

}



export interface TwinCreationInput {

  studentId:string;

  assessments:InitialConceptAssessment[];

}



/**
 * Immutable Digital Twin operations
 */
export class TwinState {


  /**
   * Create a new twin with updated values
   *
   * Original twin remains unchanged
   */
  static update(
    twin:DigitalTwin,
    changes:Partial<DigitalTwin>
  ):DigitalTwin {


    return {

      ...twin,

      ...changes,

      updatedAt:new Date()

    };


  }



  /**
   * Update learning state
   */
  static updateLearningState(
    twin:DigitalTwin,
    state:Partial<DigitalTwin["learningState"]>
  ):DigitalTwin {


    return {


      ...twin,


      learningState:{


        ...twin.learningState,


        ...state,


        lastUpdated:new Date()


      },


      updatedAt:new Date()


    };


  }



  /**
   * Add history snapshot
   */
  static addSnapshot(
    twin:DigitalTwin,
    snapshot:DigitalTwin["history"][number]
  ):DigitalTwin {


    return {


      ...twin,


      history:[

        ...twin.history,

        snapshot

      ],


      updatedAt:new Date()


    };


  }


}