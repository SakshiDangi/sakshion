import {
  RoadmapService,
} from "./RoadmapService";


import type {
  DashboardResponse,
} from "../models";



export class DashboardService {


  private readonly roadmapService =
    new RoadmapService();




  getDashboard(
    studentId:string,
  ):DashboardResponse {



    const roadmap =
      this.roadmapService.getRoadmap(
        studentId,
      )
      ??
      {

        success:true,

        roadmapId:
          studentId,

        progress:0,

        nodes:[],

      };




    return {
  success: true,

  studentId,

  level: 2,

  experience: 120,

  mastery: 78,

  verified: true,

  practiceCount: 5,

  lastScore: 92,

  roadmap,

  learningTwin: {
    confidence: 88,
    state: "Learning normally",
  },
};

}
}