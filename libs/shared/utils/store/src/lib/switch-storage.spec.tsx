import { expect } from 'vitest';
import { StorageValue } from 'zustand/middleware';

import { switchStorage as createSwitchStorage } from './switch-storage';

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

describe('switchStorage', () => {
  const setup = () => {
    const memoryStorage = createMemoryStorage();
    const queryStorage = createMemoryStorage();
    const switchStorage = createSwitchStorage(memoryStorage, queryStorage);

    return { switchStorage, memoryStorage, queryStorage };
  };

  it(`should set item into Memory Storage when item exists in Query Storage`, () => {
    const { switchStorage, memoryStorage, queryStorage } = setup();
    const prevKey = 'key-prev';
    const newKey = 'key-next';
    const key = 'key';
    const item: StorageValue<TState> = {
      state: {
        item1: 'item1',
      },
      version: 0,
    };
    const expectedMemoryStorageResult: StorageValue<TState> = {
      state: {
        item1: 'item1',
      },
      version: 0,
    };

    queryStorage.setRawItem(key, item);
    switchStorage(key, prevKey, newKey);
    const currentModeItem = memoryStorage.getRawItem(prevKey);
    const newModeItem = memoryStorage.getRawItem(newKey);
    const currentItem = memoryStorage.getRawItem(key);

    expect(currentModeItem).toEqual(expectedMemoryStorageResult);
    expect(newModeItem).toBeNull();
    expect(currentItem).toBeNull();
  });

  it(`should remove item from Memory Storage when item not exists in Query Storage`, () => {
    const prevKey = 'key-prev';
    const newKey = 'key-next';
    const { switchStorage, memoryStorage } = setup();
    const key = 'key';
    const item: StorageValue<TState> = {
      state: {
        item1: 'item1',
      },
      version: 0,
    };
    const expectedMemoryStorageResult: StorageValue<TState> = {
      state: {
        item1: 'item1',
      },
      version: 0,
    };

    memoryStorage.setRawItem(key, item);
    switchStorage(key, prevKey, newKey);
    const currentModeItem = memoryStorage.getRawItem(prevKey);
    const newModeItem = memoryStorage.getRawItem(newKey);
    const currentItem = memoryStorage.getRawItem(key);

    expect(currentModeItem).toBeNull();
    expect(newModeItem).toBeNull();
    expect(currentItem).toEqual(expectedMemoryStorageResult);
  });

  it(`should return null when item not exists in Memory Storage`, () => {
    const prevKey = 'key-prev';
    const newKey = 'key-next';
    const { switchStorage, memoryStorage } = setup();
    const key = 'key';

    const expectedResult = switchStorage(key, prevKey, newKey);
    const currentModeItem = memoryStorage.getRawItem(prevKey);
    const newModeItem = memoryStorage.getRawItem(newKey);

    expect(expectedResult).toBeNull();
    expect(currentModeItem).toBeNull();
    expect(newModeItem).toBeNull();
  });

  it(`should return previously stored item in Memory Storage when item exists in Memory Storage`, () => {
    const prevKey = 'key-prev';
    const newKey = 'key-next';
    const { switchStorage, memoryStorage } = setup();
    const key = 'key';
    const item: StorageValue<TState> = {
      state: {
        item1: 'item1',
      },
      version: 0,
    };
    const expectedMemoryStorageResult: StorageValue<TState> = {
      state: {
        item1: 'item1',
      },
      version: 0,
    };
    const expectedSwitchModeResult: StorageValue<TState> = {
      state: {
        item1: 'item1',
      },
      version: 0,
    };

    memoryStorage.setRawItem(newKey, item);
    const switchModeItem = switchStorage(key, prevKey, newKey);
    const currentModeItem = memoryStorage.getRawItem(prevKey);
    const newModeItem = memoryStorage.getRawItem(newKey);

    expect(switchModeItem).toEqual(expectedSwitchModeResult);
    expect(currentModeItem).toBeNull();
    expect(newModeItem).toEqual(expectedMemoryStorageResult);
  });
});
