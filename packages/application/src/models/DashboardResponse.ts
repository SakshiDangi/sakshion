import type {
  RoadmapResponse,
} from "./RoadmapResponse";

export interface DashboardResponse {
  success: boolean;

  studentId: string;

  level: number;

  experience: number;

  mastery: number;

  roadmap: RoadmapResponse;

  verified: boolean;

  practiceCount: number;

  lastScore: number;

  learningTwin: {
    confidence: number;
    state: string;
  };
}