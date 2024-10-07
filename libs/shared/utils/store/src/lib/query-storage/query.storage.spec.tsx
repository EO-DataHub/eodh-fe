import { expect, vi } from 'vitest';
import { StorageValue } from 'zustand/middleware';

import { createQueryStorage, TQueryStorageOptions } from './query.storage';
import { getStateFromUrl } from './utils';

type TState = { [key: string]: string };

const getUrlMock = vi.fn(() => new URL('http://localhost:4200'));
const getStateFromUrlMock = vi.fn<[], TState | null>(() => null);

vi.mock('./utils', async (importActual) => {
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(await (importActual as any)()),
    getStateFromUrl: vi.fn(() => getStateFromUrlMock()),
    getUrl: vi.fn(() => getUrlMock()),
  };
});

describe('queryStorage', () => {
  const setup = (options?: TQueryStorageOptions<StorageValue<TState>>) => {
    vi.clearAllMocks();
    const queryStorage = createQueryStorage<StorageValue<TState>>(options);

    return { queryStorage };
  };

  it(`should not return item if item not exists in url`, () => {
    const { queryStorage } = setup();
    const key = 'key';

    getStateFromUrlMock.mockReturnValue(null);

    expect(queryStorage.getItem(key)).toBeNull();
    expect(getStateFromUrl).toHaveBeenCalledTimes(1);
  });

  it(`should return item when item exists in url and is valid item`, () => {
    const { queryStorage } = setup();
    const key = 'key';
    const item = {
      test: 'test',
    };
    const expectedResult = JSON.stringify({
      test: 'test',
    });

    getStateFromUrlMock.mockReturnValue(item);

    expect(queryStorage.getItem(key)).toEqual(expectedResult);
    expect(getStateFromUrl).toHaveBeenCalledTimes(1);
  });

  it(`should map item when item exists in url and is valid JSON string`, () => {
    const mergeWith = vi.fn().mockReturnValue({});
    const { queryStorage } = setup({ mergeWith });
    const key = 'key';
    const item = {
      test: 'test',
    };
    const expectedResult = JSON.stringify({});

    getStateFromUrlMock.mockReturnValue(item);

    expect(queryStorage.getItem(key)).toEqual(expectedResult);
    expect(getStateFromUrl).toHaveBeenCalledTimes(1);
    expect(mergeWith).toHaveBeenCalledTimes(1);
  });

  // it('should return item with default state when default state is different from item', () => {
  //   const defaultState = {
  //     initialItem: 'initialItem1',
  //   };
  //   const { jsonStorage, memoryStorage, queryStorage } = setup(defaultState);
  //   const key = 'key';
  //   const item: StorageValue<TState> = {
  //     state: {
  //       item1: 'item1',
  //     },
  //     version: 0,
  //   };
  //   const expectedResult: StorageValue<TState> = {
  //     state: {
  //       item1: 'item1',
  //       initialItem: 'initialItem1',
  //     },
  //     version: 0,
  //   };
  //
  //   queryStorage.setItem(key, JSON.stringify(item));
  //   const expectedMemoryStorageItem = JSON.parse(memoryStorage.getItem(key) || 'null');
  //
  //   expect(jsonStorage.getItem(key)).toEqual(expectedResult);
  //   expect(expectedMemoryStorageItem).toEqual(null);
  // });

  // it('should not set value when value is empty', () => {
  //   const { jsonStorage, memoryStorage, queryStorage } = setup();
  //   const key = 'key';
  //
  //   jsonStorage.setItem(key, undefined as never);
  //
  //   expect(jsonStorage.getItem(key)).toBeNull();
  //   expect(queryStorage.getItem(key)).toBeNull();
  //   expect(memoryStorage.getItem(key)).toBeNull();
  // });
  //
  // it('should not set value when value is empty string', () => {
  //   const { jsonStorage, memoryStorage, queryStorage } = setup();
  //   const key = 'key';
  //
  //   jsonStorage.setItem(key, '' as never);
  //
  //   expect(jsonStorage.getItem(key)).toBeNull();
  //   expect(queryStorage.getItem(key)).toBeNull();
  //   expect(memoryStorage.getItem(key)).toBeNull();
  // });
});
