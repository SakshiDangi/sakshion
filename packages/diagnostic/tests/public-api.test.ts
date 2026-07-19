import {
  DiagnosticService,
  QuestionRepository,
  AssessmentMapper,
} from "../src";


import {
  describe,
  expect,
  it,
} from "vitest";


describe(
  "Diagnostic public API",
  () => {

    it(
      "exports main services",
      () => {

        expect(
          DiagnosticService,
        ).toBeDefined();


        expect(
          QuestionRepository,
        ).toBeDefined();


        expect(
          AssessmentMapper,
        ).toBeDefined();

      },
    );

  },
);