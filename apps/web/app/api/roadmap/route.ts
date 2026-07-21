import {
  roadmapService,
  diagnosticService,
} from "@/lib/services";


import {
  DEMO_STUDENT_ID,
} from "@/lib/constants/demo";


import type {
  ConceptInput,
} from "@sakshion/roadmap";



export async function GET() {


  const diagnostic =
    await diagnosticService.runDiagnostic(
      DEMO_STUDENT_ID,
    );


  const recommendedConcepts =
    diagnostic.recommendedConcepts ?? [];



  const concepts: ConceptInput[] =
    recommendedConcepts.map(
      (
        conceptId,
        index,
      ) => ({

        conceptId,


        mastery:
          diagnostic.mastery -
          index * 0.1,


        estimatedMinutes:
          30,

      }),
    );



  const roadmap =
    roadmapService.generate(

      DEMO_STUDENT_ID,

      concepts,

    );


  return Response.json(
    roadmap,
  );

}