
export function pick<
  T extends object,
  K extends keyof T
>(
  object: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;

  for (const key of keys) {
    result[key] = object[key];
  }

  return result;
}

export function omit<
  T extends object,
  K extends keyof T
>(
  object: T,
  keys: K[]
): Omit<T, K> {
  const result = {
    ...object,
  } as T;

  for (const key of keys) {
    delete result[key];
  }

  return result as Omit<T, K>;
}

export function isEmpty(
  value: unknown
): boolean {
  if (value === null) {
    return true;
  }

  if (value === undefined) {
    return true;
  }

  if (typeof value === "string") {
    return value.trim().length === 0;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (
    typeof value === "object"
  ) {
    return (
      Object.keys(
        value
      ).length === 0
    );
  }

  return false;
}