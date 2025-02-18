import type {} from '@redux-devtools/extension';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { createGeometry, getCoordinates } from '../../geometry/geometry';
import { TCoordinate } from '../../geometry/shape.model';
import {
  defaultState,
  TCatalogueSearchParams,
  TResultsStore,
  TResultsStoreState,
  TSearchParams,
  TWorkflowSearchParams,
} from './results.model';

const isWorkflow = (params: Omit<TSearchParams, 'aoi'>): params is TWorkflowSearchParams =>
  !!params.workflowId && !!params.userWorkspace;

const isCatalogue = (
  params: Omit<TSearchParams, 'aoi'> & { aoi?: TCatalogueSearchParams['aoi'] }
): params is TCatalogueSearchParams => !!params.aoi && !!params.dataSets;

const getSearchType = (params: TSearchParams | undefined) => {
  if (!params) {
    return undefined;
  }

  if (params.workflowId && params.userWorkspace && !params.dataSets && !params.aoi) {
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
              coordinates: getCoordinates(
                searchParams?.aoi ? { type: 'polygon', shape: searchParams?.aoi } : undefined
              ),
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
    restore: (coordinates: TCoordinate | undefined, searchParams: Omit<TSearchParams, 'aoi'> | undefined) =>
      set(() => {
        if (searchParams && isWorkflow(searchParams)) {
          return {
            searchParams: {
              ...searchParams,
              aoi: undefined,
            },
            coordinates,
            searchType: 'workflow',
          };
        }

        const newSearchParams = {
          ...searchParams,
          id: searchParams?.id || nanoid(),
          aoi: createGeometry(coordinates),
        };

        if (isCatalogue(newSearchParams)) {
          return {
            searchParams: newSearchParams,
            coordinates,
            searchType: 'catalogue',
          };
        }

        return {
          searchParams: undefined,
          coordinates: undefined,
          searchType: undefined,
        };
      }),
  }))
);

export const getResultsStoreState = (): Omit<TResultsStoreState, 'searchParams'> & {
  searchParams?: Omit<TSearchParams, 'aoi'>;
} => {
  const { updateSearchParams, setShape, searchParams, ...rest } = useResultsStore.getState();

  if (!searchParams) {
    return { ...rest };
  }

  const { aoi, ...searchParamsRest } = searchParams;

  return {
    ...rest,
    searchParams: searchParamsRest,
  };
};

type TUseResultsParams = Omit<TResultsStore, 'coordinates' | 'setShape' | 'restore'> & {
  isWorkflow: (params: Omit<TSearchParams, 'aoi'>) => params is TWorkflowSearchParams;
  isCatalogue: (
    params: Omit<TSearchParams, 'aoi'> & { aoi?: TCatalogueSearchParams['aoi'] }
  ) => params is TCatalogueSearchParams;
};

export const useResults = (): TUseResultsParams => {
  return useResultsStore((state) => ({
    searchType: state.searchType,
    searchParams: state.searchParams,
    updateSearchParams: state.updateSearchParams,
    isWorkflow: isWorkflow,
    isCatalogue: isCatalogue,
  }));
};
