"use client";


import {
  useState,
} from "react";



export default function TutorPage(){


  const [
    prompt,
    setPrompt,
  ] = useState("");



  const [
    response,
    setResponse,
  ] = useState("");



  const [
    suggestions,
    setSuggestions,
  ] = useState<string[]>([]);



  const [
    loading,
    setLoading,
  ] = useState(false);




  async function askTutor(){


    if(!prompt)
      return;



    setLoading(true);



    const res =
      await fetch(
        "/api/tutor",
        {

          method:"POST",

          headers:{
            "Content-Type":
              "application/json",
          },


          body:
            JSON.stringify({

              prompt,

            }),

        },
      );



    const data =
      await res.json();



    setResponse(
      data.response,
    );


    setSuggestions(
      data.suggestions ?? [],
    );


    setLoading(false);

  }





  return (

    <main className="p-8 space-y-6">


      <h1 className="text-3xl font-bold">
        AI Tutor
      </h1>



      <div className="
        border
        rounded-xl
        p-6
        space-y-4
      ">


        <textarea

          value={prompt}

          onChange={
            e =>
            setPrompt(
              e.target.value,
            )
          }


          placeholder="
            Ask anything about your lesson...
          "


          className="
            w-full
            border
            rounded-lg
            p-3
            min-h-32
          "

        />



        <button

          onClick={askTutor}

          disabled={loading}


          className="
            border
            rounded-lg
            px-5
            py-3
          "

        >

          {
            loading
            ?
            "Thinking..."
            :
            "Ask Tutor"
          }


        </button>


      </div>





      {
        response && (

          <section
            className="
              border
              rounded-xl
              p-6
            "
          >

            <h2 className="font-semibold">
              Tutor Explanation
            </h2>


            <p className="mt-3">
              {response}
            </p>


          </section>

        )
      }







      {
        suggestions.length > 0 && (

          <section>

            <h2 className="font-semibold">
              Continue Learning
            </h2>


            <ul className="mt-3 space-y-2">

              {
                suggestions.map(
                  item => (

                    <li
                      key={item}
                      className="
                        border
                        rounded-lg
                        p-3
                      "
                    >
                      {item}
                    </li>

                  )
                )
              }

            </ul>


          </section>

        )
      }



    </main>

  );

}