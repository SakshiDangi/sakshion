"use client";


import {
  useState,
  useEffect,
} from "react";



interface Question {

  id: string;

  question: string;

  options: {
    id: string;
    text: string;
  }[];

}



interface PracticeResult {

  score: number;

  experience: number;

  mastery: number;

  verification?: {
    success: boolean;
  };

}



export default function PracticePage() {


  const [
    sessionId,
    setSessionId,
  ] = useState("");



  const [
    questions,
    setQuestions,
  ] = useState<Question[]>([]);



  const [
    current,
    setCurrent,
  ] = useState(0);



  const [
    result,
    setResult,
  ] = useState<PracticeResult | null>(null);



  const [
    loading,
    setLoading,
  ] = useState(true);



  const [
    submitting,
    setSubmitting,
  ] = useState(false);



  const [
    error,
    setError,
  ] = useState("");




  useEffect(() => {


    async function loadPractice(){

      try {


        const response =
          await fetch(
            "/api/practice",
          );



        const data =
          await response.json();



        if(!response.ok){

          throw new Error(
            data.message ??
            "Failed to load practice",
          );

        }



        setSessionId(
          data.sessionId,
        );



        setQuestions(
          data.questions ?? [],
        );



      }
      catch(error){

        setError(
          error instanceof Error
          ? error.message
          : "Unknown error",
        );

      }
      finally{

        setLoading(false);

      }

    }



    loadPractice();


  }, []);





  async function submitAnswer(
    optionId:string,
  ){


    const question =
      questions[current];



    if(!question){

      return;

    }



    setSubmitting(true);



    try {


      const response =
        await fetch(
          "/api/practice/submit",
          {

            method:
              "POST",


            headers:{
              "Content-Type":
                "application/json",
            },


            body:
              JSON.stringify({

                sessionId,


                questionId:
                  question.id,


                selectedAnswer:
                  optionId,

              }),

          },
        );



      const data =
        await response.json();



      if(!response.ok){

        throw new Error(
          data.message ??
          "Submission failed",
        );

      }



      if(data.completed){


        setResult(
          data.result,
        );


        return;

      }



      setCurrent(
        previous =>
          previous + 1,
      );


    }
    catch(error){


      setError(
        error instanceof Error
        ? error.message
        : "Submission error",
      );


    }
    finally{


      setSubmitting(false);


    }

  }





  if(loading){

    return (

      <main className="p-8">

        Loading practice...

      </main>

    );

  }




  if(error){

    return (

      <main className="p-8">

        <div className="
          border
          rounded-xl
          p-5
        ">

          ❌ {error}

        </div>

      </main>

    );

  }





  if(result){


    return (

      <main className="
        p-8
        space-y-6
      ">


        <h1 className="
          text-3xl
          font-bold
        ">

          Practice Completed

        </h1>



        <div className="
          border
          rounded-xl
          p-6
          space-y-3
        ">


          <p>

            Score:
            {" "}
            <b>
              {result.score}
            </b>

          </p>



          <p>

            XP:
            {" "}
            <b>
              {result.experience}
            </b>

          </p>



          <p>

            Mastery:
            {" "}
            <b>

              {
                Math.round(
                  result.mastery * 100,
                )
              }

              %

            </b>

          </p>



          <p>

            {
              result.verification?.success

              ?

              "✅ Learning verified"

              :

              "⏳ Verification pending"

            }

          </p>


        </div>


      </main>

    );

  }





  const question =
    questions[current];



  if(!question){

    return (

      <main className="p-8">

        No questions available.

      </main>

    );

  }





  return (

    <main className="
      p-8
      space-y-6
    ">


      <h1 className="
        text-3xl
        font-bold
      ">

        Practice Session

      </h1>




      <div className="
        border
        rounded-xl
        p-6
        space-y-5
      ">



        <h2 className="
          text-xl
          font-semibold
        ">

          {question.question}

        </h2>




        <div className="
          space-y-3
        ">


          {
            question.options.map(
              option => (

                <button

                  key={
                    option.id
                  }


                  disabled={
                    submitting
                  }


                  onClick={
                    () =>
                    submitAnswer(
                      option.id,
                    )
                  }


                  className="
                    w-full
                    border
                    rounded-lg
                    p-3
                    text-left
                    disabled:opacity-50
                  "

                >

                  {option.text}

                </button>

              )
            )
          }


        </div>



      </div>





      <p>

        Question{" "}

        {current + 1}

        /

        {questions.length}

      </p>



    </main>

  );

}