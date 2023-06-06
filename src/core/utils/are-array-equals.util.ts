import * as isEqual from 'lodash/isEqual';

export function areArraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  return arr1.every((obj, index) => isEqual(obj, arr2[index]));
}
