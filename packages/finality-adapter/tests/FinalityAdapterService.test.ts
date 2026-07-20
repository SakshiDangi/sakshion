import {
  describe,
  expect,
  it,
} from "vitest";


import {
  FinalityAdapterService,
} from "../src/services";


import {
  LearningEventType,
} from "../src/models";


describe(
  "FinalityAdapterService",
  () => {


    it(
      "should convert learning event into verified finality envelope",
      () => {


        const service =
          new FinalityAdapterService();


        const result =
          service.createVerification({

            id:
              "practice-event-001",

            studentId:
              "student-001",

            conceptId:
              "math.fractions",

            type:
              LearningEventType.PRACTICE_COMPLETED,

            payload:
              {
                score: 95,
                attempts: 2,
              },

            timestamp:
              new Date(),

          });



        expect(
          result.envelope,
        )
        .toBeDefined();



        expect(
          result.envelope.signature,
        )
        .toBeDefined();



        expect(
          result.pipeline,
        )
        .toBeDefined();



        console.log(
          result.pipeline.verification,
        );
        
        
        expect(
          result.pipeline.verification.success,
        )
        .toBe(true);


      },
    );

  },
);