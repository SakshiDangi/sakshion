import { ConceptRepository } from "../repositories";


async function main(){

  const repository =
    new ConceptRepository();


  const concepts =
    await repository.findByGrade(6);


  console.log(concepts);

}


main()
.catch(console.error);