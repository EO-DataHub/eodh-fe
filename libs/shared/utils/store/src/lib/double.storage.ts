import { StateStorage } from 'zustand/middleware';

import { TStorage } from './storage.model';

export const createDoubleStorage = (memoryStorage: TStorage, queryStorage: StateStorage): StateStorage => ({
  getItem: (key) => {
    const item = queryStorage.getItem(key) as string;

    return item ? item : memoryStorage.getItem(key);
  },
  setItem: (key, value) => {
    queryStorage.setItem(key, value);
  },
  removeItem: (key): void => {
    queryStorage.removeItem(key);
    memoryStorage.removeItem(key);
  },
});
