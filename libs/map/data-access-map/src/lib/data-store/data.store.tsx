import type {} from '@redux-devtools/extension';
import isEqual from 'lodash/isEqual';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import { defaultState, TDataStore, TSchema } from './data.model';
import { searchSchema, TSearchData } from './schema/search/search.schema';
import { TSearchDefaultValues } from './search.model';
import { dataStorage, dataStorageName, toggleDataStorage } from './storage/data.storage';

const useDataStore = create<TDataStore>()(
  devtools(
    persist<TDataStore>(
      (set) => ({
        ...defaultState,
        updateData: (data: TSearchData | undefined) =>
          set((state) => (data ? { ...state, data: { ...data } } : { ...state, data: undefined })),
        updateState: (data: TSearchData | TSearchDefaultValues | undefined) =>
          set((state) => (isEqual(data, state.state) ? state : { ...state, state: data ? { ...data } : state.state })),
        toggleMode: () => set((state): TDataStore => toggleDataStorage(state)),
      }),
      {
        name: dataStorageName,
        storage: createJSONStorage<TDataStore>(() => dataStorage),
      }
    )
  )
);

const getSchema = (schema: TSchema) => {
  switch (schema) {
    case 'action-creator': {
      return {
        name: schema,
        schema: searchSchema,
      };
    }

    case 'search': {
      return {
        name: schema,
        schema: searchSchema,
      };
    }
  }
};

export const useData = () => {
  return useDataStore((state) => {
    const newSchema = getSchema(state.schema);
    return {
      ...state,
      schema: newSchema,
    };
  });
};

export const useMode = () => {
  return useDataStore((state) => ({
    mode: state.mode,
    toggleMode: state.toggleMode,
  }));
};
