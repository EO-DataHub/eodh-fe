import type {} from '@redux-devtools/extension';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { TDataSetsDefaultValues } from './data-sets.default-values';
import {
  defaultState,
  TDataSetsState,
  TDataSetsStore,
  TDataSetsStoreState,
  TDataSetValue,
  TSchema,
} from './data-sets.model';

const enableDataSet = (dataSet: TDataSetValue | string | undefined, state: TDataSetsStore): Partial<TDataSetsStore> => {
  switch (dataSet) {
    case 'sentinel-1': {
      if (!state.dataSets.copernicus.sentinel1) {
        return state;
      }

      return {
        dataSets: {
          ...state.dataSets,
          copernicus: {
            ...state.dataSets.copernicus,
            sentinel1: {
              ...state.dataSets.copernicus.sentinel1,
              enabled: true,
            },
          },
        },
      };
    }

    case 'sentinel-2-l1c': {
      if (!state.dataSets.copernicus.sentinel2) {
        return state;
      }

      return {
        dataSets: {
          ...state.dataSets,
          copernicus: {
            ...state.dataSets.copernicus,
            sentinel2: {
              ...state.dataSets.copernicus.sentinel2,
              enabled: true,
              expanded: true,
              l1c: true,
              l2a: false,
            },
          },
        },
      };
    }

    case 'sentinel-2-l2a': {
      if (!state.dataSets.copernicus.sentinel2) {
        return state;
      }

      return {
        dataSets: {
          ...state.dataSets,
          copernicus: {
            ...state.dataSets.copernicus,
            sentinel2: {
              ...state.dataSets.copernicus.sentinel2,
              enabled: true,
              expanded: true,
              l1c: false,
              l2a: true,
            },
          },
        },
      };
    }

    case 'sentinel-3': {
      if (!state.dataSets.copernicus.sentinel3) {
        return state;
      }

      return {
        dataSets: {
          ...state.dataSets,
          copernicus: {
            ...state.dataSets.copernicus,
            sentinel3: {
              ...state.dataSets.copernicus.sentinel3,
              enabled: true,
            },
          },
        },
      };
    }

    case 'sentinel-5p': {
      if (!state.dataSets.copernicus.sentinel5P) {
        return state;
      }

      return {
        dataSets: {
          ...state.dataSets,
          copernicus: {
            ...state.dataSets.copernicus,
            sentinel5P: {
              ...state.dataSets.copernicus.sentinel5P,
              enabled: true,
            },
          },
        },
      };
    }

    case 'esacci-globallc': {
      if (!state.dataSets.auxiliary?.esacciGloballc) {
        return state;
      }

      return {
        dataSets: {
          ...state.dataSets,
          auxiliary: {
            ...state.dataSets.auxiliary,
            esacciGloballc: {
              ...state.dataSets.auxiliary?.esacciGloballc,
              enabled: true,
            },
          },
        },
      };
    }

    case 'clms-corinelc': {
      if (!state.dataSets.auxiliary?.clmsCorinelc) {
        return state;
      }

      return {
        dataSets: {
          ...state.dataSets,
          auxiliary: {
            ...state.dataSets.auxiliary,
            clmsCorinelc: {
              ...state.dataSets.auxiliary?.clmsCorinelc,
              enabled: true,
            },
          },
        },
      };
    }

    case 'clms-water-bodies': {
      if (!state.dataSets.auxiliary?.clmsWaterBodies) {
        return state;
      }

      return {
        dataSets: {
          ...state.dataSets,
          auxiliary: {
            ...state.dataSets.auxiliary,
            clmsWaterBodies: {
              ...state.dataSets.auxiliary?.clmsWaterBodies,
              enabled: true,
            },
          },
        },
      };
    }
  }

  return state;
};

export const useDataSetsStore = create<TDataSetsStore>()(
  devtools((set) => ({
    ...defaultState,
    updateDataSets: (dataSets: TDataSetsDefaultValues | undefined) =>
      set((state) => {
        return isEqual(dataSets, state.dataSets)
          ? state
          : { dataSets: dataSets ? cloneDeep(dataSets) : defaultState.dataSets };
      }),
    changeSchema: (schema: TSchema) => set(() => ({ schema })),
    changeState: (state: TDataSetsState) => set(() => ({ state })),
    enableDataSet: (dataSet) => set((state) => enableDataSet(dataSet, state)),
  }))
);

export const getDataSetsStoreState = (): TDataSetsStoreState => {
  const { updateDataSets, changeSchema, ...rest } = useDataSetsStore.getState();

  return { ...rest };
};

export const useDataSets = (): TDataSetsStore => {
  return useDataSetsStore((state) => state);
};
