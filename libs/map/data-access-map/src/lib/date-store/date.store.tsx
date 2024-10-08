import type {} from '@redux-devtools/extension';
import isEqual from 'lodash/isEqual';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { defaultValues, IDateStore, TDateStoreState, TDateValues } from './date.model';

export const useDateStore = create<IDateStore>()(
  devtools((set) => ({
    ...defaultValues,
    updateDate: (date: TDateValues['date']) => set((state) => (isEqual(date, state.date) ? state : { date })),
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
