export function replaceArrayElement<T>(
  array: T[],
  search: (element: T) => boolean,
  newValue: T,
): T[] {
  const index = array.findIndex(search);

  if (index !== -1) {
    const newArray = [...array];
    newArray.splice(index, 1, newValue);
    return newArray;
  }

  return array;
}
