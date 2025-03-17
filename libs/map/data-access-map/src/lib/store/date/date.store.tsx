import type {} from '@redux-devtools/extension';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { getDefaultValues, IDateStore, TDateStoreState, TSchema } from './date.model';

export const useDateStore = create<IDateStore>()(
  devtools((set) => ({
    ...getDefaultValues('search'),
    updateDate: (date) =>
      set((state) => {
        return isEqual(date, state.date) ? state : { date: { from: date?.from || null, to: date?.to || null } };
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
