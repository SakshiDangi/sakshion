import {
  pgTable,
  uuid,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { concepts } from "./concept";
import { id, timestamps } from "./common";

export const conceptEdges = pgTable(
  "concept_edges",
  {
    id: id(),

    parentConceptId: uuid("parent_concept_id")
      .notNull()
      .references(() => concepts.id, {
        onDelete: "cascade",
      }),

    childConceptId: uuid("child_concept_id")
      .notNull()
      .references(() => concepts.id, {
        onDelete: "cascade",
      }),

    ...timestamps,
  },
  (table) => ({
    uniqueEdge: uniqueIndex("concept_edge_unique").on(
      table.parentConceptId,
      table.childConceptId
    ),
  })
);