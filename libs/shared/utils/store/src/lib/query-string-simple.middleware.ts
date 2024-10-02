import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import isObject from 'lodash/isObject';
import mergeWith from 'lodash/mergeWith';
import { StateCreator, StoreMutatorIdentifier } from 'zustand/vanilla';

import { parse, stringify } from './query-storage/utils';

type TDeepSelect<T> = T extends object
  ? {
      [P in keyof T]?: TDeepSelect<T[P]> | boolean;
    }
  : boolean;

type TDeepMap<T> = T extends object
  ? {
      [P in keyof T]?: TDeepMap<T[P]> | string;
    }
  : string;

export interface IQueryStringOptions<T> {
  url?: string;
  select?: (pathname: string) => TDeepSelect<T>;
  map?: () => TDeepMap<T>;
  key?: string;
}

type TQueryString = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
  initializer: StateCreator<T, Mps, Mcs>,
  options?: IQueryStringOptions<T>
) => StateCreator<T, Mps, Mcs>;

type TQueryStringImpl = <T>(
  storeInitializer: StateCreator<T, [], []>,
  options?: IQueryStringOptions<T>
) => StateCreator<T, [], []>;

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

const queryStringImpl: TQueryStringImpl = (fn, options?) => (set, get, api) => {
  const defaultedOptions = {
    key: 'state',
    ...options,
  };
  const { url } = defaultedOptions;

  const getStateFromUrl = (url: URL, key = defaultedOptions.key) => {
    const match = url.searchParams.get(key);
    if (match) {
      return parse(match);
    }
    return null;
  };

  const initialize = <T>(url: URL, initialState: T) => {
    try {
      const stateFromUrl = getStateFromUrl(url, defaultedOptions.key);
      const state = mergeWith(cloneDeep(initialState), stateFromUrl);

      set(state, true);
      return state;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return initialState;
    }
  };

  if (typeof window !== 'undefined') {
    const initialState = cloneDeep(
      fn(
        (...args) => {
          set(...args);
          setQuery();
        },
        get,
        api
      )
    );

    const setQuery = () => {
      const url = new URL(window.location.href);
      const previous = url.search;
      const stateFromUrl = get();
      if (stateFromUrl === undefined || stateFromUrl === null) {
        return;
      }

      const result = compact(stateFromUrl, initialState as typeof stateFromUrl);
      if (result !== undefined && Object.keys(result).length) {
        url.searchParams.set(defaultedOptions.key, stringify(result));
      } else {
        url.searchParams.delete(defaultedOptions.key);
      }

      if (url.search !== previous) {
        // eslint-disable-next-line no-restricted-globals
        history.replaceState(history.state, '', url);
      }
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!api.__ZUSTAND_QUERYSTRING_INIT__) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      api.__ZUSTAND_QUERYSTRING_INIT__ = true;
      let previousPathname = '';
      const cb = () => {
        // eslint-disable-next-line no-restricted-globals
        if (location.pathname !== previousPathname) {
          // eslint-disable-next-line no-restricted-globals
          previousPathname = location.pathname;
          setTimeout(setQuery, 100);
        }
        requestAnimationFrame(cb);
      };
      requestAnimationFrame(cb);
    }

    const originalSetState = api.setState;
    api.setState = (...args) => {
      originalSetState(...args);
      setQuery();
    };

    return initialize(new URL(window.location.href), initialState);
  } else if (url) {
    return initialize(new URL(url, 'http://localhost'), fn(set, get, api));
  }

  return fn(set, get, api);
};

export const querystring = queryStringImpl as unknown as TQueryString;
