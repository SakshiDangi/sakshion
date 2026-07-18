import type {
  BaseEntity,
  ID,
  Metadata,
} from "./common";

import type {
  ConceptReference,
} from "./concept";

import type {
  Status,
} from "../enums";

export interface Roadmap extends BaseEntity {
  studentId: ID;

  title: string;

  description?: string;

  status: Status;

  nodes: RoadmapNode[];

  recommendations: Recommendation[];

  metadata?: Metadata;
}

export interface RoadmapNode {
  id: ID;

  concept: ConceptReference;

  order: number;

  estimatedMinutes: number;

  completed: boolean;
}

export interface Recommendation {
  id: ID;

  message: string;

  priority: number;
}