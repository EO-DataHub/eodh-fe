import type {} from '@redux-devtools/extension';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';

import { TDataSetsValuesPath } from '../../dynamic-tree/data-sets.model';
import { defaultDataSetValues, TDataSetsStore, TDataSetValue } from './data-sets.model';

const dataSetsMap: { [key in TDataSetValue]: TDataSetsValuesPath } = {
  'sentinel-1': 'public.copernicus.sentinel1.enabled',
  'sentinel-2-l1c': 'public.copernicus.sentinel2.l1c',
  'sentinel-2-l2a': 'public.copernicus.sentinel2.l2a',
  'sentinel-3': 'public.copernicus.sentinel3.enabled',
  'sentinel-5p': 'public.copernicus.sentinel5P.enabled',
  'esacci-globallc': 'public.auxiliary.esacciGloballc.enabled',
  'clms-corinelc': 'public.auxiliary.clmsCorinelc.enabled',
  'clms-water-bodies': 'public.auxiliary.clmsWaterBodies.enabled',
};

export const dataSetsDisabledMap: { [key in TDataSetValue]: string[] } = {
  'sentinel-1': ['0.options.disabled', '0.children.0.options.disabled', '0.children.0.children.0.options.disabled'],
  'sentinel-2-l1c': ['0.options.disabled', '0.children.0.options.disabled', '0.children.0.children.1.options.disabled'],
  'sentinel-2-l2a': ['0.options.disabled', '0.children.0.options.disabled', '0.children.0.children.1.options.disabled'],
  'sentinel-3': ['0.options.disabled', '0.children.0.options.disabled', '0.children.0.children.2.options.disabled'],
  'sentinel-5p': ['0.options.disabled', '0.children.0.options.disabled', '0.children.0.children.3.options.disabled'],
  'esacci-globallc': [
    '0.options.disabled',
    '0.children.1.options.disabled',
    '0.children.1.children.0.options.disabled',
  ],
  'clms-corinelc': ['0.options.disabled', '0.children.1.options.disabled', '0.children.1.children.1.options.disabled'],
  'clms-water-bodies': [
    '0.options.disabled',
    '0.children.1.options.disabled',
    '0.children.1.children.2.options.disabled',
  ],
};

const getValuesForDataSet = (
  dataSet: TDataSetValue | string | undefined,
  state: TDataSetsStore
): Partial<TDataSetsStore> => {
  const newValues = cloneDeep(defaultDataSetValues);

  switch (dataSet) {
    case 'sentinel-1': {
      if (!state.dataSets.public.copernicus.sentinel1) {
        return state;
      }
      set(newValues, 'public.copernicus.sentinel1.enabled', true);

      break;
    }

    case 'sentinel-2-l1c':
    case 'sentinel-2-l2a': {
      if (!state.dataSets.public.copernicus.sentinel2) {
        return state;
      }

      set(newValues, 'public.copernicus.sentinel2.enabled', true);
      set(newValues, 'public.copernicus.sentinel2.expanded', true);
      set(newValues, 'public.copernicus.sentinel2.l1c', dataSet === 'sentinel-2-l1c');
      set(newValues, 'public.copernicus.sentinel2.l2a', dataSet === 'sentinel-2-l2a');

      break;
    }

    case 'sentinel-3': {
      if (!state.dataSets.public.copernicus.sentinel3) {
        return state;
      }

      set(newValues, 'public.copernicus.sentinel3.enabled', true);

      break;
    }

    case 'sentinel-5p': {
      if (!state.dataSets.public.copernicus.sentinel5P) {
        return state;
      }

      set(newValues, 'public.copernicus.sentinel5P.enabled', true);

      break;
    }

    case 'esacci-globallc': {
      if (!state.dataSets.public.auxiliary?.esacciGloballc) {
        return state;
      }

      set(newValues, 'public.auxiliary.esacciGloballc', true);

      break;
    }

    case 'clms-corinelc': {
      if (!state.dataSets.public.auxiliary?.clmsCorinelc) {
        return state;
      }

      set(newValues, 'public.auxiliary.clmsCorinelc', true);

      break;
    }

    case 'clms-water-bodies': {
      if (!state.dataSets.public.auxiliary?.clmsWaterBodies) {
        return state;
      }

      set(newValues, 'public.auxiliary.clmsWaterBodies', true);

      break;
    }
  }

  return { dataSets: newValues };
};

export const setDataSet = (
  dataSet: TDataSetValue | string | undefined,
  state: TDataSetsStore
): Partial<TDataSetsStore> => {
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
