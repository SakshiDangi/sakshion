export class PropagationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PropagationError";
  }
}