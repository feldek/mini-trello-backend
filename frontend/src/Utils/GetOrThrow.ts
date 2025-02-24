import {TNullable} from "./TNullable";

const getOrThrow = <T>(
  value: TNullable<T>,
  context = "-",
): T => {
  if (undefined === value || null === value) {
    throw Error(`Value not present. Context: '${context}'`);
  }

  return value;
};

export {getOrThrow}