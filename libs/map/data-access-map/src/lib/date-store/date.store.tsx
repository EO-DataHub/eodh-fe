import type {} from '@redux-devtools/extension';
import { createQueryStorage } from '@ukri/shared/utils/store';
import isEqual from 'lodash/isEqual';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import { defaultValues, IDateStore, TDateStoreState, TDateValues } from './date.model';

export const useDateStore = create<IDateStore>()(
  devtools(
    persist(
      (set) => ({
        ...defaultValues,
        updateDate: (date: TDateValues['date']) => set((state) => (isEqual(date, state.date) ? state : { date })),
      }),
      {
        name: 'date',
        storage: createJSONStorage(() => createQueryStorage()),
        partialize: (state) => ({
          state: state.state,
          date: state.date,
        }),
      }
    )
  )
);

export const getDateStoreState = (): TDateStoreState => ({
  date: useDateStore.getState().date,
  state: useDateStore.getState().state,
});

export const useDate = (): IDateStore => {
  return useDateStore((state) => ({
    state: state.state,
    date: state.date,
    updateDate: state.updateDate,
  }));
};
