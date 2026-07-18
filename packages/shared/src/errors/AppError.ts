
export interface AppErrorOptions {
  code: string;

  message: string;

  statusCode?: number;

  details?: unknown;

  cause?: unknown;
}

export class AppError extends Error {
  public readonly code: string;

  public readonly statusCode: number;

  public readonly details?: unknown;

  public override readonly cause?: unknown;

  constructor(options: AppErrorOptions) {
    super(options.message);

    this.name = "AppError";

    this.code = options.code;

    this.statusCode =
      options.statusCode ?? 500;

    this.details = options.details;

    this.cause = options.cause;

    Object.setPrototypeOf(
      this,
      new.target.prototype
    );
  }
}