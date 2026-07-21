import {
  LearningService,
  VerificationService,
  PracticeService,
  RoadmapService,
  DiagnosticService,
  TutorService,
  DashboardService,
} from "@sakshion/application";


import {
  PracticeService as CorePracticeService,
  PracticeGenerator,
  QuestionSelector,
  DifficultySelector,
  PracticeSessionManager,
} from "@sakshion/practice";


import {
  InMemoryQuestionRepository,
} from "./practice-repository";

import {
  PracticeRepository,
  MasteryRepository,
  LearningEventRepository,
} from "@sakshion/database";



const questionRepository =
  new InMemoryQuestionRepository();



const questionSelector =
  new QuestionSelector(
    questionRepository,
  );



const practiceGenerator =
  new PracticeGenerator(
    new DifficultySelector(),
    questionSelector,
  );



export const practiceSessionManager =
  new PracticeSessionManager();

const corePracticeService =
  new CorePracticeService(
    practiceGenerator,
    practiceSessionManager,
  );



export const learningService =
  new LearningService();



export const verificationService =
  new VerificationService();



export const practiceService =
  new PracticeService(
    corePracticeService,
  );



export const roadmapService =
  new RoadmapService();



export const diagnosticService =
  new DiagnosticService();



export const tutorService =
  new TutorService();

export const dashboardService =
  new DashboardService();

export const practiceRepository =
  new PracticeRepository();

export const masteryRepository =
  new MasteryRepository();

export const learningEventRepository =
  new LearningEventRepository();