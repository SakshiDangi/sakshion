import {
  describe,
  expect,
  it,
} from "vitest";

import {
  TwinFactory,
} from "../src/state/TwinFactory";

import {
  TwinState,
} from "../src/state/TwinState";


describe(
  "TwinState",
  () => {


    it(
      "updates digital twin without mutating original state",
      () => {


        const original =
          TwinFactory.create({

            studentId: "student-1",

            assessments: [
              {
                conceptId: "fractions",
                mastery: 50,
              },
            ],

          });



        const updated =
          TwinState.update(
            original,
            {
              xp: 100,
            },
          );



        // Original remains unchanged
        expect(
          original.xp,
        )
        .toBe(0);



        // New state contains update
        expect(
          updated.xp,
        )
        .toBe(100);



        // Different objects
        expect(
          updated,
        )
        .not
        .toBe(original);


      },
    );



    it(
      "updates learning state immutably",
      () => {


        const twin =
          TwinFactory.create({

            studentId: "student-1",

            assessments: [],

          });



        const updated =
          TwinState.updateLearningState(
            twin,
            {
              currentConcept: "fractions",
              activeLesson: "lesson-1",
            },
          );



        // Original unchanged
        expect(
          twin.learningState.currentConcept,
        )
        .toBeNull();



        // Updated state contains new value
        expect(
          updated.learningState.currentConcept,
        )
        .toBe(
          "fractions",
        );



        expect(
          updated.learningState.activeLesson,
        )
        .toBe(
          "lesson-1",
        );


      },
    );



    it(
      "adds progress snapshot without changing previous history",
      () => {


        const twin =
          TwinFactory.create({

            studentId: "student-1",

            assessments: [],

          });



        const snapshot = {

          timestamp: new Date(),

          masteryAverage: 50,

          completedConcepts: 2,

          xp: 100,

        };



        const updated =
          TwinState.addSnapshot(
            twin,
            snapshot,
          );



        // New twin has snapshot
        expect(
          updated.history.length,
        )
        .toBe(1);



        // Old twin history untouched
        expect(
          twin.history.length,
        )
        .toBe(0);



        expect(
          updated.history[0],
        )
        .toEqual(snapshot);


      },
    );



    it(
      "updates timestamp after state change",
      () => {


        const twin =
          TwinFactory.create({

            studentId: "student-1",

            assessments: [],

          });



        const before =
          twin.updatedAt;



        const updated =
          TwinState.update(
            twin,
            {
              xp:50,
            },
          );



        expect(
          updated.updatedAt.getTime(),
        )
        .toBeGreaterThanOrEqual(
          before.getTime(),
        );


      },
    );


  },
);