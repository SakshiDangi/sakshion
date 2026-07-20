import {
 describe,
 expect,
 it
} from "vitest";


import type {
 LLMResponse
} from "../src";



class MockLLM {


 async generate()
 :Promise<LLMResponse>{


  return {


    content:
      "Fractions represent parts of a whole."


  };


 }

}



describe(
"LLM Adapter",
()=>{


it(
"returns generated response",
async()=>{


const llm =
new MockLLM();



const response =
await llm.generate();



expect(
response.content
)
.toContain(
"Fractions"
);



});


});