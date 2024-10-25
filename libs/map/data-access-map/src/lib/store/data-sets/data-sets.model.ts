import { dataSets, TDataSetsDefaultValues } from './data-sets.default-values';

export type TDataSetsState = 'readonly' | 'edit';

export type TSchema = 'search' | 'action-creator';

export type TInitialData = TDataSetsDefaultValues;

export type TDataSetValue =
  | 'sentinel-1'
  | 'sentinel-2-l1c'
  | 'sentinel-2-l2a'
  | 'sentinel-3'
  | 'sentinel-5p'
  | 'esacci-globallc'
  | 'clms-corinelc'
  | 'clms-water-bodies';

export type TDataSetsStore<T = TInitialData> = {
  schema: TSchema;
  dataSets: T;
  state: TDataSetsState;
  updateDataSets: (state: T | undefined) => void;
  changeSchema: (schema: TSchema) => void;
  changeState: (state: TDataSetsState) => void;
  enableDataSet: (dataSet: TDataSetValue | string | undefined) => void;
};

export type TDataSetsStoreState = Omit<TDataSetsStore, 'updateDataSets' | 'changeSchema' | 'enableDataSet'>;

export const defaultState: Omit<TDataSetsStore, 'updateDataSets' | 'changeSchema' | 'changeState' | 'enableDataSet'> = {
  state: 'edit',
  schema: 'search',
  dataSets,
};
