import type {} from '@redux-devtools/extension';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { createGeometry, getCoordinates } from './geometry';
import { defaultState, TCoordinate, TResultsStore, TResultsStoreState, TSearchParams } from './results.model';

export const useResultsStore = create<TResultsStore>()(
  devtools((set) => ({
    ...defaultState,
    updateSearchParams: (searchParams: TSearchParams | undefined) =>
      set((state) => {
        return isEqual(searchParams, state.searchParams)
          ? state
          : {
              searchParams: searchParams ? cloneDeep(searchParams) : defaultState.searchParams,
              coordinates: getCoordinates(searchParams?.aoi),
            };
      }),
    setShape: (coordinates: TCoordinate | undefined) =>
      set((state) => {
        const aoi = createGeometry(coordinates);

        if (!coordinates || !aoi || !state.searchParams) {
          return {
            searchParams: undefined,
            coordinates: undefined,
          };
        }

        return {
          searchParams: {
            ...state.searchParams,
            aoi,
          },
          coordinates,
        };
      }),
  }))
);

export const getResultsStoreState = (): TResultsStoreState => {
  const { updateSearchParams, setShape, ...rest } = useResultsStore.getState();

  return { ...rest };
};

export const useResults = (): Omit<TResultsStore, 'coordinates' | 'setShape'> => {
  return useResultsStore((state) => ({
    searchParams: state.searchParams,
    updateSearchParams: state.updateSearchParams,
  }));
};
