import { switchStorage, TStorage } from '@ukri/shared/utils/store';
import cloneDeep from 'lodash/cloneDeep';
import mergeWith from 'lodash/mergeWith';
import { StateStorage } from 'zustand/middleware';

import { TDataStore, TMode } from '../data.model';

type TData = TDataStore['data'];
type TState = TDataStore['state'];
type TToggleModeStore<D, S> = Pick<TDataStore<S, D>, 'mode' | 'schema' | 'state'>;

export const toggleMode =
  <D = TData, S = TState, T extends TToggleModeStore<D, S> = TToggleModeStore<D, S>>(
    memoryStorage: TStorage,
    queryStorage: StateStorage
  ) =>
  (initialState: Partial<T>, storageName: string) =>
  (state: T): T => {
    const newMode: TMode = state.mode === 'search' ? 'action-creator' : 'search';
    const prevState = switchStorage<TDataStore<D, S>>(memoryStorage, queryStorage)(storageName, state.mode, newMode);

    if (!prevState) {
      return mergeWith(cloneDeep(initialState), { mode: newMode, schema: newMode });
    }

    return mergeWith(cloneDeep(initialState), prevState.state, { mode: newMode, schema: newMode });
  };
