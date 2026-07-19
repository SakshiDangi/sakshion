import type { ConceptEdge } from "../models";
import { RelationshipType } from "../models";

export const edges: ConceptEdge[] = [
  {
    source: "math.division",
    target: "math.fractions",
    relationship: RelationshipType.PREREQUISITE,
  },
  {
    source: "math.fractions",
    target: "math.equivalent-fractions",
    relationship: RelationshipType.PREREQUISITE,
  },
  {
    source: "math.equivalent-fractions",
    target: "math.percentages",
    relationship: RelationshipType.PREREQUISITE,
  },
];