import {
  PracticeGenerator,
  QuestionSelector,
  DifficultySelector,
  PracticeSessionManager,
} from "@sakshion/practice";


import {
  InMemoryQuestionRepository,
} from "@/lib/practice-repository";


import {
  practiceSessionManager,
} from "@/lib/services";



export async function GET() {


  const repository =
    new InMemoryQuestionRepository();



  const selector =
    new QuestionSelector(
      repository,
    );



  const generator =
    new PracticeGenerator(
      new DifficultySelector(),
      selector,
    );



  const questions =
    await generator.generate({

      conceptId:
        "functions",

      mastery:
        0.5,

      count:
        3,

    });



  const session =
  practiceSessionManager.create({

    sessionId:
      crypto.randomUUID(),

    studentId:
      "513037c3-ddbe-4516-8db7-b502d12de13f",

    conceptId:
      "7c3b47a4-c08d-477c-8c54-d83966388fe8", // Variables

    questions,

  });



  return Response.json({

    sessionId:
      session.sessionId,


    questions:
      session.questions,

  });

}