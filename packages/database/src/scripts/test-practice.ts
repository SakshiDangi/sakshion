import { db } from "../client";
import { students } from "../schema";
import { PracticeRepository } from "../repositories";

async function main() {
  const repository = new PracticeRepository();

  const [student] = await db
    .select()
    .from(students)
    .limit(1);

  if (!student) {
    console.log("No students found.");
    return;
  }

  console.log("Using student:", student.id);

  const attempts =
    await repository.findByStudent(
      student.id,
    );

  console.log(attempts);
}

main().catch(console.error);