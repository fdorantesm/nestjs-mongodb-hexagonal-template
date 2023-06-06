export function arrayToMap<T extends { uuid: string }>(rows: T[]) {
  const map = new Map<string, T>();
  rows.forEach((row) => map.set(row.uuid, row));
  return map;
}
