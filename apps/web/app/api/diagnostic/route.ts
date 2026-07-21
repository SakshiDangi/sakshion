import {
  diagnosticService,
} from "@/lib/services";


export async function GET() {

  const result =
    diagnosticService.runDiagnostic(
      "demo-student",
    );


  return Response.json(
    result,
  );
}