import type {
  PaginationRequest,
} from "./pagination";

export type SortDirection =
  | "asc"
  | "desc";

export interface SearchRequest {
  query?: string;
}

export interface SortRequest {
  sortBy?: string;

  direction?: SortDirection;
}

export interface ListRequest
  extends PaginationRequest,
    SearchRequest,
    SortRequest {}