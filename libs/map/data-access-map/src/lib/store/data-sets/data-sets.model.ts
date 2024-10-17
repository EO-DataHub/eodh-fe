import { dataSets, TDataSetsDefaultValues } from './data-sets.default-values';

export type TDataSetsState = 'readonly' | 'edit';

export type TSchema = 'search' | 'action-creator';

export type TInitialData = TDataSetsDefaultValues;

export type TDataSetsStore<T = TInitialData> = {
  schema: TSchema;
  dataSets: T;
  state: TDataSetsState;
  updateDataSets: (state: T | undefined) => void;
  changeSchema: (schema: TSchema) => void;
  changeState: (state: TDataSetsState) => void;
};

export type TDataSetsStoreState = Omit<TDataSetsStore, 'updateDataSets' | 'changeSchema'>;

export const defaultState: Omit<TDataSetsStore, 'updateDataSets' | 'changeSchema' | 'changeState'> = {
  state: 'edit',
  schema: 'search',
  dataSets,
};
