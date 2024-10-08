import type {} from '@redux-devtools/extension';
import isEqual from 'lodash/isEqual';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { defaultState, TDataStore, TSchema } from './data.model';
import { TDateSetsDefaultValues } from './date-sets.model';

export const useDataSetsStore = create<TDataStore>()(
  devtools((set) => ({
    ...defaultState,
    updateDataSets: (dataSets: TDateSetsDefaultValues | undefined) =>
      set((state) => (isEqual(dataSets, state.dataSets) ? state : { dataSets })),
    changeSchema: (schema: TSchema) => set(() => ({ schema })),
  }))
);

export const useDataSets = () => {
  return useDataSetsStore((state) => state);
};
