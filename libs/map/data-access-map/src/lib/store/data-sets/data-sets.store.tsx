import type {} from '@redux-devtools/extension';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import merge from 'lodash/merge';
import setValue from 'lodash/set';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { TDataSetsValues } from '../../dynamic-tree/data-sets.model';
import { actionCreatorSchema, searchSchema } from '../../dynamic-tree/schema/data-sets.schema';
import { TreeBuilder } from '../../dynamic-tree/tree-builder/tree.builder';
import {
  defaultState,
  getDefaultDataSetValues,
  TDataSetsState,
  TDataSetsStore,
  TDataSetsStoreState,
  TSchema,
} from './data-sets.model';
import { dataSetsDisabledMap, getValuesForDataSet } from './utils';

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
        if (schema === 'search') {
          const treeModel = cloneDeep(searchSchema);
          return {
            schema,
            dataSets: {
              status: 'initial',
              ...new TreeBuilder(treeModel).getValues(),
            },
            treeModel,
            state: 'edit',
          };
        }

        const treeModel = cloneDeep(actionCreatorSchema);

        return {
          schema,
          dataSets: {
            status: 'initial',
            ...new TreeBuilder(treeModel).getValues(),
          },
          treeModel,
          state: 'readonly',
        };
      }),
    changeState: (state: TDataSetsState) => set(() => ({ state })),
    setDataSet: (dataSet) => set((state) => getValuesForDataSet(dataSet, state)),
    enable: (dataSet) =>
      set((state) => {
        const treeModel = merge(cloneDeep(state.treeModel), [
          { options: { disabled: false } },
          { options: { disabled: true } },
        ]);

        if (!dataSet) {
          return { treeModel: state.schema === 'search' ? cloneDeep(searchSchema) : cloneDeep(actionCreatorSchema) };
        }

        Object.entries(dataSetsDisabledMap)
          .filter(([key]) => !dataSet.find((item) => item === key))
          .forEach(([, paths]) => {
            paths.forEach((path) => {
              setValue(treeModel, path, true);
            });
          });

        Object.entries(dataSetsDisabledMap)
          .filter(([key]) => dataSet.find((item) => item === key))
          .forEach(([, paths]) => {
            paths.forEach((path) => {
              setValue(treeModel, path, false);
            });
          });

        return { treeModel };
      }),
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
