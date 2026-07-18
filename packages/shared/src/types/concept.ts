import type {
  BaseEntity,
  ID,
  Metadata,
} from "./common";

import type { DifficultyLevel } from "../enums";

export interface Concept extends BaseEntity {
  title: string;

  description?: string;

  difficulty: DifficultyLevel;

  objectives: LearningObjective[];

  prerequisites: ConceptReference[];

  metadata?: Metadata;
}

export interface ConceptReference {
  id: ID;

  title: string;
}

export interface LearningObjective {
  id: ID;

  description: string;
}