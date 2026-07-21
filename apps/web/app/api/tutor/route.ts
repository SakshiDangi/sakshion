import {
  tutorService,
} from "@/lib/services";


import {
  DEMO_STUDENT_ID,
} from "@/lib/constants/demo";


export async function POST(
  request: Request,
) {

  const body =
    await request.json();


  const prompt =
    body.prompt;


  if (!prompt) {

    return Response.json(
      {
        error:
          "Prompt is required",
      },
      {
        status: 400,
      },
    );

  }


  const result =
    await tutorService.ask(
      DEMO_STUDENT_ID,
      prompt,
    );


  return Response.json(
    result,
  );

}