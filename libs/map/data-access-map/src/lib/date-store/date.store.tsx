import type {} from '@redux-devtools/extension';
import isEqual from 'lodash/isEqual';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { defaultValues, TDateValues } from './date.model';

export interface IDateStore extends TDateValues {
  enabled: boolean;
  updateDate: (date: TDateValues['date']) => void;
}

export type TDateStoreState = Omit<IDateStore, 'updateDate'>;

export const useDateStore = create<IDateStore>()(
  devtools((set) => ({
    ...defaultValues,
    enabled: true,
    updateDate: (date: TDateValues['date']) => set((state) => (isEqual(date, state.date) ? state : { date })),
  }))
);

export const getDateStoreState = (): TDateStoreState => ({
  date: useDateStore.getState().date,
  enabled: useDateStore.getState().enabled,
});

export const useDate = () => {
  return useDateStore((state) => ({
    enabled: state.enabled,
    date: state.date,
    updateDate: state.updateDate,
  }));
};
