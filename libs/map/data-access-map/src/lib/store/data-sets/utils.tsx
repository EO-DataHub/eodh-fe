import type {} from '@redux-devtools/extension';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import set from 'lodash/set';

import { TDataSetsValues } from '../../form-builder/tree/data-sets.model';
import { actionCreatorSchema, searchSchema } from '../../form-builder/tree/schema/data-sets.schema';
import { TDynamicTreeModel } from '../../form-builder/tree/tree-dynamic.model';
import { getDefaultDataSetValues, TDataSetsStore, TDataSetValue, TSchema } from './data-sets.model';

// todo move this mapping into TreeBuilder object. We shouldn't relay on array indexes - control names should be used instead
export const dataSetsDisabledMap: { [key in TDataSetValue]: string[] } = {
  'sentinel-1': ['0.options.disabled', '0.children.0.options.disabled', '0.children.0.children.0.options.disabled'],
  'sentinel-2-l1c': [
    '0.options.disabled',
    '0.children.0.options.disabled',
    '0.children.0.children.1.options.disabled',
    '0.children.0.children.1.children.0.options.disabled',
  ],
  'sentinel-2-l2a': [
    '0.options.disabled',
    '0.children.0.options.disabled',
    '0.children.0.children.1.options.disabled',
    '0.children.0.children.1.children.1.options.disabled',
  ],
  'sentinel-2-l2a-ard': [
    '0.options.disabled',
    '0.children.0.options.disabled',
    '0.children.0.children.1.options.disabled',
    '0.children.0.children.1.children.0.options.disabled',
  ],
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
  const newValues: TDataSetsValues & { status: 'initial' | 'updated' } = getDefaultDataSetValues(state.schema);

  switch (dataSet) {
    case 'sentinel-1': {
      if (!state.dataSets.public.copernicus.sentinel1) {
        return state;
      }
      set(newValues, 'public.copernicus.sentinel1.enabled', true);

      break;
    }

    case 'sentinel-2-l1c':
    case 'sentinel-2-l2a':
    case 'sentinel-2-l2a-ard': {
      if (!state.dataSets.public.copernicus.sentinel2) {
        return state;
      }

      set(newValues, 'public.copernicus.sentinel2.enabled', true);
      set(newValues, 'public.copernicus.sentinel2.expanded', true);
      set(newValues, 'public.copernicus.sentinel2.l1c', dataSet === 'sentinel-2-l1c');
      set(newValues, 'public.copernicus.sentinel2.l2a', dataSet === 'sentinel-2-l2a');
      set(newValues, 'public.copernicus.sentinel2.l2aARD', dataSet === 'sentinel-2-l2a-ard');

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

export const getTreeModel = (
  schema: TSchema,
  treeModel: TDynamicTreeModel | undefined,
  dataSet?: string[]
): TDynamicTreeModel => {
  let newTreeModel = schema === 'search' ? cloneDeep(searchSchema) : cloneDeep(actionCreatorSchema);

  if (!dataSet) {
    return newTreeModel;
  }

  dataSet = [...new Set(dataSet)];
  newTreeModel = merge(cloneDeep(treeModel ? treeModel : newTreeModel), [
    { options: { disabled: false } },
    { options: { disabled: true } },
  ]);

  Object.entries(dataSetsDisabledMap)
    .filter(([key]) => !dataSet.find((item) => item === key))
    .forEach(([, paths]) => {
      paths.forEach((path) => {
        set(newTreeModel, path, true);
      });
    });

  Object.entries(dataSetsDisabledMap)
    .filter(([key]) => dataSet.find((item) => item === key))
    .forEach(([, paths]) => {
      paths.forEach((path) => {
        set(newTreeModel, path, false);
      });
    });

  return newTreeModel;
};
