import { db } from "../client";
import {
  students,
  concepts,
} from "../schema";


async function main(){

 const studentRows =
   await db.select().from(students);


 const conceptRows =
   await db.select().from(concepts);


 console.log("Students");
 console.log(studentRows);


 console.log("Concepts");
 console.log(conceptRows);

}


main();