import type {
  QuestionRepository,
  PracticeQuestion,
  PracticeDifficulty,
} from "@sakshion/practice";

import {
  PracticeDifficulty as Difficulty,
  PracticeQuestionType,
} from "@sakshion/practice";


export class InMemoryQuestionRepository
  implements QuestionRepository
{


  private readonly questions:
    PracticeQuestion[] =
    [

      {
        id:
          "functions-1",

        conceptId:
          "functions",

        difficulty:
          Difficulty.EASY,

        type:
          PracticeQuestionType.MULTIPLE_CHOICE,

        question:
          "What is a function?",

        options:
          [
            {
              id:"a",
              text:"A reusable block of code",
            },

            {
              id:"b",
              text:"A database table",
            },

            {
              id:"c",
              text:"A loop statement",
            },

            {
              id:"d",
              text:"A variable",
            },
          ],


        correctAnswer:
          "a",


        explanation:
          "Functions allow developers to reuse logic by grouping instructions together.",

      },


      {
        id:
          "functions-2",

        conceptId:
          "functions",

        difficulty:
          Difficulty.EASY,

        type:
          PracticeQuestionType.MULTIPLE_CHOICE,


        question:
          "Which keyword is used to declare a function in JavaScript?",


        options:
          [
            {
              id:"a",
              text:"function",
            },

            {
              id:"b",
              text:"method",
            },

            {
              id:"c",
              text:"define",
            },

            {
              id:"d",
              text:"create",
            },
          ],


        correctAnswer:
          "a",


        explanation:
          "JavaScript uses the function keyword to declare functions.",

      },


      {
        id:
          "functions-3",

        conceptId:
          "functions",

        difficulty:
          Difficulty.EASY,


        type:
          PracticeQuestionType.MULTIPLE_CHOICE,


        question:
          "What is the main benefit of using functions?",


        options:
          [
            {
              id:"a",
              text:"Code reuse",
            },

            {
              id:"b",
              text:"More errors",
            },

            {
              id:"c",
              text:"Removing variables",
            },

            {
              id:"d",
              text:"Avoiding programming",
            },
          ],


        correctAnswer:
          "a",


        explanation:
          "Functions reduce duplication and improve maintainability.",

      },

    ];



  async findByConceptAndDifficulty(
    conceptId:string,

    difficulty:PracticeDifficulty,

  ):Promise<readonly PracticeQuestion[]> {


    return this.questions.filter(

      (question)=>

        question.conceptId === conceptId &&

        question.difficulty === difficulty,

    );

  }

}