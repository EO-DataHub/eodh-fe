import type {} from '@redux-devtools/extension';
import { areDateObjectsEqual, isAfter, isBefore } from '@ukri/shared/utils/date';
import cloneDeep from 'lodash/cloneDeep';
import isFunction from 'lodash/isFunction';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { getDefaultValues, IDateStore, TDateStoreState, TSchema, updateDate } from './date.model';

export const useDateStore = create<IDateStore>()(
  devtools((set, get) => ({
    ...getDefaultValues('search'),
    updateDate: (dateOrFunction) =>
      set((state) => {
        const newDate = isFunction(dateOrFunction) ? dateOrFunction(state.date) : dateOrFunction;
        const updatedDate = updateDate(newDate);
        return areDateObjectsEqual(updatedDate, state.date) ? state : { date: updatedDate };
      }),
    isValid: () => {
      const state = get();

      if (isBefore(state.date.from, state.date.min) || isAfter(state.date.from, state.date.max)) {
        return false;
      }

      if (isBefore(state.date.to, state.date.min) || isAfter(state.date.to, state.date.max)) {
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
