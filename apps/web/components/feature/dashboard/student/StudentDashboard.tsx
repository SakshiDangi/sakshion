"use client";

import {
  useStudent,
} from "@/providers/StudentProvider";


interface RoadmapNode {
  id: string;
  title: string;
  completed: boolean;
  unlocked: boolean;
}


interface DashboardData {

  level: number;

  experience: number;

  mastery: number;

  practiceCount: number;

  lastScore: number;

  verified: boolean;


  learningTwin: {
    confidence: number;
    state: string;
  };


  roadmap: {
    nodes: RoadmapNode[];
  };

}



interface StudentDashboardProps {

  data: DashboardData;

}



export default function StudentDashboard({
  data,
}: StudentDashboardProps) {


  const student =
    useStudent();


  return (

    <main className="space-y-8">


      <section>

        <h1 className="text-3xl font-bold">
          Welcome {student.name}
        </h1>

        <p className="text-muted-foreground">
          Sakshion Learning Twin
        </p>

      </section>



      {/* Overview */}

      <section className="grid gap-4 md:grid-cols-3">


        <div className="border rounded-xl p-5">

          <h2 className="text-sm text-gray-500">
            Level
          </h2>

          <p className="mt-2 text-3xl font-bold">
            {data.level}
          </p>

        </div>



        <div className="border rounded-xl p-5">

          <h2 className="text-sm text-gray-500">
            Experience
          </h2>

          <p className="mt-2 text-3xl font-bold">
            {data.experience}
          </p>

        </div>



        <div className="border rounded-xl p-5">

          <h2 className="text-sm text-gray-500">
            Mastery
          </h2>

          <p className="mt-2 text-3xl font-bold">
            {data.mastery}%
          </p>

        </div>


      </section>




      {/* Practice */}

      <section>

        <h2 className="text-xl font-semibold mb-4">
          Practice Progress
        </h2>


        <div className="border rounded-xl p-5 space-y-2">


          <p>
            <strong>XP:</strong>{" "}
            {data.experience}
          </p>


          <p>
            <strong>
              Completed Sessions:
            </strong>{" "}
            {data.practiceCount}
          </p>



          <p>
            <strong>
              Last Score:
            </strong>{" "}
            {data.lastScore}%
          </p>


        </div>


      </section>




      {/* Verification */}

      <section>

        <h2 className="text-xl font-semibold mb-4">
          Verification
        </h2>


        <div className="border rounded-xl p-5">

          {
            data.verified
            ?
            "✅ Learning Verified"
            :
            "⏳ Verification Pending"
          }


        </div>


      </section>





      {/* Learning Twin */}

      <section>

        <h2 className="text-xl font-semibold mb-4">
          Learning Twin
        </h2>


        <div className="border rounded-xl p-5 space-y-2">


          <p>

            <strong>
              Confidence:
            </strong>{" "}

            {data.learningTwin.confidence}%

          </p>



          <p>

            <strong>
              State:
            </strong>{" "}

            {data.learningTwin.state}

          </p>


        </div>


      </section>





      {/* Roadmap */}

      <section>

        <h2 className="text-xl font-semibold mb-4">
          Roadmap
        </h2>


        <div className="space-y-3">


          {
            data.roadmap.nodes.length === 0

            ?

            <div className="border rounded-lg p-4">
              No roadmap available yet.
            </div>


            :

            data.roadmap.nodes.map(
              (node)=>(
                
                <div
                  key={node.id}
                  className="
                    border
                    rounded-lg
                    p-4
                    flex
                    justify-between
                  "
                >

                  <span>
                    {node.title}
                  </span>


                  <span>

                    {
                      node.completed
                      ?
                      "✅"
                      :
                      node.unlocked
                      ?
                      "🔓"
                      :
                      "🔒"
                    }

                  </span>


                </div>

              )
            )

          }


        </div>


      </section>


    </main>

  );

}