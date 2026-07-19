# @sakshion/knowledge-graph

                 KnowledgeGraphService
                           │
      ┌────────────────────┼──────────────────┐
      │                    │                  │
      ▼                    ▼                  ▼
 Recommendation      Traversal        Propagation
      │                    │                  │
      └──────────────┬─────┘                  │
                     ▼                        ▼
                 ConceptGraph         Student Mastery
                     ▲
                     │
              GraphBuilder
                     ▲
                     │
            GraphLoader / Store