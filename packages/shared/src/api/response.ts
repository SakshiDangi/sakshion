import type {
  PaginationMeta,
} from "./pagination";

export interface ApiError {
  code: string;

  message: string;

  details?: unknown;
}

export interface ApiMeta {
  requestId?: string;

  timestamp?: string;

  durationMs?: number;

  pagination?: PaginationMeta;
}

export interface ApiSuccess<T> {
  success: true;

  data: T;

  meta?: ApiMeta;
}

export interface ApiFailure {
  success: false;

  error: ApiError;

  meta?: ApiMeta;
}

export type ApiResponse<T> =
  | ApiSuccess<T>
  | ApiFailure;