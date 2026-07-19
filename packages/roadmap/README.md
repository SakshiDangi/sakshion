# @sakshion/roadmap

The Roadmap package creates personalized learning paths.

## Responsibilities

- Concept sequencing
- Unlock management
- Recommendation ranking
- Completion estimation
- Roadmap validation


## Architecture


Digital Twin

↓

RoadmapService

↓

Planner

↓

Recommendation

↓

Personalized Learning Path



## Public API


```ts
RoadmapService.generate()

RoadmapService.get()

RoadmapService.update()

RoadmapService.recommendNext()

RoadmapService.estimateCompletion()