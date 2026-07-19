import { RelationshipType } from "./RelationshipType";

export interface ConceptEdge {
  /**
   * Source concept.
   */
  source: string;

  /**
   * Target concept.
   */
  target: string;

  /**
   * Relationship between concepts.
   */
  relationship: RelationshipType;
}