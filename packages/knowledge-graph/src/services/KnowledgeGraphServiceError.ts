export class KnowledgeGraphServiceError extends Error {
  constructor(message: string) {
    super(message);

    this.name =
      "KnowledgeGraphServiceError";

    Object.setPrototypeOf(
      this,
      KnowledgeGraphServiceError.prototype,
    );
  }
}