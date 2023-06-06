export function trimArray<T>(elements: T[]): T[] {
  return [...new Set(elements)];
}
