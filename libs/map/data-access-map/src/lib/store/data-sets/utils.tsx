import type {} from '@redux-devtools/extension';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';

import { TDataSetsValues } from '../../dynamic-tree/data-sets.model';
import { actionCreatorSchema } from '../../dynamic-tree/schema/data-sets.schema';
import { TreeBuilder } from '../../dynamic-tree/tree-builder/tree.builder';
import { TDataSetsStore, TDataSetValue } from './data-sets.model';

// todo move this mapping into TreeBuilder object. We shouldn't relay on array indexes - control names should be used instead
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

export const getValuesForDataSet = (
  dataSet: TDataSetValue | string | undefined,
  state: TDataSetsStore
): Partial<TDataSetsStore> => {
  const newValues: TDataSetsValues & { status: 'initial' | 'updated' } = {
    status: 'initial',
    ...cloneDeep(new TreeBuilder(actionCreatorSchema).getValues()),
  };

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

      set(newValues, 'public.auxiliary.esacciGloballc.enabled', true);

      break;
    }

    case 'clms-corinelc': {
      if (!state.dataSets.public.auxiliary?.clmsCorinelc) {
        return state;
      }

      set(newValues, 'public.auxiliary.clmsCorinelc.enabled', true);

      break;
    }

    case 'clms-water-bodies': {
      if (!state.dataSets.public.auxiliary?.clmsWaterBodies) {
        return state;
      }

      set(newValues, 'public.auxiliary.clmsWaterBodies.enabled', true);

      break;
    }
  }

  return { dataSets: newValues };
};
