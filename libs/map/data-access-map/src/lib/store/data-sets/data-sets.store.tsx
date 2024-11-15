import type {} from '@redux-devtools/extension';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { TDataSetsValues } from '../../dynamic-tree/data-sets.model';
import {
  defaultDataSetValues,
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
      if (!state.dataSets.public.copernicus.sentinel1) {
        return state;
      }

      return {
        dataSets: {
          ...defaultDataSetValues,
          public: {
            ...defaultDataSetValues.public,
            copernicus: {
              ...defaultDataSetValues.public.copernicus,
              sentinel1: {
                ...state.dataSets.public.copernicus.sentinel1,
                enabled: true,
              },
            },
          },
        },
      };
    }

    case 'sentinel-2-l1c': {
      if (!state.dataSets.public.copernicus.sentinel2) {
        return state;
      }

      const sentinel2 = defaultDataSetValues.public.copernicus.sentinel2
        ? defaultDataSetValues.public.copernicus.sentinel2
        : state.dataSets.public.copernicus.sentinel2;

      return {
        dataSets: {
          ...defaultDataSetValues,
          public: {
            ...defaultDataSetValues.public,
            copernicus: {
              ...defaultDataSetValues.public.copernicus,
              sentinel2: {
                ...sentinel2,
                enabled: true,
                expanded: true,
                l1c: true,
                l2a: false,
              },
            },
          },
        },
      };
    }

    case 'sentinel-2-l2a': {
      if (!state.dataSets.public.copernicus.sentinel2) {
        return state;
      }

      const sentinel2 = defaultDataSetValues.public.copernicus.sentinel2
        ? defaultDataSetValues.public.copernicus.sentinel2
        : state.dataSets.public.copernicus.sentinel2;

      return {
        dataSets: {
          ...defaultDataSetValues,
          public: {
            ...defaultDataSetValues.public,
            copernicus: {
              ...defaultDataSetValues.public.copernicus,
              sentinel2: {
                ...sentinel2,
                enabled: true,
                expanded: true,
                l1c: false,
                l2a: true,
              },
            },
          },
        },
      };
    }

    case 'sentinel-3': {
      if (!state.dataSets.public.copernicus.sentinel3) {
        return state;
      }

      const sentinel3 = defaultDataSetValues.public.copernicus.sentinel3
        ? defaultDataSetValues.public.copernicus.sentinel3
        : state.dataSets.public.copernicus.sentinel3;

      return {
        dataSets: {
          ...defaultDataSetValues,
          public: {
            ...defaultDataSetValues.public,
            copernicus: {
              ...defaultDataSetValues.public.copernicus,
              sentinel3: {
                ...sentinel3,
                enabled: true,
              },
            },
          },
        },
      };
    }

    case 'sentinel-5p': {
      if (!state.dataSets.public.copernicus.sentinel5P) {
        return state;
      }

      const sentinel5P = defaultDataSetValues.public.copernicus.sentinel5P
        ? defaultDataSetValues.public.copernicus.sentinel5P
        : state.dataSets.public.copernicus.sentinel5P;

      return {
        dataSets: {
          ...defaultDataSetValues,
          public: {
            ...defaultDataSetValues.public,
            copernicus: {
              ...defaultDataSetValues.public.copernicus,
              sentinel5P: {
                ...sentinel5P,
                enabled: true,
              },
            },
          },
        },
      };
    }

    case 'esacci-globallc': {
      if (!state.dataSets.public.auxiliary?.esacciGloballc) {
        return state;
      }

      const esacciGloballc = defaultDataSetValues.public.auxiliary?.esacciGloballc
        ? defaultDataSetValues.public.auxiliary?.esacciGloballc
        : state.dataSets.public.auxiliary?.esacciGloballc;

      return {
        dataSets: {
          ...defaultDataSetValues,
          public: {
            ...defaultDataSetValues.public,
            auxiliary: {
              ...defaultDataSetValues.public.auxiliary,
              esacciGloballc: {
                ...esacciGloballc,
                enabled: true,
              },
            },
          },
        },
      };
    }

    case 'clms-corinelc': {
      if (!state.dataSets.public.auxiliary?.clmsCorinelc) {
        return state;
      }

      const clmsCorinelc = defaultDataSetValues.public.auxiliary?.clmsCorinelc
        ? defaultDataSetValues.public.auxiliary?.clmsCorinelc
        : state.dataSets.public.auxiliary?.clmsCorinelc;

      return {
        dataSets: {
          ...defaultDataSetValues,
          public: {
            ...defaultDataSetValues.public,
            auxiliary: {
              ...defaultDataSetValues.public.auxiliary,
              clmsCorinelc: {
                ...clmsCorinelc,
                enabled: true,
              },
            },
          },
        },
      };
    }

    case 'clms-water-bodies': {
      if (!state.dataSets.public.auxiliary?.clmsWaterBodies) {
        return state;
      }

      const clmsWaterBodies = defaultDataSetValues.public.auxiliary?.clmsWaterBodies
        ? defaultDataSetValues.public.auxiliary?.clmsWaterBodies
        : state.dataSets.public.auxiliary?.clmsWaterBodies;

      return {
        dataSets: {
          ...defaultDataSetValues,
          public: {
            ...defaultDataSetValues.public,
            auxiliary: {
              ...defaultDataSetValues.public.auxiliary,
              clmsWaterBodies: {
                ...clmsWaterBodies,
                enabled: true,
              },
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
    updateDataSets: (dataSets: TDataSetsValues | undefined) =>
      set((state) => {
        console.log('updateDataSets', isEqual(dataSets, state.dataSets), dataSets, state.dataSets);
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
