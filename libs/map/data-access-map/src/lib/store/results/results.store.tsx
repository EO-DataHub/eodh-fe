import type {} from '@redux-devtools/extension';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { createGeometry, getCoordinates } from './geometry';
import {
  defaultState,
  TCoordinate,
  TResultsStore,
  TResultsStoreState,
  TSearchParams,
  TWorkflowSearchParams,
} from './results.model';

const isWorkflow = (params: TSearchParams): params is TWorkflowSearchParams => !!params.jobId && !!params.userWorkspace;

const getSearchType = (params: TSearchParams | undefined) => {
  if (!params) {
    return undefined;
  }

  if (params.jobId && params.userWorkspace && !params.dataSets && !params.aoi) {
    return 'workflow';
  }

  return 'catalogue';
};

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
              searchType: getSearchType(searchParams ? searchParams : defaultState.searchParams),
            };
      }),
    setShape: (coordinates: TCoordinate | undefined) =>
      set((state) => {
        const aoi = createGeometry(coordinates);

        if (!coordinates || !aoi || !state.searchParams) {
          return {
            searchParams: undefined,
            coordinates: undefined,
            searchType: undefined,
          };
        }

        if (isWorkflow(state.searchParams)) {
          return {
            searchParams: {
              ...state.searchParams,
              aoi: undefined,
            },
            coordinates,
            searchType: 'workflow',
          };
        }

        return {
          searchParams: {
            ...state.searchParams,
            aoi,
          },
          coordinates,
          searchType: 'catalogue',
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
    searchType: state.searchType,
    searchParams: state.searchParams,
    updateSearchParams: state.updateSearchParams,
  }));
};
