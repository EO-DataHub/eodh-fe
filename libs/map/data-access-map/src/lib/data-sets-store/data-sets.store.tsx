import type {} from '@redux-devtools/extension';
import isEqual from 'lodash/isEqual';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { defaultState, TDataSetsStore, TDataSetsStoreState, TDateSetsDefaultValues, TSchema } from './date-sets.model';

export const useDataSetsStore = create<TDataSetsStore>()(
  devtools((set) => ({
    ...defaultState,
    updateDataSets: (dataSets: TDateSetsDefaultValues | undefined) =>
      set((state) => (isEqual(dataSets, state.dataSets) ? state : { dataSets })),
    changeSchema: (schema: TSchema) => set(() => ({ schema })),
  }))
);

export const getDataSetsStoreState = (): TDataSetsStoreState => {
  const { updateDataSets, changeSchema, ...rest } = useDataSetsStore.getState();

  return { ...rest };
};

export const useDataSets = () => {
  return useDataSetsStore((state) => state);
};
