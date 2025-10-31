import type {} from '@redux-devtools/extension';
import { createDate } from '@ukri/shared/utils/date';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { getDefaultValues, IDateStore, TDateStoreState, TSchema, updateDate } from './date.model';

export const useDateStore = create<IDateStore>()(
  devtools((set, get) => ({
    ...getDefaultValues('search'),
    updateDate: (dateOrFunction) =>
      set((state) => {
        const date = isFunction(dateOrFunction) ? dateOrFunction(state.date) : dateOrFunction;
        return isEqual(date, state.date) ? state : { date: updateDate(date) };
      }),
    isValid: () => {
      const state = get();
      const dateFrom = createDate(state.date.from);
      const dateTo = createDate(state.date.to);
      const dateMin = createDate(state.date.min);
      const dateMax = createDate(state.date.max);

      if ((dateFrom && dateMin && dateFrom < dateMin) || (dateFrom && dateMax && dateFrom > dateMax)) {
        return false;
      }

      if ((dateTo && dateMin && dateTo < dateMin) || (dateTo && dateMax && dateTo > dateMax)) {
        return false;
      }

      return true;
    },
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
