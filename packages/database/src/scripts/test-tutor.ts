import { db } from "../client";
import { students } from "../schema";
import { TutorRepository } from "../repositories";

async function main() {
  const repository = new TutorRepository();

  const [student] = await db
    .select()
    .from(students)
    .limit(1);

  if (!student) {
    console.log("No students found.");
    return;
  }

  console.log("Using student:", student);

  const sessions = await repository.findByStudent(student.id);

  console.log(sessions);
}

main().catch(console.error);