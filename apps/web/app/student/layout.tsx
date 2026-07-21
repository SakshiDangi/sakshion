import {
  AppLayout,
} from "@/components/design-system";

import {
  StudentRepository,
} from "@sakshion/database";

import {
  StudentProvider,
} from "@/providers/StudentProvider";

import {
  cache,
} from "react";


const getStudent =
  cache(async()=>{

    const repository =
      new StudentRepository();


    return repository.findByEmail(
      "alice@example.com",
    );

  });



export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  const student =
    await getStudent();


  if(!student){
    throw new Error(
      "Student not found"
    );
  }



  const user = {

    name:
      student.name,

    email:
      student.email,

    initials:
      student.name
        .split(" ")
        .map(
          p=>p[0]
        )
        .join("")
        .slice(0,2)
        .toUpperCase(),

    xp:0,

  };



  return (

    <StudentProvider
      student={{
        id:
          student.id,

        name:
          student.name,

        email:
          student.email,

        initials:
          user.initials,

        xp:
          user.xp,
      }}
    >

      <AppLayout
        userRole="learner"
        user={user}
      >

        {children}

      </AppLayout>

    </StudentProvider>

  );

}