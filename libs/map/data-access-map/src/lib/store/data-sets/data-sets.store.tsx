import type {} from '@redux-devtools/extension';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { dataSets, TDataSetsDefaultValues } from './data-sets.default-values';
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
          ...dataSets,
          copernicus: {
            ...dataSets.copernicus,
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

      const sentinel2 = dataSets.copernicus.sentinel2
        ? dataSets.copernicus.sentinel2
        : state.dataSets.copernicus.sentinel2;

      return {
        dataSets: {
          ...dataSets,
          copernicus: {
            ...dataSets.copernicus,
            sentinel2: {
              ...sentinel2,
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

      const sentinel2 = dataSets.copernicus.sentinel2
        ? dataSets.copernicus.sentinel2
        : state.dataSets.copernicus.sentinel2;

      return {
        dataSets: {
          ...dataSets,
          copernicus: {
            ...dataSets.copernicus,
            sentinel2: {
              ...sentinel2,
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

      const sentinel3 = dataSets.copernicus.sentinel3
        ? dataSets.copernicus.sentinel3
        : state.dataSets.copernicus.sentinel3;

      return {
        dataSets: {
          ...dataSets,
          copernicus: {
            ...dataSets.copernicus,
            sentinel3: {
              ...sentinel3,
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

      const sentinel5P = dataSets.copernicus.sentinel5P
        ? dataSets.copernicus.sentinel5P
        : state.dataSets.copernicus.sentinel5P;

      return {
        dataSets: {
          ...dataSets,
          copernicus: {
            ...dataSets.copernicus,
            sentinel5P: {
              ...sentinel5P,
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

      const esacciGloballc = dataSets.auxiliary?.esacciGloballc
        ? dataSets.auxiliary?.esacciGloballc
        : state.dataSets.auxiliary?.esacciGloballc;

      return {
        dataSets: {
          ...dataSets,
          auxiliary: {
            ...dataSets.auxiliary,
            esacciGloballc: {
              ...esacciGloballc,
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

      const clmsCorinelc = dataSets.auxiliary?.clmsCorinelc
        ? dataSets.auxiliary?.clmsCorinelc
        : state.dataSets.auxiliary?.clmsCorinelc;

      return {
        dataSets: {
          ...dataSets,
          auxiliary: {
            ...dataSets.auxiliary,
            clmsCorinelc: {
              ...clmsCorinelc,
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

      const clmsWaterBodies = dataSets.auxiliary?.clmsWaterBodies
        ? dataSets.auxiliary?.clmsWaterBodies
        : state.dataSets.auxiliary?.clmsWaterBodies;

      return {
        dataSets: {
          ...dataSets,
          auxiliary: {
            ...dataSets.auxiliary,
            clmsWaterBodies: {
              ...clmsWaterBodies,
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
    updateDataSets: (dataSets: Omit<TDataSetsDefaultValues, 'status'> | undefined) =>
      set((state) => {
        return isEqual(dataSets, state.dataSets)
          ? state
          : { dataSets: dataSets ? { ...cloneDeep(dataSets), status: 'updated' } : defaultState.dataSets };
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
