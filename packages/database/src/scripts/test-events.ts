import { db } from "../client";
import { students } from "../schema";
import { LearningEventRepository } from "../repositories";

async function main() {
  const repository = new LearningEventRepository();

  const [student] = await db
    .select()
    .from(students)
    .limit(1);

  if (!student) {
    console.log("No students found.");
    return;
  }

  const events = await repository.findByStudent(
    student.id,
  );

  console.log(events);
}

main().catch(console.error);