import cloneDeep from 'lodash/cloneDeep';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import mergeWith from 'lodash/mergeWith';
import { State, StateCreator, StoreMutatorIdentifier } from 'zustand/vanilla';

import { compact } from './query-storage/utils';

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

function stringify(input: unknown, base64 = false, replacer?: (key: string, value: unknown) => unknown) {
  if (base64) {
    return encodeURIComponent(btoa(JSON.stringify(input, replacer)));
  }

  return encodeURIComponent(JSON.stringify(input, replacer));
}

function parse(str: string, base64 = false, reviver?: (key: string, value: unknown) => unknown) {
  if (base64) {
    return JSON.parse(atob(decodeURIComponent(str)), reviver);
  }

  return JSON.parse(decodeURIComponent(str), reviver);
}

const translateSelectionToState = <T>(selection: TDeepSelect<T>, state: T) => {
  if (!state || !isObject(state) || typeof state !== 'object') {
    return {};
  }

  return Object.keys(selection).reduce((acc, key) => {
    if (!(key in state)) {
      return acc;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = (selection as any)[key];
    if (typeof value === 'boolean') {
      if (value) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (acc as any)[key] = (state as any)[key];
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (acc as any)[key] = translateSelectionToState(value, (state as any)[key]);
    }
    return acc;
  }, {} as T);
};

const removeMappedPropsFromState = <T>(map: TDeepMap<T>, state: T) => {
  if (!state || !isObject(state) || typeof state !== 'object') {
    return state;
  }

  return Object.keys(state).reduce((acc, key) => {
    if (!(key in (map as object))) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (acc as any)[key] = removeMappedPropsFromState(map, (state as any)[key]);
      return acc;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = (map as any)[key];
    if (!isString(value)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (acc as any)[key] = removeMappedPropsFromState(value, (state as any)[key]);
    }
    return acc;
  }, {} as T);
};

const getMappedPropsFromState = <T extends State>(map: TDeepMap<T>, state: T) => {
  if (!state || !isObject(state) || typeof state !== 'object') {
    return {};
  }

  return Object.keys(map).reduce((acc, key) => {
    if (!(key in state)) {
      return acc;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = (map as any)[key];
    if (isString(value)) {
      if (value) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (acc as any)[value] = (state as any)[key];
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      acc = { ...acc, ...getMappedPropsFromState(value, (state as any)[key]) };
    }
    return acc;
  }, {});
};

const getMappedPropsFromStatePartial = <T extends State>(
  key: string,
  map: TDeepMap<T>,
  state: T,
  ref = { found: false }
) => {
  if (state === undefined || state === null) {
    return {};
  }

  return Object.keys(map).reduce((acc, currentKey) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const itemKey = (map as any)[currentKey];
    if (isString(itemKey)) {
      if (itemKey === key) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (acc as any)[currentKey] = isObject(state) ? (state as any)[key] : state;
        ref.found = true;
        return acc;
      }
    } else {
      if (!ref.found) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (acc as any)[currentKey] = getMappedPropsFromStatePartial(
          key,
          itemKey,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          isObject(state) ? (state as any)[key] : state,
          ref
        );
      }
    }
    return acc;
  }, {} as T);
};

const getStorageKeys = <T>(map: TDeepMap<T>, keys: string[] = []): string[] => {
  Object.keys(map).reduce((acc, key) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = (map as any)[key];
    if (isString(value)) {
      if (value) {
        keys.push(value);
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      keys.concat(getStorageKeys(value, keys).flat());
    }
    return keys;
  }, {});

  return keys.flat();
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
      return parse(match, key === defaultedOptions.key);
    }
    return null;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getSelectedState = (state: any, pathname: string) => {
    if (defaultedOptions.select) {
      const selection = defaultedOptions.select(pathname);
      // translate the selection to state
      const selectedState = translateSelectionToState(selection, state);
      return selectedState;
    }
    return state ?? {};
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getStateWithoutMappedProps = (state: any) => {
    if (defaultedOptions.map) {
      const newState = defaultedOptions.map();
      // translate the selection to state
      const selectedState = removeMappedPropsFromState(newState, state);
      return selectedState;
    }
    return state ?? {};
  };

  const getMappedPartialState = <T extends State>(key: string, state: T) => {
    if (defaultedOptions.map) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newState: any = defaultedOptions.map();
      return getMappedPropsFromStatePartial(key, newState, state);
    }
    return state ?? {};
  };

  const getMappedState = <T extends State>(state: T) => {
    if (defaultedOptions.map) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mappedOptions: any = defaultedOptions.map();
      return getMappedPropsFromState<T>(mappedOptions, state);
    }
    return state ?? {};
  };

  const getQueryParamsKeys = (keys: string[] = []) => {
    if (defaultedOptions.map) {
      const mappedOptions = defaultedOptions.map();
      return getStorageKeys(mappedOptions, keys);
    }

    return keys;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const initialize = (url: URL, initialState: any) => {
    try {
      const additionalKeys = getQueryParamsKeys();

      let state = getQueryParamsKeys([defaultedOptions.key])
        .map((key: string) => {
          const stateFromUrl = getStateFromUrl(url, key);
          if (stateFromUrl === undefined) {
            return {};
          }

          if (additionalKeys.includes(key)) {
            return getMappedPartialState(key, stateFromUrl);
          }

          return getSelectedState(stateFromUrl, url.pathname);
        })
        .reduce((acc, val) => mergeWith(acc, val), {});

      state = mergeWith(cloneDeep(initialState), state);

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
      const additionalKeys = getQueryParamsKeys();

      getQueryParamsKeys([defaultedOptions.key]).forEach((key: string) => {
        const stateFromUrl = get();
        if (stateFromUrl === undefined || stateFromUrl === null) {
          return;
        }

        if (additionalKeys.includes(key)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const result: any = getMappedState(compact(getSelectedState(stateFromUrl, url.pathname), initialState));

          if (result !== undefined && Object.keys(result).length && result[key] !== undefined) {
            url.searchParams.set(key, stringify(result[key], false));
          } else {
            url.searchParams.delete(key);
          }

          return;
        }

        const result = compact(getStateWithoutMappedProps(getSelectedState(stateFromUrl, url.pathname)), initialState);
        if (result !== undefined && Object.keys(result).length) {
          url.searchParams.set(key, stringify(result, true));
        } else {
          url.searchParams.delete(key);
        }
      });

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
