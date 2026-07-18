import type { AppError } from "../errors";

export interface Success<T> {
  success: true;

  data: T;
}

export interface Failure<
  E = AppError
> {
  success: false;

  error: E;
}

export type Result<
  T,
  E = AppError
> =
  | Success<T>
  | Failure<E>;

export function ok<T>(
  data: T
): Success<T> {
  return {
    success: true,

    data,
  };
}

export function err<
  E = AppError
>(
  error: E
): Failure<E> {
  return {
    success: false,

    error,
  };
}

export function isSuccess<T>(
  result: Result<T>
): result is Success<T> {
  return result.success;
}

export function isFailure<
  T,
  E
>(
  result: Result<T, E>
): result is Failure<E> {
  return !result.success;
}