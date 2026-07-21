import {
  tutorService,
} from "@/lib/services";



export async function POST(
  request: Request,
) {

  const body =
    await request.json();



  const prompt =
    body.prompt;



  if(!prompt){

    return Response.json(
      {
        error:
          "Prompt is required",
      },
      {
        status:400,
      },
    );

  }



  const result =
    tutorService.ask(
      prompt,
    );



  return Response.json(
    result,
  );

}