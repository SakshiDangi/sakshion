import type {
  DiagnosticResponse,
} from "../models";


import {
  DigitalTwinService,
} from "@sakshion/digital-twin";



export class DiagnosticService {


  runDiagnostic(
    studentId:string,
  ):DiagnosticResponse {



    const score =
      60;



    const mastery =
      score / 100;



    const twin =
      DigitalTwinService.create({

        studentId,


        assessments:
          [
            {
              conceptId:"functions",

              mastery:0.6,
            },

            {
              conceptId:"loops",

              mastery:0.5,
            },

            {
              conceptId:"algorithms",

              mastery:0.3,
            },
          ],

      });



    void twin;



    return {

      success:true,


      studentId,


      score,


      mastery,


      recommendedConcepts:
        [
          "functions",
          "loops",
          "algorithms",
        ],

    };

  }

}