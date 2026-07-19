import { MasteryRepository } from "../repositories";


async function main(){

  const repository =
    new MasteryRepository();


  const records =
    await repository.findByStudent(
      "YOUR_STUDENT_ID",
    );


  console.log(records);

}


main()
.catch(console.error);