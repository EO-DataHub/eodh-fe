import type {} from '@redux-devtools/extension';
import { createQueryStorage } from '@ukri/shared/utils/store';
import isEqual from 'lodash/isEqual';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import { defaultState, TDataSetsDefaultValues, TDataSetsStore, TDataSetsStoreState, TSchema } from './data-sets.model';

export const useDataSetsStore = create<TDataSetsStore>()(
  devtools(
    persist(
      (set) => ({
        ...defaultState,
        updateDataSets: (dataSets: TDataSetsDefaultValues | undefined) =>
          set((state) => (isEqual(dataSets, state.dataSets) ? state : { dataSets })),
        changeSchema: (schema: TSchema) => set(() => ({ schema })),
      }),
      {
        name: 'data-sets',
        storage: createJSONStorage(() => createQueryStorage()),
        partialize: (state) => ({
          state: state.state,
          schema: state.schema,
          dataSets: state.dataSets,
        }),
      }
    )
  )
);

export const getDataSetsStoreState = (): TDataSetsStoreState => {
  const { updateDataSets, changeSchema, ...rest } = useDataSetsStore.getState();

  return { ...rest };
};

export const useDataSets = (): TDataSetsStore => {
  return useDataSetsStore((state) => state);
};
