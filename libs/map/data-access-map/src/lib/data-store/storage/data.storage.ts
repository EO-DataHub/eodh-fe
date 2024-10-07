import { compact, createDoubleStorage, createQueryStorage } from '@ukri/shared/utils/store';
import cloneDeep from 'lodash/cloneDeep';
import mergeWith from 'lodash/mergeWith';

import { defaultState, TDataStore } from '../data.model';
import { toggleMode } from './toggle-mode';

export const queryStorage = createQueryStorage({
  partialize: (state) => {
    const newState = compact(state.state, defaultState);

    if (newState !== undefined && Object.keys(newState).length) {
      return { ...state, state: newState };
    }

    return undefined;
  },
  mergeWith: (state) => mergeWith(cloneDeep({ state: defaultState }), state),
});

export const dataStorageName = 'appState';

export const toggleDataStorage = toggleMode<
  TDataStore['data'],
  TDataStore['state'],
  TDataStore<TDataStore['state'], TDataStore['data']>
>(localStorage, queryStorage)(defaultState, dataStorageName);

export const dataStorage = createDoubleStorage(localStorage, queryStorage);
