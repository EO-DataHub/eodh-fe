import { TDataSetsValues } from '../../dynamic-tree/data-sets.model';
import { treeModel } from '../../dynamic-tree/tree.dynamic';
import { TreeBuilder } from '../../dynamic-tree/tree-builder/tree.builder';
import { TDynamicTreeModel } from '../../dynamic-tree/tree-dynamic.model';

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
  treeModel: TDynamicTreeModel;
  state: TDataSetsState;
  updateDataSets: (state: T | undefined) => void;
  changeSchema: (schema: TSchema) => void;
  changeState: (state: TDataSetsState) => void;
  enableDataSet: (dataSet: TDataSetValue | string | undefined) => void;
};

export type TDataSetsStoreState = Omit<TDataSetsStore, 'updateDataSets' | 'changeSchema' | 'enableDataSet'>;

export const defaultDataSetValues: TDataSetsValues & { status: 'initial' | 'updated' } = {
  status: 'initial',
  ...new TreeBuilder(treeModel).getValues(),
};

export const defaultState: Omit<TDataSetsStore, 'updateDataSets' | 'changeSchema' | 'changeState' | 'enableDataSet'> = {
  state: 'edit',
  schema: 'search',
  dataSets: {
    status: 'initial',
    ...new TreeBuilder(treeModel).getValues(),
  },
  treeModel,
};
