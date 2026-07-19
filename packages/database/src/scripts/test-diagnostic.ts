import {
  DiagnosticRepository,
} from "../repositories";


async function main(){

  const repository =
    new DiagnosticRepository();


  const questions =
    await repository.findAllQuestions();


  console.log(
    "Questions:",
    questions,
  );


}


main()
.catch(console.error);