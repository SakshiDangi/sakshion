
export function isExpired(
  date: Date | string,
  now: Date = new Date()
): boolean {
  return new Date(date).getTime() < now.getTime();
}

export function minutesBetween(
  start: Date | string,
  end: Date | string
): number {
  const difference =
    new Date(end).getTime() -
    new Date(start).getTime();

  return Math.floor(
    difference / (1000 * 60)
  );
}

export function daysBetween(
  start: Date | string,
  end: Date | string
): number {
  const difference =
    new Date(end).getTime() -
    new Date(start).getTime();

  return Math.floor(
    difference / (1000 * 60 * 60 * 24)
  );
}

export function formatDate(
  date: Date | string,
  locale = "en-US"
): string {
  return new Intl.DateTimeFormat(
    locale
  ).format(new Date(date));
}