import { db } from "../client";
import { students } from "../schema";
import { RoadmapRepository } from "../repositories";

async function main() {

  const repository =
    new RoadmapRepository();

  const [student] = await db
    .select()
    .from(students)
    .limit(1);

  if (!student) {
    console.log("No students found.");
    return;
  }

  console.log(
    "Using student:",
    student.id,
  );

  const roadmap =
    await repository.findByStudent(
      student.id,
    );

  console.log(roadmap);

}

main().catch(console.error);