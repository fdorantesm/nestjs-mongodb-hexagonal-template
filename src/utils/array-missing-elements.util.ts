export function findMissingElements(array1, array2) {
  return array1.filter((element) => !array2.includes(element));
}
