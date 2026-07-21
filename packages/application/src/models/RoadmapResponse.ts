/**
 * Single roadmap node.
 */
export interface RoadmapNode {
  id: string;

  title: string;

  completed: boolean;

  unlocked: boolean;
}

/**
 * Student learning roadmap.
 */
export interface RoadmapResponse {
  /**
   * Overall request status.
   */
  success: boolean;

  /**
   * Roadmap identifier.
   */
  roadmapId: string;

  /**
   * Progress percentage.
   */
  progress: number;

  /**
   * Learning path.
   */
  nodes: RoadmapNode[];
}