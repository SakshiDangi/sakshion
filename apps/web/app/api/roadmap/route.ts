import {
  roadmapService,
  diagnosticService,
} from "@/lib/services";


import type {
  ConceptInput,
} from "@sakshion/roadmap";



export async function GET() {


  const diagnostic =
    diagnosticService.runDiagnostic(
      "demo-student",
    );



  const concepts: ConceptInput[] =
    diagnostic.recommendedConcepts.map(
      (conceptId,index)=>({

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

      "demo-student",

      concepts,

    );



  return Response.json(
    roadmap,
  );

}