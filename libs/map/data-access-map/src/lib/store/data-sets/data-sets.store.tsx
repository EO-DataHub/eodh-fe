import type {} from '@redux-devtools/extension';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { TDataSetsDefaultValues } from './data-sets.default-values';
import { defaultState, TDataSetsState, TDataSetsStore, TDataSetsStoreState, TSchema } from './data-sets.model';

export const useDataSetsStore = create<TDataSetsStore>()(
  devtools((set) => ({
    ...defaultState,
    updateDataSets: (dataSets: Omit<TDataSetsDefaultValues, 'status'> | undefined) =>
      set((state) => {
        return isEqual(dataSets, state.dataSets)
          ? state
          : { dataSets: dataSets ? { ...cloneDeep(dataSets), status: 'updated' } : defaultState.dataSets };
      }),
    changeSchema: (schema: TSchema) => set(() => ({ schema })),
    changeState: (state: TDataSetsState) => set(() => ({ state })),
  }))
);

export const getDataSetsStoreState = (): TDataSetsStoreState => {
  const { updateDataSets, changeSchema, ...rest } = useDataSetsStore.getState();

  return { ...rest };
};

export const useDataSets = (): TDataSetsStore => {
  return useDataSetsStore((state) => state);
};
