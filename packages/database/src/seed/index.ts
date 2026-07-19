import { seedStudents } from "./students";
import { seedConcepts } from "./concepts";
import { seedConceptEdges } from "./concept-edges";
import { seedDiagnosticQuestions } from "./diagnostic-questions";
import { seedMastery } from "./mastery";
import { seedRoadmaps } from "./roadmaps";
import { seedLearningEvents } from "./learning-events";

async function main() {
  console.log("🌱 Seeding database...");

  await seedStudents();
  await seedConcepts();
  await seedConceptEdges();
  await seedDiagnosticQuestions();
  await seedMastery();
  await seedRoadmaps();
  await seedLearningEvents();

  console.log("✅ Seed completed");
}

main()
  .catch((error)=>{
    console.error(
      "Seed failed:",
      error
    );

    process.exit(1);
  });