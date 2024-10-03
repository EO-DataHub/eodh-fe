import { TSearchData } from './schema/search/search.schema';
import { defaultValues, TSearchDefaultValues } from './search.model';
export type TMode = 'search' | 'action-creator';
export type TSchema = 'search' | 'action-creator';

export type TInitialData = TSearchData | TSearchDefaultValues | undefined;
export type TUpdateData = TSearchData | undefined;

export type TDataStore<T = TInitialData, U = TUpdateData> = {
  mode: TMode;
  schema: TSchema;
  data: U;
  state: T;
  updateData: (data: U) => void;
  updateState: (state: T) => void;
  toggleMode: () => void;
};

export const defaultState: Omit<TDataStore, 'updateData' | 'updateState' | 'toggleMode'> = {
  mode: 'search',
  schema: 'search',
  state: defaultValues,
  data: undefined,
};
