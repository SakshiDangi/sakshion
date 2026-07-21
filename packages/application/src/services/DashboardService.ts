import {
  StudentRepository,
  MasteryRepository,
  PracticeRepository,
  LearningEventRepository,
} from "@sakshion/database";

import {
  RoadmapService,
} from "./RoadmapService";

import type {
  DashboardResponse,
} from "../models";

export class DashboardService {

  private readonly students =
    new StudentRepository();

  private readonly mastery =
    new MasteryRepository();

  private readonly practice =
    new PracticeRepository();

  private readonly learningEvents =
    new LearningEventRepository();

  private readonly roadmapService =
    new RoadmapService();

  async getDashboard(
    studentId: string,
  ): Promise<DashboardResponse> {

    /**
     * Validate student.
     */
    const student =
      await this.students.findById(
        studentId,
      );

    if (!student) {
      throw new Error(
        "Student not found",
      );
    }

    /**
     * Load dashboard resources.
     */
    const [
      masteryRecords,
      practiceAttempts,
      learningEvents,
      roadmap,
    ] = await Promise.all([

      this.mastery.findByStudent(
        studentId,
      ),

      this.practice.findByStudent(
        studentId,
      ),

      this.learningEvents.findByStudent(
        studentId,
      ),

      this.roadmapService.getRoadmap(
        studentId,
      ),

    ]);

    /**
     * Average mastery.
     */
    const mastery =
      masteryRecords.length === 0
        ? 0
        : Math.round(

            masteryRecords.reduce(
              (
                total,
                record,
              ) =>
                total +
                record.mastery,

              0,
            ) /
            masteryRecords.length,

          );

    /**
     * Average confidence.
     */
    const confidence =
      masteryRecords.length === 0
        ? 0
        : Math.round(

            masteryRecords.reduce(
              (
                total,
                record,
              ) =>
                total +
                record.confidence,

              0,
            ) /
            masteryRecords.length,

          );

    /**
     * Practice statistics.
     */
    const practiceCount =
      practiceAttempts.length;

    const lastScore =
      practiceAttempts[0]?.score
      ?? 0;

    /**
     * Experience.
     */
    const experience =
      practiceAttempts.reduce(
        (
          total,
          attempt,
        ) =>
          total +
          attempt.score,

        0,
      );

    /**
     * Student level.
     */
    const level =
      Math.max(
        1,
        Math.floor(
          experience / 100,
        ) + 1,
      );

    /**
     * Verification status.
     */
    const verified =
      learningEvents.length === 0
        ? false
        : learningEvents.every(
            (
              event,
            ) =>
              event.verified,
          );

    /**
     * Dashboard response.
     */
    return {

      success: true,

      studentId,

      level,

      experience,

      mastery,

      verified,

      practiceCount,

      lastScore,

      roadmap:
        roadmap
        ??
        {

          success: true,

          roadmapId:
            studentId,

          progress: 0,

          nodes: [],

        },

      learningTwin: {

        confidence,

        state:
          verified
            ? "Learning normally"
            : "Verification pending",

      },

    };

  }

}