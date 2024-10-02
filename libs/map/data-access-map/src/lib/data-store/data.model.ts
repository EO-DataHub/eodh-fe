import { defaultValues, TSearchDefaultValues } from './search.model';
import { TSearchData } from './search.schema';

export type TMode = 'search' | 'action-creator';
export type TSchema = 'search' | 'action-creator';

type TInitialData = TSearchData | TSearchDefaultValues | undefined;
type TUpdateData = TSearchData | undefined;

export type TDataStore<T = TInitialData, U = TUpdateData> = {
  mode: TMode;
  schema: TSchema;
  data: U;
  state: T;
  updateData: (data: U) => void;
  updateState: (data: T) => void;
  toggleMode: () => void;
};

export const defaultState: Omit<TDataStore, 'updateData' | 'updateState' | 'toggleMode'> = {
  mode: 'search',
  schema: 'search',
  state: defaultValues,
  data: undefined,
};
