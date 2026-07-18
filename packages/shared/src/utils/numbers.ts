
export function clamp(
  value: number,
  min: number,
  max: number
): number {
  return Math.min(
    Math.max(value, min),
    max
  );
}

export function average(
  values: number[]
): number {
  if (values.length === 0) {
    return 0;
  }

  return (
    values.reduce(
      (sum, value) =>
        sum + value,
      0
    ) / values.length
  );
}

export function percentage(
  value: number,
  total: number
): number {
  if (total === 0) {
    return 0;
  }

  return (value / total) * 100;
}

export function round(
  value: number,
  decimals = 2
): number {
  const multiplier =
    10 ** decimals;

  return (
    Math.round(
      value * multiplier
    ) / multiplier
  );
}