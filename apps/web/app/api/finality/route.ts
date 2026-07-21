import {
  LearningService,
} from "@sakshion/application";


export async function POST(
  request: Request,
) {

  const event =
    await request.json();


  const service =
    new LearningService();


  const result =
    service.learn(
      event,
    );


  return Response.json(
    result,
  );

}