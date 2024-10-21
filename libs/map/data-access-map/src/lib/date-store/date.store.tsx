import type {} from '@redux-devtools/extension';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { defaultEmptyValues, defaultValues, IDateStore, TDateStoreState } from './date.model';

export const useDateStore = create<IDateStore>()(
  devtools((set) => ({
    ...defaultValues,
    updateDate: (date) =>
      set((state) => {
        return isEqual(date, state.date) ? state : { date: { from: date?.from || null, to: date?.to || null } };
      }),
    reset: (resetToNull = false) => set(() => (resetToNull ? cloneDeep(defaultEmptyValues) : cloneDeep(defaultValues))),
    changeState: (state) => set(() => ({ state })),
  }))
);

export const getDateStoreState = (): TDateStoreState => ({
  date: useDateStore.getState().date,
  state: useDateStore.getState().state,
});

export const useDate = (): IDateStore => {
  return useDateStore();
};
