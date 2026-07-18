
import { AppError } from "./AppError";

export class ValidationError
  extends AppError
{
  constructor(
    message = "Validation failed",
    details?: unknown
  ) {
    super({
      code: "VALIDATION_ERROR",

      message,

      statusCode: 400,

      details,
    });

    this.name =
      "ValidationError";
  }
}