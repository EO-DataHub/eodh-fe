import { TDateSetsDefaultValues } from './date-sets.model';

export type TSchema = 'search' | 'action-creator';

export type TInitialData = TDateSetsDefaultValues | undefined;

export type TDataStore<T = TInitialData> = {
  schema: TSchema;
  dataSets: T;
  enabled: boolean;
  updateDataSets: (state: T) => void;
  changeSchema: (schema: TSchema) => void;
};

export const defaultState: Omit<TDataStore, 'updateDataSets' | 'changeSchema'> = {
  schema: 'search',
  dataSets: undefined,
  enabled: true,
};
