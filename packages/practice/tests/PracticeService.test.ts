import { describe, expect, it } from "vitest";

import {
  PracticeDifficulty,
  PracticeQuestionType,
  PracticeSessionStatus,
} from "../src/models";

import type {
  PracticeQuestion,
} from "../src/models";

import {
  PracticeGenerator,
} from "../src/generator/PracticeGenerator";

import {
  DifficultySelector,
} from "../src/generator/DifficultySelector";

import {
  QuestionSelector,
} from "../src/generator/QuestionSelector";

import type {
  QuestionRepository,
} from "../src/generator/QuestionRepository";

import {
  PracticeSessionManager,
} from "../src/session/PracticeSessionManager";

import {
  PracticeService,
} from "../src/services/PracticeService";


class FakeQuestionRepository
  implements QuestionRepository {

  async findByConceptAndDifficulty(
    conceptId: string,
    difficulty: PracticeDifficulty,
  ): Promise<
    readonly PracticeQuestion[]
  > {

    return Array.from(
      { length: 5 },
      (_, index): PracticeQuestion => ({
        id:
          `question-${index + 1}`,

        conceptId,

        difficulty,

        type:
          PracticeQuestionType
            .MULTIPLE_CHOICE,

        question:
          `Question ${index + 1}`,

        options: [
          {
            id: "A",
            text: "Correct",
          },
          {
            id: "B",
            text: "Wrong",
          },
        ],

        correctAnswer:
          "A",

        explanation:
          "Explanation",
      }),
    );
  }
}


describe(
  "PracticeService",
  () => {


    function createService() {

      const repository =
        new FakeQuestionRepository();


      const generator =
        new PracticeGenerator(
          new DifficultySelector(),

          new QuestionSelector(
            repository,
          ),
        );


      return new PracticeService(
        generator,

        new PracticeSessionManager(),
      );
    }



    it(
      "completes the complete adaptive learning loop",
      async () => {

        const service =
          createService();



        /*
          1. Generate practice
        */

        const questions =
          await service.generate(
            "fractions",

            50,
          );


        expect(
          questions,
        ).toHaveLength(5);



        /*
          2. Start session
        */

        let session =
          service.start(
            "student-1",

            "fractions",

            questions,
          );


        expect(
          session.status,
        ).toBe(
          PracticeSessionStatus
            .IN_PROGRESS,
        );



        /*
          3. Submit all answers
        */

        for (
          const question
          of questions
        ) {

          session =
            service.submit(
              session,

              {
                questionId:
                  question.id,

                selectedAnswer:
                  "A",

                timeSpent:
                  10,

                submittedAt:
                  new Date(),
              },
            );
        }


        expect(
          session.answers,
        ).toHaveLength(5);



        /*
          4. Complete session
        */

        const result =
          service.complete(
            session,

            50,

            40,
          );



        /*
          Session verification
        */

        expect(
          result.session.status,
        ).toBe(
          PracticeSessionStatus
            .COMPLETED,
        );


        expect(
          result.session.completedAt,
        ).toBeDefined();



        /*
          Evaluation verification
        */

        expect(
          result.evaluation
            .totalQuestions,
        ).toBe(5);


        expect(
          result.evaluation
            .correctAnswers,
        ).toBe(5);


        expect(
          result.evaluation.score,
        ).toBe(100);



        /*
          Mastery update

          50 + 10 = 60
        */

        expect(
          result.mastery.masteryBefore,
        ).toBe(50);


        expect(
          result.mastery.masteryAfter,
        ).toBe(60);


        expect(
          result.mastery.masteryDelta,
        ).toBe(10);



        /*
          Confidence update

          40 + 5 = 45
        */

        expect(
          result.mastery.confidenceBefore,
        ).toBe(40);


        expect(
          result.mastery.confidenceAfter,
        ).toBe(45);



        /*
          Feedback verification
        */

        expect(
          result.feedback.mistakes,
        ).toEqual([]);


        expect(
          result.feedback.strengths.length,
        ).toBeGreaterThan(0);



        /*
          Finality event verification
        */

        expect(
          result.event.type,
        ).toBe(
          "PracticeCompleted",
        );


        expect(
          result.event.studentId,
        ).toBe(
          "student-1",
        );


        expect(
          result.event.conceptId,
        ).toBe(
          "fractions",
        );


        expect(
          result.event.sessionId,
        ).toBe(
          session.sessionId,
        );


        expect(
          result.event.score,
        ).toBe(100);


        expect(
          result.event.timestamp,
        ).toBeInstanceOf(
          Date,
        );
      },
    );



    it(
      "rejects incomplete practice sessions",
      async () => {

        const service =
          createService();


        const questions =
          await service.generate(
            "fractions",

            20,
          );


        const session =
          service.start(
            "student-1",

            "fractions",

            questions,
          );


        expect(
          () =>
            service.complete(
              session,

              20,

              30,
            ),
        ).toThrow(
          "Practice session is not complete.",
        );
      },
    );



    it(
      "updates immutable session after submitting answers",
      async () => {

        const service =
          createService();


        const questions =
          await service.generate(
            "fractions",

            30,
          );


        const session =
          service.start(
            "student-1",

            "fractions",

            questions,
          );


    expect(questions[0]).toBeDefined();
    
    const firstQuestion =
      questions[0]!;
    
    const updated =
      service.submit(
        session,
    
        {
          questionId:
            firstQuestion.id,
    
          selectedAnswer:
            "A",
    
          timeSpent:
            5,
    
          submittedAt:
            new Date(),
        },
      );


        expect(
          session.answers.length,
        ).toBe(0);


        expect(
          updated.answers.length,
        ).toBe(1);
      },
    );
  },
);