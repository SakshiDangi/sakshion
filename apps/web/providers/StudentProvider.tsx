"use client";

import React, {
  createContext,
  useContext,
} from "react";


export interface StudentContextType {

  id: string;

  name: string;

  email: string;

  initials: string;

  xp: number;

}


const StudentContext =
  createContext<StudentContextType | null>(
    null,
  );


export function StudentProvider({
  student,
  children,
}: {
  student: StudentContextType;
  children: React.ReactNode;
}) {


  return (

    <StudentContext.Provider
      value={student}
    >

      {children}

    </StudentContext.Provider>

  );

}



export function useStudent() {

  const context =
    useContext(
      StudentContext,
    );


  if (!context) {

    throw new Error(
      "useStudent must be used inside StudentProvider",
    );

  }


  return context;

}