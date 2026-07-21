import {
  StudentRepository,
  PracticeRepository,
  MasteryRepository,
  RoadmapRepository,
  LearningEventRepository,
} from "@sakshion/database";


import type {
  DashboardData,
} from "./types";



/**
 * Loads every piece of data required
 * by the student dashboard.
 *
 * No business logic belongs here.
 */
export class DashboardQueries {


  constructor(

    private readonly studentRepository:
      StudentRepository,


    private readonly practiceRepository:
      PracticeRepository,


    private readonly masteryRepository:
      MasteryRepository,


    private readonly roadmapRepository:
      RoadmapRepository,


    private readonly learningEventRepository:
      LearningEventRepository,

  ) {}



  /**
   * Load dashboard data.
   */
  async load(
    studentId: string,
  ): Promise<DashboardData> {


    const [

      student,

      practices,

      mastery,

      roadmap,

      learningEvents,

    ] = await Promise.all([


      this.studentRepository.findById(
        studentId,
      ),


      this.practiceRepository.findByStudent(
        studentId,
      ),


      this.masteryRepository.findByStudent(
        studentId,
      ),


      this.roadmapRepository.findByStudent(
        studentId,
      ),


      this.learningEventRepository.findByStudent(
        studentId,
      ),


    ]);



    /**
     * Dashboard requires
     * a valid student.
     */
    if (!student) {

      throw new Error(
        `Student not found: ${studentId}`,
      );

    }



    return {

      student,
    
      practices,
    
      mastery,
    
      roadmap:
        roadmap ?? {
    
          updatedAt:
            new Date(),
    
          studentId,
    
          currentConceptId:
            null,
    
          nextConceptIds:
            [],
    
        },
    
    
      learningEvents,
    
    };
  }

}