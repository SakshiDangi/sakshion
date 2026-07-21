import {
  practiceService,
  practiceSessionManager,
} from "@/lib/services";

import {
  PracticeRepository,
  MasteryRepository,
  LearningEventRepository,
} from "@sakshion/database";

const practiceRepository =
  new PracticeRepository();

const masteryRepository =
  new MasteryRepository();

const learningEventRepository =
  new LearningEventRepository();

export async function POST(
  request: Request,
) {
  try {
    const body =
      await request.json();

    const {
      sessionId,
      questionId,
      selectedAnswer,
    } = body;

    if (
      !sessionId ||
      !questionId ||
      !selectedAnswer
    ) {
      return Response.json(
        {
          error:
            "Missing required fields",
        },
        {
          status: 400,
        },
      );
    }

    const updatedSession =
      practiceSessionManager.submitAnswer({
        sessionId,

        answer: {
          questionId,

          selectedAnswer,

          timeSpent: 0,

          submittedAt: new Date(),
        },
      });

    if (
      !practiceSessionManager.isComplete(
        sessionId,
      )
    ) {
      return Response.json({
        completed: false,

        remaining:
          updatedSession.questions.length -
          updatedSession.answers.length,
      });
    }

    const session =
      practiceSessionManager.get(
        sessionId,
      );

    if (
      session.status === "completed"
    ) {
      return Response.json({
        completed: true,
        alreadyCompleted: true,
      });
    }

    const masteryBefore = 80;
    const confidenceBefore = 90;

    const result =
      practiceService.completePractice(
        session,
        masteryBefore,
        confidenceBefore,
      );

    await practiceRepository.create({
      studentId:
        session.studentId,

      conceptId:
        session.conceptId,

      score:
        result.score,

      masteryBefore,

      masteryAfter:
        result.mastery,
    });

    await masteryRepository.upsert({
      studentId:
        session.studentId,

      conceptId:
        session.conceptId,

      mastery:
        result.mastery,

      confidence:
        confidenceBefore,

      attempts:
        session.answers.length,
    });

    await learningEventRepository.create({
      studentId:
        session.studentId,

      eventType:
        "practice_completed",

      payload: {
        score:
          result.score,

        experience:
          result.experience,

        mastery:
          result.mastery,

        feedback:
          result.feedback,
      },

      previousHash: null,

      hash:
        crypto.randomUUID(),

      signature:
        "demo-signature",

      verified:
        result.verification.success,
    });

    return Response.json({
      completed: true,
      result,
    });
  } catch (error) {
    console.error(
      "Practice submit error:",
      error,
    );

    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      {
        status: 500,
      },
    );
  }
}