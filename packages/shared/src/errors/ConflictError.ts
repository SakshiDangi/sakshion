
import { AppError } from "./AppError";

export class ConflictError
  extends AppError
{
  constructor(
    message = "Resource conflict",
    details?: unknown
  ) {
    super({
      code: "CONFLICT",

      message,

      statusCode: 409,

      details,
    });

    this.name =
      "ConflictError";
  }
}