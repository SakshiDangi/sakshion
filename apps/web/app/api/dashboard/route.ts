import {
  dashboardService,
} from "@/lib/services";


export async function GET() {


  const result =
    dashboardService.getDashboard(
      "demo-student",
    );


  return Response.json(
    result,
  );

}