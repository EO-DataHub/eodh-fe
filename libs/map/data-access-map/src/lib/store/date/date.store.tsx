import type {} from '@redux-devtools/extension';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { getDefaultValues, IDateStore, TDateStoreState, TSchema, updateDate } from './date.model';

export const useDateStore = create<IDateStore>()(
  devtools((set) => ({
    ...getDefaultValues('search'),
    updateDate: (dateOrFunction) =>
      set((state) => {
        const date = isFunction(dateOrFunction) ? dateOrFunction(state.date) : dateOrFunction;
        return isEqual(date, state.date) ? state : { date: updateDate(date) };
      }),
    reset: (schema: TSchema) => set(() => cloneDeep(getDefaultValues(schema))),
    changeState: (state) => set(() => ({ state })),
  }))
);

export const getDateStoreState = (): TDateStoreState => ({
  schema: useDateStore.getState().schema,
  date: useDateStore.getState().date,
  state: useDateStore.getState().state,
});

export const useDate = (): IDateStore => {
  return useDateStore();
};
