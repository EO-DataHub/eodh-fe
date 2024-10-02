import { StateStorage, StorageValue } from 'zustand/middleware';

import { TStorage } from './storage.model';

export const switchStorage =
  <T>(storage: TStorage, queryStorage: StateStorage) =>
  (currentKey: string, prevKey: string, nextKey: string): StorageValue<T> | null => {
    const currentItem = queryStorage.getItem(currentKey) as string;

    if (currentItem) {
      storage.setItem(prevKey, currentItem);
    } else {
      storage.removeItem(prevKey);
    }

    const prevItem = storage.getItem(nextKey);
    if (prevItem) {
      return JSON.parse(prevItem);
    }

    return null;
  };
