
import { AppError } from "./AppError";

export class UnauthorizedError
  extends AppError
{
  constructor(
    message = "Unauthorized"
  ) {
    super({
      code: "UNAUTHORIZED",

      message,

      statusCode: 401,
    });

    this.name =
      "UnauthorizedError";
  }
}