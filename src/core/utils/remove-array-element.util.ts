export function removeArrayElement<T>(array: T[], callback: (element: T) => boolean): T[] {
  const index = array.findIndex(callback);

  if (index !== -1) {
    const newArray = [...array];
    newArray.splice(index, 1);
    return newArray;
  }

  return array;
}
