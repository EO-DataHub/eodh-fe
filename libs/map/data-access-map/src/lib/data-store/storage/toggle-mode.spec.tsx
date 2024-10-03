import { expect } from 'vitest';
import { StorageValue } from 'zustand/middleware';

import { TDataStore } from '../data.model';
import { toggleMode as createToggleStorage } from './toggle-mode';

type TData = {
  dataSets: undefined | { [key: string]: string };
  date: undefined | { [key: string]: string };
  aoi: undefined | { [key: string]: string };
};

const defaultValues: TData = {
  dataSets: undefined,
  date: undefined,
  aoi: undefined,
};

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

type TState = Omit<TDataStore<TData, TData>, 'data' | 'updateData' | 'updateState' | 'toggleMode'>;

describe('toggleMode', () => {
  const setup = (defaultState: Partial<TState> = {}, storageName = 'state') => {
    const memoryStorage = createMemoryStorage();
    const queryStorage = createMemoryStorage();
    const toggleMode = createToggleStorage<TData, TData>(memoryStorage, queryStorage)(defaultState, storageName);

    return { toggleMode, memoryStorage, queryStorage };
  };

  it(`should switch to next mode when item does not exists in Memory Storage`, () => {
    const { toggleMode, memoryStorage } = setup();
    const currentMode: TState['mode'] = 'search';
    const currentState: TState = {
      mode: 'search',
      schema: 'search',
      state: defaultValues,
    };
    const nextMode = 'action-creator';
    const nextSchema = 'action-creator';

    const result = toggleMode(currentState);

    expect(result.mode).toEqual(nextMode);
    expect(result.schema).toEqual(nextSchema);
    expect(memoryStorage.getRawItem(currentMode)).toBeNull();
  });

  it(`should switch to next mode when item exists in Memory Storage`, () => {
    const { toggleMode, memoryStorage } = setup();
    const prevMode: TState['mode'] = 'action-creator';
    const currentState: TState = {
      mode: 'search',
      schema: 'search',
      state: defaultValues,
    };
    const prevStorageState: StorageValue<Partial<TState>> = {
      state: {
        state: {
          dataSets: {
            item1: 'item1',
          },
          date: {
            date1: 'date1',
            date2: 'date2',
          },
          aoi: {
            aoi: 'aoi',
          },
        },
      },
      version: 0,
    };
    const nextMode = 'action-creator';
    const nextSchema = 'action-creator';

    memoryStorage.setRawItem(prevMode, prevStorageState);
    const result = toggleMode(currentState);

    expect(result.mode).toEqual(nextMode);
    expect(result.schema).toEqual(nextSchema);
    expect(memoryStorage.getRawItem(prevMode)).toEqual(prevStorageState);
  });

  describe('while switching to next mode', () => {
    it(`should clear data when item does not exists in Memory Storage`, () => {
      const { toggleMode, memoryStorage } = setup();
      const currentMode = 'search';
      const currentState: TState = {
        mode: 'search',
        schema: 'search',
        state: defaultValues,
      };

      const result = toggleMode(currentState);

      expect(memoryStorage.getRawItem(currentMode)).toBeNull();
      expect(result.state).toBe(undefined);
    });

    it(`should return prev state when item exists in Memory Storage`, () => {
      const { toggleMode, memoryStorage } = setup();
      const prevMode = 'action-creator';
      const currentState: TState = {
        mode: 'search',
        schema: 'search',
        state: defaultValues,
      };
      const prevStorageState: StorageValue<Partial<TState>> = {
        state: {
          state: {
            dataSets: {
              item1: 'item1',
            },
            date: {
              date1: 'date1',
              date2: 'date2',
            },
            aoi: {
              aoi: 'aoi',
            },
          },
        },
        version: 0,
      };
      const expectedState: TState = {
        mode: 'action-creator',
        schema: 'action-creator',
        state: {
          dataSets: {
            item1: 'item1',
          },
          date: {
            date1: 'date1',
            date2: 'date2',
          },
          aoi: {
            aoi: 'aoi',
          },
        },
      };

      memoryStorage.setRawItem(prevMode, prevStorageState);
      const result = toggleMode(currentState);

      expect(result).toEqual(expectedState);
      expect(memoryStorage.getRawItem(prevMode)).toEqual(prevStorageState);
    });
  });
});
