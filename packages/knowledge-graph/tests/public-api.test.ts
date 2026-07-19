import { describe, expect, it } from "vitest";

import {
  KnowledgeGraphService,
  RelationshipType,
} from "../src";


describe("Public API",()=>{

  it("exports service",()=>{

    const service =
      new KnowledgeGraphService();


    expect(service)
      .toBeDefined();

  });


  it("exports models",()=>{

    expect(
      RelationshipType.PREREQUISITE,
    )
    .toBeDefined();

  });

});