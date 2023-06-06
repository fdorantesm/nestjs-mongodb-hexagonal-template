import { Json } from '@app/common';

export function omitProps(obj: Json, keysToOmit: string[]) {
  return Object.keys(obj).reduce((result, key) => {
    if (!keysToOmit.includes(key)) {
      result[key] = obj[key];
    }
    return result;
  }, {});
}
