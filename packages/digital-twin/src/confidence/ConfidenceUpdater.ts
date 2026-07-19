import type {
  DigitalTwin
} from "../models/DigitalTwin";


import {
  ConfidenceCalculator
} from "./ConfidenceCalculator";



export class ConfidenceUpdater {



  static updateConcept(
    twin:DigitalTwin,
    conceptId:string,
    success:boolean
  ):DigitalTwin {



    const current =
      twin.confidence[conceptId] ??
      {


        conceptId,


        confidence:0,


        evidenceCount:0,


        lastUpdated:new Date()


      };



    const newConfidence =
      ConfidenceCalculator.calculateNewConfidence(
        current.confidence,
        success
      );



    return {


      ...twin,


      confidence:{


        ...twin.confidence,


        [conceptId]:{


          ...current,


          confidence:
            newConfidence,


          evidenceCount:
            current.evidenceCount + 1,


          lastUpdated:
            new Date()

        }


      },


      updatedAt:
        new Date()


    };


  }


}