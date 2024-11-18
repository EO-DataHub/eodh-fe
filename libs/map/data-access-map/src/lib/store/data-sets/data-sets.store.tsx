import type {} from '@redux-devtools/extension';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import merge from 'lodash/merge';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { TDataSetsValues } from '../../form-builder/tree/data-sets.model';
import { TreeBuilder } from '../../form-builder/tree/tree-builder/tree.builder';
import {
  defaultState,
  getDefaultDataSetValues,
  TDataSetsState,
  TDataSetsStore,
  TDataSetsStoreState,
  TSchema,
} from './data-sets.model';
import { getTreeModel, getValuesForDataSet } from './utils';

export const useDataSetsStore = create<TDataSetsStore>()(
  devtools((set) => ({
    ...defaultState,
    updateDataSets: (dataSets: TDataSetsValues | undefined) =>
      set((state) =>
        isEqual(dataSets, state.dataSets)
          ? state
          : {
              dataSets: dataSets
                ? { ...cloneDeep(dataSets), status: 'updated' }
                : getDefaultDataSetValues(state.schema),
            }
      ),
    changeSchema: (schema: TSchema) =>
      set(() => {
        const treeModel = getTreeModel(schema, undefined);

        if (schema === 'search') {
          return {
            schema,
            dataSets: {
              status: 'initial',
              ...new TreeBuilder(treeModel).getValues(),
            },
            treeModel: {
              model: treeModel,
              filteredDataSets: undefined,
            },
            state: 'edit',
            supportedDataSets: undefined,
          };
        }

        return {
          schema,
          dataSets: {
            status: 'initial',
            ...new TreeBuilder(treeModel).getValues(),
          },
          treeModel: {
            model: treeModel,
            filteredDataSets: undefined,
          },
          state: 'readonly',
        };
      }),
    changeState: (state: TDataSetsState) => set(() => ({ state })),
    setDataSet: (dataSet) => set((state) => getValuesForDataSet(dataSet, state)),
    setSupportedDataSets: (dataSets) =>
      set((state) => {
        if (state.treeModel.filteredDataSets?.length) {
          return {
            supportedDataSets: dataSets,
          };
        }

        return {
          supportedDataSets: dataSets,
          treeModel: {
            model: getTreeModel(state.schema, state.treeModel.model, dataSets),
            filteredDataSets: dataSets,
          },
        };
      }),
    enable: (dataSet) =>
      set((state) => ({
        treeModel: {
          model: getTreeModel(state.schema, state.treeModel.model, dataSet ? dataSet : state.supportedDataSets),
          filteredDataSets: dataSet ? dataSet : state.supportedDataSets,
        },
      })),
    disable: () =>
      set((state) => ({
        treeModel: merge(cloneDeep(state.treeModel), [
          { options: { disabled: true } },
          { options: { disabled: true } },
        ]),
      })),
  }))
);

export const getDataSetsStoreState = (): TDataSetsStoreState => {
  const { updateDataSets, changeSchema, enable, disable, setDataSet, ...rest } = useDataSetsStore.getState();

  return { ...rest };
};

export const useDataSets = (): TDataSetsStore => {
  return useDataSetsStore((state) => state);
};
