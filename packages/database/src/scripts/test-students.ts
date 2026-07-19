import { StudentRepository } from "../repositories";

async function main() {
  const repository = new StudentRepository();

  const students = await repository.findAll();

  console.log(students);
}

main().catch(console.error);