import {
  MasteryRepository,
} from "@sakshion/database";


import {
  DigitalTwinService,
} from "@sakshion/digital-twin";


import {
  RoadmapService,
} from "./RoadmapService";


import type {
  DiagnosticResponse,
} from "../models";


import type {
  ConceptInput,
} from "@sakshion/roadmap";



export class DiagnosticService {


  private readonly masteryRepository =
    new MasteryRepository();


  private readonly roadmapService =
    new RoadmapService();



  async runDiagnostic(
    studentId: string,
  ): Promise<DiagnosticResponse> {


    /**
     * Load mastery data
     * from database.
     */
    const masteryRecords =
      await this.masteryRepository.findByStudent(
        studentId,
      );



    /**
     * New student
     * without mastery history.
     */
    if (
      masteryRecords.length === 0
    ) {

      return {

        success: true,

        studentId,

        score: 0,

        mastery: 0,

        recommendedConcepts: [],

      };

    }



    /**
     * Calculate average mastery.
     */
    const averageMastery =
      masteryRecords.reduce(
        (
          total,
          record,
        ) =>
          total + record.mastery,

        0,

      )
      /
      masteryRecords.length;



    const score =
      Math.round(
        averageMastery,
      );



    /**
     * Find weakest concepts.
     *
     * Lower mastery
     * gets higher priority.
     */
    const weakConcepts =
      masteryRecords
      .filter(
        record =>
          record.mastery < 70,
      )
      .sort(
        (
          a,
          b,
        ) =>
          a.mastery -
          b.mastery,
      );



    /**
     * Create student's
     * Digital Twin.
     */
    const twin =
      DigitalTwinService.create({

        studentId,


        assessments:

          masteryRecords.map(
            record => ({

              conceptId:
                record.conceptId,


              mastery:
                record.mastery / 100,

            }),
          ),

      });



    /**
     * Convert weak concepts
     * into roadmap planner input.
     */
    const concepts:
      ConceptInput[] =

      weakConcepts.map(
        record => ({

          conceptId:
            record.conceptId,


          mastery:
            record.mastery,


          /**
           * Temporary estimate.
           * Later replace with
           * DifficultyEstimator.
           */
          estimatedMinutes:
            Math.round(
              60 -
              (
                record.mastery *
                0.3
              ),
            ),

        }),
      );



    /**
     * Generate personalized
     * roadmap from weaknesses.
     */
    await this.roadmapService.generateFromTwin(

      studentId,

      twin,

      concepts,

    );



    /**
     * Return diagnostic result.
     */
    return {

      success: true,


      studentId,


      score,


      mastery:
        averageMastery / 100,


      recommendedConcepts:

        weakConcepts.map(
          record =>
            record.conceptId,
        ),

    };


  }

}