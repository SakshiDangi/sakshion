async function getDashboard() {
  const res = await fetch(
    "http://localhost:3000/api/dashboard",
    {
      cache: "no-store"
    }
  );

  return res.json();
}


export default async function DashboardPage() {

  const data = await getDashboard();


  return (
    <main className="p-8 space-y-8">

      <h1 className="text-3xl font-bold">
        Sakshion Learning Twin
      </h1>


      <section>

        <h2 className="text-xl font-semibold mb-4">
          Mastery
        </h2>


        <div className="grid grid-cols-3 gap-4">


          <div className="rounded-xl border p-5">
            <h3>
              Programming
            </h3>

            <p className="text-3xl font-bold">
              {data.learningTwin.mastery.programming}%
            </p>
          </div>


          <div className="rounded-xl border p-5">
            <h3>
              Functions
            </h3>

            <p className="text-3xl font-bold">
              {data.learningTwin.mastery.functions}%
            </p>
          </div>


          <div className="rounded-xl border p-5">
            <h3>
              Algorithms
            </h3>

            <p className="text-3xl font-bold">
              {data.learningTwin.mastery.algorithms}%
            </p>
          </div>


        </div>

      </section>



      <section>

        <h2 className="text-xl font-semibold">
          Weak Areas
        </h2>


        <ul className="mt-3 space-y-2">

          {
            data.learningTwin.weakAreas.map(
              (area:string)=>(
                <li
                  key={area}
                  className="border rounded-lg p-3"
                >
                  ⚠ {area}
                </li>
              )
            )
          }

        </ul>

      </section>




      <section>

        <h2 className="text-xl font-semibold">
          Personalized Roadmap
        </h2>


        <ol className="mt-3 space-y-3">

        {
          data.roadmap.map(
            (step:any)=>(
              <li
                key={step.order}
                className="border rounded-lg p-4"
              >

                {step.order}.
                {" "}
                {step.title}

              </li>
            )
          )
        }

        </ol>

      </section>


    </main>
  );
}