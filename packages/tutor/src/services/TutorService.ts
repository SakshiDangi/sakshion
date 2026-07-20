import type {
  TutorRequest
} from "../models/TutorRequest";

import type {
  TutorResponse
} from "../models/TutorResponse";

import {
  TutorSessionManager
} from "../session/TutorSessionManager";

import {
  ContextBuilder
} from "../context/ContextBuilder";

import {
  buildLessonPrompt
} from "../prompts/LessonPrompt";

import {
  OpenAIAdapter
} from "../llm/OpenAIAdapter";

import {
  ExplanationGenerator
} from "../explanation/ExplanationGenerator";

import {
  LessonGenerator
} from "../lesson/LessonGenerator";

import {
  ResponseValidator
} from "../validation/ResponseValidator";



export interface StartLessonInput {

  request: TutorRequest;

  conceptName: string;

  prerequisites: string[];

  mastery: number;

  confidence: number;

  completedConcepts: string[];

  learningGoal: string;

}



export class TutorService {

  private readonly llm = new OpenAIAdapter();

  private readonly sessions = new TutorSessionManager();



  async startLesson(

    input: StartLessonInput

  ): Promise<TutorResponse> {

    //--------------------------------------------------
    // Create Session
    //--------------------------------------------------

    const session = this.sessions.create({

      studentId: input.request.studentId,

      conceptId: input.request.conceptId

    });



    //--------------------------------------------------
    // Build Context
    //--------------------------------------------------

    const context = ContextBuilder.build({

      studentId: input.request.studentId,

      conceptId: input.request.conceptId,

      conceptName: input.conceptName,

      prerequisites: input.prerequisites,

      mastery: input.mastery,

      confidence: input.confidence,

      completedConcepts: input.completedConcepts,

      learningGoal: input.learningGoal,

      studentQuestion: input.request.message

    });



    //--------------------------------------------------
    // Prompt
    //--------------------------------------------------

    const prompt = buildLessonPrompt(context);



    //--------------------------------------------------
    // LLM
    //--------------------------------------------------

    const ai = await this.llm.generate({

      prompt

    });



    //--------------------------------------------------
    // Explanation
    //--------------------------------------------------

    const explanation = ExplanationGenerator.generate({

      concept: context.currentConcept,

      mastery: context.mastery,

      confidence: context.confidence

    });



    //--------------------------------------------------
    // Lesson
    //--------------------------------------------------

    const lesson = LessonGenerator.generate({

      title: context.currentConcept,

      objective: context.learningGoal,

      content: ai.content,

      examples: explanation.examples,

      commonMistakes: [],

      summary: explanation.content

    });



    //--------------------------------------------------
    // Response
    //--------------------------------------------------

    const response: TutorResponse = {

      lesson,

      examples: lesson.examples,

      hint: null,

      summary: lesson.summary,

      nextAction: "START_PRACTICE"

    };



    //--------------------------------------------------
    // Validation
    //--------------------------------------------------

    const validation = ResponseValidator.validate(

      response

    );



    if (!validation.valid) {

      throw new Error(

        validation.errors.join("\n")

      );

    }



    //--------------------------------------------------
    // Complete Session
    //--------------------------------------------------

    this.sessions.complete(

      session.sessionId

    );



    return response;

  }

}