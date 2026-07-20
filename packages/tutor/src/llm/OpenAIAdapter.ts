import OpenAI from "openai";



export interface LLMResponse {


  content:string;


}



export interface LLMRequest {


  prompt:string;


}



export class OpenAIAdapter {



  private client:OpenAI;



  constructor(
    apiKey?:string
  ){


    this.client =
      new OpenAI({

        apiKey:
          apiKey ??
          process.env.OPENAI_API_KEY

      });


  }





  async generate(
    request:LLMRequest
  ):Promise<LLMResponse> {



    const response =
      await this.client.chat.completions.create({


        model:
          "gpt-5-mini",


        messages:[


          {

            role:"system",

            content:
              "You are MentorOS Tutor."


          },


          {

            role:"user",

            content:
              request.prompt


          }


        ],


        temperature:
          0.4


      });





    const content =
      response
        .choices[0]
        ?.message
        ?.content
        ??
        "";





    return {


      content


    };


  }


}