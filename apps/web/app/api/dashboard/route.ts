import {
  dashboardService,
} from "@/lib/services";

import {
  DEMO_STUDENT_ID,
} from "@/lib/constants/demo";

export async function GET() {

  const result =
    await dashboardService.getDashboard(
      DEMO_STUDENT_ID,
    );

  return Response.json(
    result,
  );

}