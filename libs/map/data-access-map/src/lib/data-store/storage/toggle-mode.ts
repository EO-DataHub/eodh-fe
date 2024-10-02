import { switchStorage, TStorage } from '@ukri/shared/utils/store';
import cloneDeep from 'lodash/cloneDeep';
import mergeWith from 'lodash/mergeWith';
import { StateStorage } from 'zustand/middleware';

import { TDataStore } from '../data.model';

export const toggleMode =
  <
    D = TDataStore['state'],
    T extends Pick<TDataStore<D>, 'mode' | 'schema' | 'state'> = Pick<TDataStore<D>, 'mode' | 'schema' | 'state'>
  >(
    memoryStorage: TStorage,
    queryStorage: StateStorage
  ) =>
  (initialState: Partial<T>, storageName: string) =>
  (state: T) => {
    const newMode = state.mode === 'search' ? 'action-creator' : 'search';
    const prevState = switchStorage<TDataStore>(memoryStorage, queryStorage)(storageName, state.mode, newMode);

    if (!prevState) {
      return {
        ...state,
        mode: newMode,
        schema: newMode,
        data: undefined,
      };
    }

    return mergeWith(cloneDeep(initialState), prevState.state, { mode: newMode, schema: newMode });
  };
