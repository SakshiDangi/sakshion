import {
  Button,
  Card,
  Badge,
} from "@/components/design-system";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#070B16] text-white">

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-8 py-24">

        <div className="max-w-3xl">

          <Badge variant="purple">
            AI Learning Intelligence Platform
          </Badge>


          <h1 className="mt-6 text-5xl font-bold leading-tight">
            Your Personal
            <span className="text-purple-400">
              {" "}AI Learning Twin
            </span>
          </h1>


          <p className="mt-6 text-lg text-gray-400">
            Sakshion creates a digital twin of every learner,
            understands their knowledge gaps, and builds a
            personalized roadmap to mastery.
          </p>


          <div className="mt-8 flex gap-4">

            <Button>
              Start Learning
            </Button>


            <Button>
              Explore AI Tutor
            </Button>

          </div>

        </div>

      </section>


      {/* Feature Section */}
      <section className="max-w-6xl mx-auto px-8 pb-24">

        <div className="grid md:grid-cols-3 gap-6">


          <Card>

            <h3 className="text-xl font-semibold">
              🧠 Digital Twin
            </h3>

            <p className="mt-3 text-gray-400">
              AI builds a living model of your knowledge,
              strengths, and weaknesses.
            </p>

          </Card>



          <Card>

            <h3 className="text-xl font-semibold">
              🗺 Adaptive Roadmap
            </h3>

            <p className="mt-3 text-gray-400">
              Every learner gets a personalized learning path
              based on mastery.
            </p>

          </Card>



          <Card>

            <h3 className="text-xl font-semibold">
              🤖 AI Tutor
            </h3>

            <p className="mt-3 text-gray-400">
              A personal tutor that explains concepts,
              generates practice, and gives feedback.
            </p>

          </Card>


        </div>

      </section>


      {/* Architecture Highlight */}
      <section className="max-w-6xl mx-auto px-8 pb-24">

        <Card>

          <h2 className="text-2xl font-bold">
            Powered by Sakshion Intelligence Core
          </h2>


          <div className="mt-6 grid md:grid-cols-4 gap-4 text-center">


            <div>
              <div className="text-purple-400 text-3xl">
                01
              </div>
              <p>
                Diagnostic
              </p>
            </div>


            <div>
              <div className="text-purple-400 text-3xl">
                02
              </div>
              <p>
                Knowledge Graph
              </p>
            </div>


            <div>
              <div className="text-purple-400 text-3xl">
                03
              </div>
              <p>
                Digital Twin
              </p>
            </div>


            <div>
              <div className="text-purple-400 text-3xl">
                04
              </div>
              <p>
                Finality Intelligence
              </p>
            </div>


          </div>


        </Card>

      </section>


    </main>
  );
}