export type ID = string;

export type UUID = string;

export type Timestamp = string;

export type Metadata = Record<string, unknown>;

export type Dictionary<T> = Record<string, T>;

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export interface Pagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface AuditInfo {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface BaseEntity extends AuditInfo {
  id: ID;
}

export interface PaginatedResult<T> {
  items: T[];
  pagination: Pagination;
}