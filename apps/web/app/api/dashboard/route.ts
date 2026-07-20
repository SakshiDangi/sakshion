export async function GET() {
  return Response.json({
    student: {
      id: "demo-student",
      name: "Alex"
    },

    learningTwin: {
      mastery: {
        programming: 60,
        functions: 40,
        algorithms: 20
      },

      weakAreas: [
        "Algorithms",
        "Recursion"
      ],

      strengths: [
        "Variables",
        "Basic Syntax"
      ]
    },

    roadmap: [
      {
        order: 1,
        title: "Functions",
        status: "current"
      },
      {
        order: 2,
        title: "Loops",
        status: "next"
      },
      {
        order: 3,
        title: "Algorithms",
        status: "locked"
      }
    ]
  });
}