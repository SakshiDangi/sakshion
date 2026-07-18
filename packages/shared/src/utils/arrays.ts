
export function unique<T>(
  values: T[]
): T[] {
  return [...new Set(values)];
}

export function chunk<T>(
  values: T[],
  size: number
): T[][] {
  if (size <= 0) {
    throw new Error(
      "Chunk size must be greater than zero"
    );
  }

  const result: T[][] = [];

  for (
    let index = 0;
    index < values.length;
    index += size
  ) {
    result.push(
      values.slice(
        index,
        index + size
      )
    );
  }

  return result;
}

export function groupBy<
  T,
  K extends PropertyKey
>(
  values: T[],
  getKey: (value: T) => K
): Record<K, T[]> {
  return values.reduce(
    (groups, value) => {
      const key = getKey(value);

      if (!groups[key]) {
        groups[key] = [];
      }

      groups[key].push(value);

      return groups;
    },
    {} as Record<K, T[]>
  );
}