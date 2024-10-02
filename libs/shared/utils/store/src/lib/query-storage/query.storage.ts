import { StateStorage, StorageValue } from 'zustand/middleware';

import { getHistory, getStateFromUrl, getUrl, safeReturn, stringify } from './utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TState = { [key: string]: any };

export type TQueryStorageOptions<T extends StorageValue<TState>, S extends StorageValue<TState> | undefined = T> = {
  partialize?: (state: T) => S;
  mergeWith?: (state: T) => T;
};

const defaultOptions = {
  partialize: <T extends StorageValue<TState>, S extends StorageValue<TState> | undefined = T>(state: T): S =>
    state as unknown as S,
  mergeWith: <T extends StorageValue<TState>>(state: T): T => state,
};

export const createQueryStorage = <T extends StorageValue<TState>, S extends StorageValue<TState> | undefined = T>({
  partialize = defaultOptions.partialize,
  mergeWith = defaultOptions.mergeWith,
}: TQueryStorageOptions<T, S> = defaultOptions): StateStorage => ({
  getItem: (key: string) => {
    const state = getStateFromUrl<T>(key);
    if (!state) {
      return null;
    }

    return safeReturn(() => JSON.stringify(mergeWith(state)));
  },
  setItem: (key: string, value): void => {
    const url = getUrl();
    if (!url) {
      return;
    }

    let result: S | undefined = undefined;
    const previous = url.search;
    const parsedValue = safeReturn<T>(() => JSON.parse(value));

    if (parsedValue) {
      result = partialize(parsedValue);
    }

    if (result !== undefined && Object.keys(result).length) {
      url.searchParams.set(key, stringify(result));
    } else {
      url.searchParams.delete(key);
    }

    if (url.search !== previous) {
      getHistory()?.replaceState(null, '', url);
    }
  },
  removeItem: (key: string): void => {
    const url = getUrl();
    if (!url) {
      return;
    }

    const previous = url.search;

    url.searchParams.delete(key);
    if (url.search !== previous) {
      getHistory()?.replaceState(null, '', url);
    }
  },
});
