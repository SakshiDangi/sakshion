import { db } from "../client";
import { concepts, diagnosticQuestions } from "../schema";

type QuestionSeed = {
  concept: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
};

const questions: QuestionSeed[] = [
  {
    concept: "Whole Numbers",
    question: "Which of the following is a whole number?",
    options: ["-3", "2.5", "7", "1/2"],
    answer: "7",
    explanation: "Whole numbers are 0 and positive integers.",
  },
  {
    concept: "Comparing Whole Numbers",
    question: "Which number is greater?",
    options: ["248", "284", "228", "204"],
    answer: "284",
    explanation: "284 has the greatest value.",
  },
  {
    concept: "Place Value",
    question: "What is the place value of 5 in 45,812?",
    options: ["5", "50", "5000", "500"],
    answer: "5000",
    explanation: "The digit 5 is in the thousands place.",
  },
  {
    concept: "Factors",
    question: "Which is a factor of 24?",
    options: ["5", "7", "6", "11"],
    answer: "6",
    explanation: "24 ÷ 6 = 4.",
  },
  {
    concept: "Prime Numbers",
    question: "Which number is prime?",
    options: ["15", "21", "17", "27"],
    answer: "17",
    explanation: "17 has exactly two factors.",
  },
  {
    concept: "Fractions",
    question: "Which fraction is equal to one-half?",
    options: ["2/4", "3/5", "4/5", "5/6"],
    answer: "2/4",
    explanation: "2/4 simplifies to 1/2.",
  },
  {
    concept: "Equivalent Fractions",
    question: "Which fraction is equivalent to 3/6?",
    options: ["1/2", "2/3", "3/4", "5/6"],
    answer: "1/2",
    explanation: "3/6 simplifies to 1/2.",
  },
  {
    concept: "Comparing Fractions",
    question: "Which fraction is larger?",
    options: ["1/3", "1/2", "1/4", "1/5"],
    answer: "1/2",
    explanation: "One-half is greater than one-third.",
  },
];

export async function seedDiagnosticQuestions() {

  await db.delete(diagnosticQuestions);

  const allConcepts =
    await db
      .select()
      .from(concepts);


  console.log(
    "Concepts found:",
    allConcepts.length
  );


  console.log(
    "Concept names:",
    allConcepts.map(
      (c)=>c.title
    )
  );

  const conceptMap = new Map(
    allConcepts.map((concept) => [concept.title, concept.id]),
  );

  const values = questions
    .map((question) => {
      const conceptId = conceptMap.get(question.concept);

      if (!conceptId) {
        console.warn(`Missing concept: ${question.concept}`);
        return null;
      }

      return {
        conceptId,
        question: question.question,
        options: question.options,
        answer: question.answer,
        explanation: question.explanation,
      };
    })
    .filter(
      (
        value,
      ): value is {
        conceptId: string;
        question: string;
        options: string[];
        answer: string;
        explanation: string;
      } => value !== null,
    );

  await db
    .insert(diagnosticQuestions)
    .values(values)
    .onConflictDoNothing();
}