import { expect } from 'vitest';
import { createJSONStorage, PersistStorage, StorageValue } from 'zustand/middleware';

import { createDoubleStorage } from './double.storage';

const createMemoryStorage = () => {
  const store = new Map<string, string>();

  const instance = {
    getItem: (key: string) => store.get(key) || null,
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
    removeItem: (key: string) => store.delete(key),
    clear: () => store.clear(),
  };

  return {
    ...instance,
    getRawItem: (key: string) => JSON.parse(instance.getItem(key) || 'null'),
    setRawItem: (key: string, value: StorageValue<unknown>) => instance.setItem(key, JSON.stringify(value)),
  };
};

type TState = { [key: string]: string };

describe('Switch Mode Storage', () => {
  const setup = () => {
    const memoryStorage = createMemoryStorage();
    const queryStorage = createMemoryStorage();
    const doubleStorage = createDoubleStorage(memoryStorage, queryStorage);
    const storage = createJSONStorage(() => doubleStorage) as PersistStorage<TState>;

    return { jsonStorage: storage, memoryStorage, queryStorage };
  };

  it('should return the same item', () => {
    const { jsonStorage } = setup();
    const key = 'key';
    const item: StorageValue<TState> = {
      state: {
        item1: 'item1',
      },
      version: 0,
    };
    const expectedResult: StorageValue<TState> = {
      state: {
        item1: 'item1',
      },
      version: 0,
    };

    jsonStorage.setItem(key, item);

    expect(jsonStorage.getItem(key)).toEqual(expectedResult);
  });

  it('should return item from Query Storage when item is in Query Storage', () => {
    const { jsonStorage, memoryStorage, queryStorage } = setup();
    const key = 'key';
    const item: StorageValue<TState> = {
      state: {
        item1: 'item1',
      },
      version: 0,
    };
    const expectedResult: StorageValue<TState> = {
      state: {
        item1: 'item1',
      },
      version: 0,
    };

    memoryStorage.setRawItem(key, item);
    queryStorage.removeItem(key);

    expect(jsonStorage.getItem(key)).toEqual(expectedResult);
    expect(queryStorage.getRawItem(key)).toEqual(null);
    expect(memoryStorage.getRawItem(key)).toEqual(expectedResult);
  });

  it('should return item from Memory Storage when item is not in Query Storage', () => {
    const { jsonStorage } = setup();
    const key = 'key';
    const item: StorageValue<TState> = {
      state: {
        item1: 'item1',
      },
      version: 0,
    };
    const expectedResult: StorageValue<TState> = {
      state: {
        item1: 'item1',
      },
      version: 0,
    };

    jsonStorage.setItem(key, item);

    expect(jsonStorage.getItem(key)).toEqual(expectedResult);
  });

  it('should remove item from all Storages', () => {
    const { jsonStorage, memoryStorage, queryStorage } = setup();
    const key = 'key';
    const item: StorageValue<TState> = {
      state: {
        item1: 'item1',
      },
      version: 0,
    };

    jsonStorage.setItem(key, item);
    jsonStorage.removeItem(key);

    expect(jsonStorage.getItem(key)).toBeNull();
    expect(queryStorage.getItem(key)).toBeNull();
    expect(memoryStorage.getItem(key)).toBeNull();
  });
});
