import { describe, expect, it } from "vitest";

import {
  KnowledgeGraphService,
  KnowledgeGraphServiceError,
} from "../src/services";

import {
  type ConceptEdge,
  type ConceptNode,
  type StudentMastery,
  RelationshipType,
} from "../src/models";


describe("KnowledgeGraphService", () => {


  const nodes: ConceptNode[] = [

    {
      id: "math.division",
      title: "Division",
      description: "",
      subject: "Math",
      grade: 6,
      difficulty: 1,
      estimatedMinutes: 20,
      learningObjectives: [],
    },


    {
      id: "math.fractions",
      title: "Fractions",
      description: "",
      subject: "Math",
      grade: 6,
      difficulty: 2,
      estimatedMinutes: 30,
      learningObjectives: [],
    },


    {
      id: "math.percentages",
      title: "Percentages",
      description: "",
      subject: "Math",
      grade: 6,
      difficulty: 3,
      estimatedMinutes: 40,
      learningObjectives: [],
    },

  ];



  const edges: ConceptEdge[] = [

    {
      source:
        "math.division",

      target:
        "math.fractions",

      relationship:
        RelationshipType.PREREQUISITE,
    },


    {
      source:
        "math.fractions",

      target:
        "math.percentages",

      relationship:
        RelationshipType.PREREQUISITE,
    },

  ];



  function createService(){

    const service =
      new KnowledgeGraphService();


    service.loadGraph(
      nodes,
      edges,
    );


    return service;
  }



  it("loads graph",()=>{

    const service =
      createService();


    expect(
      service.isLoaded(),
    )
    .toBe(true);

  });



  it("returns graph",()=>{

    const service =
      createService();


    const graph =
      service.getGraph();


    expect(
      graph.nodes.size,
    )
    .toBe(3);


    expect(
      graph.edges.length,
    )
    .toBe(2);

  });



  it("throws if graph not loaded",()=>{

    const service =
      new KnowledgeGraphService();


    expect(()=>{

      service.getGraph();

    })
    .toThrow(
      KnowledgeGraphServiceError,
    );

  });



  it("finds concept",()=>{

    const service =
      createService();


    const concept =
      service.findConcept(
        "math.fractions",
      );


    expect(
      concept?.id,
    )
    .toBe(
      "math.fractions",
    );

  });



  it("returns undefined for missing concept",()=>{

    const service =
      createService();


    expect(
      service.findConcept(
        "unknown",
      ),
    )
    .toBeUndefined();

  });



  it("clears graph",()=>{

    const service =
      createService();


    service.clear();


    expect(
      service.isLoaded(),
    )
    .toBe(false);

  });



  it("validates graph",()=>{

    const service =
      createService();


    expect(()=>{

      service.validate();

    })
    .not
    .toThrow();

  });


it("returns direct prerequisites",()=>{

  const service =
    createService();

  const result =
    service.getPrerequisites(
      "math.percentages",
    );

  expect(result)
  .toEqual([
    "math.fractions",
  ]);

});



  it("throws for unknown prerequisite",()=>{

    const service =
      createService();


    expect(()=>{

      service.getPrerequisites(
        "unknown",
      );

    })
    .toThrow(
      KnowledgeGraphServiceError,
    );

  });



  it("returns learning path",()=>{

    const service =
      createService();


    const path =
      service.findPath(
        "math.fractions",
        "math.percentages",
      );


    expect(
      path.currentConcept?.id,
    )
    .toBe(
      "math.fractions",
    );


    expect(
      path.nextConcepts.length,
    )
    .toBeGreaterThan(0);


    expect(
      path.nextConcepts
      .map(
        c=>c.id,
      ),
    )
    .toContain(
      "math.percentages",
    );

  });



  it("throws for invalid path target",()=>{

    const service =
      createService();


    expect(()=>{

      service.findPath(
        null,
        "unknown",
      );

    })
    .toThrow(
      KnowledgeGraphServiceError,
    );

  });



it("recommends concept", () => {

  const service =
    createService();


  const mastery: StudentMastery[] = [

    {
      conceptId:
        "math.division",

      mastery: 90,

      confidence: 90,
    },


    {
      conceptId:
        "math.fractions",

      mastery: 80,

      confidence: 80,
    },

  ];


  const result =
    service.recommend(
      mastery,
    );


  expect(
    result,
  )
  .not
  .toBeNull();


  expect(
    result?.id,
  )
  .toBe(
    "math.percentages",
  );

});



it("returns recommendations", () => {

  const service =
    createService();


  const mastery: StudentMastery[] = [

    {
      conceptId:
        "math.division",

      mastery: 90,

      confidence: 90,
    },


    {
      conceptId:
        "math.fractions",

      mastery: 80,

      confidence: 80,
    },

  ];


  const result =
    service.recommendAll(
      mastery,
    );


  expect(
    result.length,
  )
  .toBeGreaterThan(0);


  expect(
    result.map(
      (concept) => concept.id,
    ),
  )
  .toContain(
    "math.percentages",
  );

});



it("propagates mastery", () => {

  const service =
    createService();


  const mastery: StudentMastery[] = [

    {
      conceptId:
        "math.fractions",

      mastery: 40,

      confidence: 50,
    },

  ];


  const result =
    service.propagateMastery(
      "math.fractions",
      80,
      mastery,
    );


  expect(
    result.length,
  )
  .toBe(1);


  expect(
    result[0]?.mastery,
  )
  .toBe(80);


});


  it("throws for unknown mastery concept",()=>{

    const service =
      createService();


    expect(()=>{

      service.propagateMastery(
        "unknown",
        80,
        [],
      );

    })
    .toThrow(
      KnowledgeGraphServiceError,
    );

  });



  it("throws before confidence propagation without graph",()=>{

    const service =
      new KnowledgeGraphService();


    expect(()=>{

      service.propagateConfidence(
        "math.fractions",
        10,
        [],
      );

    })
    .toThrow(
      KnowledgeGraphServiceError,
    );

  });



});