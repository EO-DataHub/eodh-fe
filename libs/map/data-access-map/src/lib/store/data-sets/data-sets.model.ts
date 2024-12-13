import { TDataSetsValues } from '../../form-builder/tree/data-sets.model';
import { actionCreatorSchema, searchSchema } from '../../form-builder/tree/schema/data-sets.schema';
import { TreeBuilder } from '../../form-builder/tree/tree-builder/tree.builder';
import { TDynamicTreeModel } from '../../form-builder/tree/tree-dynamic.model';

export type TDataSetsState = 'readonly' | 'edit';

export type TSchema = 'search' | 'action-creator';

export type TDataSetValue =
  | 'sentinel-1'
  | 'sentinel-2-l1c'
  | 'sentinel-2-l2a'
  | 'sentinel-3'
  | 'sentinel-5p'
  | 'esacci-globallc'
  | 'clms-corinelc'
  | 'clms-water-bodies';

export type TDataSetsStore<T = TDataSetsValues> = {
  schema: TSchema;
  dataSets: T & { status: 'initial' | 'updated' };
  supportedDataSets: string[] | undefined;
  treeModel: {
    showNotificationMessage: boolean;
    model: TDynamicTreeModel;
    filteredDataSets: string[] | undefined;
  };
  state: TDataSetsState;
  updateDataSets: (state: T | undefined) => void;
  changeSchema: (schema: TSchema) => void;
  changeState: (state: TDataSetsState) => void;
  setDataSet: (dataSet: TDataSetValue | string | undefined) => void;
  setSupportedDataSets: (dataSets: string[] | undefined) => void;
  enable: (dataSet?: (TDataSetValue | string)[] | undefined) => void;
  disable: () => void;
};

export type TDataSetsStoreState = Omit<
  TDataSetsStore,
  'updateDataSets' | 'changeSchema' | 'setDataSet' | 'enable' | 'disable' | 'setSupportedDataSets'
>;

export const getDefaultDataSetValues = (schema: TSchema): TDataSetsValues & { status: 'initial' | 'updated' } => {
  switch (schema) {
    case 'search': {
      return {
        status: 'initial',
        ...new TreeBuilder(searchSchema).getValues(),
      };
    }

    case 'action-creator': {
      return {
        status: 'initial',
        ...new TreeBuilder(actionCreatorSchema).getValues(),
      };
    }
  }
};

export const defaultState: Omit<
  TDataSetsStore,
  'updateDataSets' | 'changeSchema' | 'changeState' | 'setDataSet' | 'enable' | 'disable' | 'setSupportedDataSets'
> = {
  state: 'edit',
  schema: 'search',
  dataSets: {
    status: 'initial',
    ...new TreeBuilder(searchSchema).getValues(),
  },
  supportedDataSets: undefined,
  treeModel: {
    showNotificationMessage: false,
    model: searchSchema,
    filteredDataSets: undefined,
  },
};
