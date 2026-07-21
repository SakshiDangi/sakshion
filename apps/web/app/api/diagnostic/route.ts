import {
  diagnosticService,
} from "@/lib/services";

import {
  DEMO_STUDENT_ID,
} from "@/lib/constants/demo";


export async function GET() {

  const result =
    await diagnosticService.runDiagnostic(
      DEMO_STUDENT_ID,
    );


  return Response.json(
    result,
  );
}