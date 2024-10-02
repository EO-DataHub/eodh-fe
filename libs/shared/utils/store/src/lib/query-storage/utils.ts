import isEqual from 'lodash/isEqual';
import isObject from 'lodash/isObject';

export const stringify = (input: unknown, replacer?: (key: string, value: unknown) => unknown) => {
  return encodeURIComponent(btoa(JSON.stringify(input, replacer)));
};

export const parse = (str: string, reviver?: (key: string, value: unknown) => unknown) => {
  return JSON.parse(atob(decodeURIComponent(str)), reviver);
};

export const getHistory = () => {
  if (typeof window !== 'undefined') {
    return window.history;
  }

  return null;
};

export const getUrl = () => {
  if (typeof window !== 'undefined') {
    return new URL(window.location.href);
  }

  return null;
};

export const getStateFromUrl = <T>(key: string): T | null => {
  const url = getUrl();
  if (!url) {
    return null;
  }

  const match = url.searchParams.get(key);
  if (match) {
    return parse(match);
  }

  return null;
};

export const safeReturn = <T>(fn: () => T) => {
  try {
    return fn();
  } catch (e: unknown) {
    return null;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const compact = <T extends { [key: string]: any }>(newState: T, initialState: T): T => {
  const output: T = {} as T;

  Object.keys(newState).forEach((key) => {
    if (
      newState[key] !== null &&
      newState[key] !== undefined &&
      !!initialState &&
      isObject(initialState) &&
      typeof newState[key] !== 'function' &&
      !isEqual(newState[key], initialState[key])
    ) {
      if (typeof newState[key] === 'object' && !Array.isArray(newState[key])) {
        const value = compact<T>(newState[key], initialState[key]);
        if (value && Object.keys(value).length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (output as any)[key] = value;
        }
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (output as any)[key] = newState[key];
      }
    }
  });

  return output;
};
