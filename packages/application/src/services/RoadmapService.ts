import {
  RoadmapService as CoreRoadmapService,
} from "@sakshion/roadmap";

import type {
  ConceptInput,
  Roadmap,
} from "@sakshion/roadmap";

import type {
  DigitalTwin,
} from "@sakshion/digital-twin";

import {
  RoadmapRepository,
} from "@sakshion/database";

import type {
  RoadmapResponse,
} from "../models";

export class RoadmapService {

  private readonly roadmapService =
    new CoreRoadmapService();

  private readonly roadmapRepository =
    new RoadmapRepository();

  /**
   * Generate roadmap and persist it.
   */
  async generate(
    studentId: string,

    concepts: ConceptInput[],

  ): Promise<RoadmapResponse> {

    const roadmap =
      this.roadmapService.generate(
        studentId,
        concepts,
      );

    await this.saveRoadmap(
      roadmap,
    );

    return this.toResponse(
      roadmap,
    );
  }

  /**
   * Load roadmap.
   *
   * Prefer the in-memory roadmap package.
   * Fallback to database if necessary.
   */
  async getRoadmap(
    studentId: string,
  ): Promise<RoadmapResponse | null> {

    const roadmap =
      this.roadmapService.get(
        studentId,
      );

    if (roadmap) {
      return this.toResponse(
        roadmap,
      );
    }

    const databaseRoadmap =
      await this.roadmapRepository.findByStudent(
        studentId,
      );

    if (!databaseRoadmap) {
      return null;
    }

    return {

      success: true,

      roadmapId:
        studentId,

      progress: 0,

      nodes:
        databaseRoadmap.nextConceptIds.map(
          (
            conceptId,
            index,
          ) => ({

            id:
              `${studentId}-${index}`,

            title:
              conceptId,

            completed:
              false,

            unlocked:
              true,

          }),
        ),

    };
  }

  /**
   * Generate roadmap from learner twin.
   */
  async generateFromTwin(
    studentId: string,

    twin: DigitalTwin,

    concepts: ConceptInput[],

  ): Promise<RoadmapResponse> {

    void twin;

    return this.generate(
      studentId,
      concepts,
    );
  }

  /**
   * Persist roadmap.
   */
  private async saveRoadmap(
    roadmap: Roadmap,
  ): Promise<void> {

    await this.roadmapRepository.upsert({

      studentId:
        roadmap.studentId,

      currentConceptId:
        roadmap.currentConcept,

      nextConceptIds:
        roadmap.upcomingConcepts.map(
          (node) =>
            node.conceptId,
        ),

    });

  }

  /**
   * Convert roadmap into API response.
   */
  private toResponse(
    roadmap: Roadmap,
  ): RoadmapResponse {

    return {

      success: true,

      roadmapId:
        roadmap.studentId,

      progress:
        this.calculateProgress(
          roadmap,
        ),

      nodes:
        roadmap.upcomingConcepts.map(
          (
            node,
            index,
          ) => ({

            id:
              `${roadmap.studentId}-${index}`,

            title:
              node.conceptId,

            completed:
              false,

            unlocked:
              true,

          }),
        ),

    };

  }

  /**
   * Calculate completion percentage.
   */
  private calculateProgress(
    roadmap: Roadmap,
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