import {
  RoadmapService as CoreRoadmapService,
} from "@sakshion/roadmap";

import type {
  ConceptInput,
} from "@sakshion/roadmap";


import type {
  DigitalTwin,
} from "@sakshion/digital-twin";


import type {
  RoadmapResponse,
} from "../models";



export class RoadmapService {


  private readonly roadmapService =
    new CoreRoadmapService();



  /**
   * Generate student roadmap.
   */
  generate(
    studentId: string,

    concepts: ConceptInput[],

  ): RoadmapResponse {


    const roadmap =
      this.roadmapService.generate(
        studentId,
        concepts,
      );



    return {

      success: true,


      roadmapId:
        studentId,


      progress:
        this.calculateProgress(
          roadmap,
        ),


      nodes:
        roadmap.upcomingConcepts.map(
          (concept, index) => ({

            id:
              `${studentId}-${index}`,


            title:
              concept.conceptId,


            completed:
              false,


            unlocked:
              true,

          }),
        ),

    };

  }





  /**
   * Get existing roadmap.
   */
  getRoadmap(
    studentId: string,
  ): RoadmapResponse | null {


    const roadmap =
      this.roadmapService.get(
        studentId,
      );



    if (!roadmap) {

      return null;

    }



    return {

      success: true,


      roadmapId:
        studentId,


      progress:
        this.calculateProgress(
          roadmap,
        ),


      nodes:
        roadmap.upcomingConcepts.map(
          (concept, index) => ({

            id:
              `${studentId}-${index}`,


            title:
              concept.conceptId,


            completed:
              false,


            unlocked:
              true,

          }),
        ),

    };

  }





  /**
   * Generate roadmap using learner twin.
   */
  generateFromTwin(
    studentId: string,

    twin: DigitalTwin,

    concepts: ConceptInput[],

  ): RoadmapResponse {


    void twin;


    return this.generate(
      studentId,
      concepts,
    );

  }





  /**
   * Calculate roadmap completion.
   */
  private calculateProgress(
    roadmap: {
      completedConcepts: readonly string[];

      upcomingConcepts: readonly {
        conceptId: string;
      }[];
    },

  ): number {


    const total =
      roadmap.completedConcepts.length +
      roadmap.upcomingConcepts.length;



    if (total === 0) {

      return 0;

    }



    return Math.round(
      (
        roadmap.completedConcepts.length /
        total
      ) * 100,
    );

  }

}