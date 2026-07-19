export class TraversalError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "TraversalError";
  }
}