import { dataSets, TDataSetsDefaultValues } from './data-sets.default-values';

export type TDateSetsState = 'readonly' | 'edit';

export type TSchema = 'search' | 'action-creator';

export type TInitialData = TDataSetsDefaultValues;

export type TDataSetsStore<T = TInitialData> = {
  schema: TSchema;
  dataSets: T;
  state: TDateSetsState;
  updateDataSets: (state: T | undefined) => void;
  changeSchema: (schema: TSchema) => void;
  changeState: (state: TDateSetsState) => void;
};

export type TDataSetsStoreState = Omit<TDataSetsStore, 'updateDataSets' | 'changeSchema'>;

export const defaultState: Omit<TDataSetsStore, 'updateDataSets' | 'changeSchema' | 'changeState'> = {
  state: 'edit',
  schema: 'search',
  dataSets,
};
