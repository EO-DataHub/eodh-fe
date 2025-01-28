import { TIActionCreatorStoreState } from './action-creator/action-creator.model';
import { getActionCreatorStoreState, useActionCreatorStore } from './action-creator/action-creator.store';
import { IAoiStore } from './aoi/aoi.model';
import { getAoiStoreState, useAoiStore } from './aoi/aoi.store';
import { TDataSetsStore } from './data-sets/data-sets.model';
import { getDataSetsStoreState, useDataSetsStore } from './data-sets/data-sets.store';
import { TDateStoreState } from './date/date.model';
import { getDateStoreState, useDateStore } from './date/date.store';
import { TFootprintStoreState } from './footprint/footprint.model';
import { getFootprintStoreState, useFootprintStore } from './footprint/footprint.store';
import { IModeStore, TMode } from './mode.model';
import { getModeStoreState, useModeStore } from './mode.store';
import { TResultsStore } from './results/results.model';
import { getResultsStoreState, useResultsStore } from './results/results.store';
import { TTrueImageStoreState } from './true-color-image/true-color-image.model';
import { getTrueColorImageStoreState, useTrueColorImageStore } from './true-color-image/true-color-image.store';

const storeKeys = {
  MODE: (mode: TMode) => `${mode}-mode`,
  AOI: (mode: TMode) => `${mode}-aoi`,
  RESULTS: (mode: TMode) => `${mode}-results`,
  DATA_SETS: (mode: TMode) => `${mode}-data-sets`,
  DATE: (mode: TMode) => `${mode}-date`,
  FOOTPRINT: (mode: TMode) => `${mode}-footprint`,
  TRUE_COLOR_IMAGE: (mode: TMode) => `${mode}-true-color-image`,
  ACTION_CREATOR: (mode: TMode) => `${mode}-action-creator`,
};

const setItemInLocalStorage = (key: string, value: object) => {
  if (!Object.keys(value).length) {
    return;
  }

  localStorage.setItem(key, JSON.stringify(value));
};

const getItemFromLocalStorage = <T extends object>(key: string): T | null => {
  const item = localStorage.getItem(key);
  if (!item) {
    return null;
  }

  return JSON.parse(item);
};

const restoreModeStoreState = (mode: TMode) => {
  const currentState = getItemFromLocalStorage<IModeStore>(storeKeys.MODE(mode));

  if (!currentState) {
    useModeStore.getState().reset();
    return;
  }

  useModeStore.setState(currentState);
};

const restoreAoiStoreState = (mode: TMode) => {
  console.log('restoreAoiStoreState');
  const currentState = getItemFromLocalStorage<IAoiStore>(storeKeys.AOI(mode));
  const newStoreState = mode === 'action-creator' ? 'readonly' : 'edit';

  if (!currentState) {
    useAoiStore.getState().setShape(undefined);
    useAoiStore.getState().changeState(newStoreState);
    return;
  }

  useAoiStore.setState(currentState);
  useAoiStore.getState().setShape(currentState.coordinates);
  useAoiStore.getState().changeState(newStoreState);
};

const restoreResultsStoreState = (mode: TMode) => {
  const currentState = getItemFromLocalStorage<TResultsStore>(storeKeys.RESULTS(mode));

  if (!currentState) {
    useResultsStore.getState().setShape(undefined);
    useResultsStore.getState().updateSearchParams(undefined);
    return;
  }

  useResultsStore.setState(currentState);
  useResultsStore.getState().restore(currentState.coordinates, currentState.searchParams);
};

const restoreDataSetsStoreState = (mode: TMode) => {
  const currentState = getItemFromLocalStorage<TDataSetsStore>(storeKeys.DATA_SETS(mode));

  if (!currentState) {
    useDataSetsStore.getState().updateDataSets(undefined);
    useDataSetsStore.getState().changeSchema(mode);
    return;
  }

  useDataSetsStore.setState(currentState);
};

const restoreDateStoreState = (mode: TMode) => {
  const currentState = getItemFromLocalStorage<TDateStoreState>(storeKeys.DATE(mode));
  const newStoreState = mode === 'action-creator' ? 'readonly' : 'edit';

  if (!currentState) {
    useDateStore.getState().reset();
    useDateStore.getState().changeState(newStoreState);
    return;
  }

  useDateStore.setState(currentState);
  useDateStore.getState().changeState(newStoreState);
};

const restoreFootprintStoreState = (mode: TMode) => {
  const currentState = getItemFromLocalStorage<TFootprintStoreState>(storeKeys.FOOTPRINT(mode));
  if (!currentState) {
    useFootprintStore.getState().setCollection(undefined);
    return;
  }

  useFootprintStore.setState(currentState);
};

const restoreTrueColorImageStoreState = (mode: TMode) => {
  const currentState = getItemFromLocalStorage<TTrueImageStoreState>(storeKeys.TRUE_COLOR_IMAGE(mode));
  if (!currentState || !Object.keys(currentState).length) {
    useTrueColorImageStore.getState().setFeature(undefined);
    return;
  }

  useTrueColorImageStore.setState(currentState);
};

const restoreActionCreatorStoreState = (mode: TMode) => {
  const currentState = getItemFromLocalStorage<TIActionCreatorStoreState>(storeKeys.ACTION_CREATOR(mode));

  if (mode === 'action-creator') {
    useActionCreatorStore.getState().reset(currentState || undefined);
    return;
  }

  if (!currentState) {
    useActionCreatorStore.getState().setNodes(undefined);
    return;
  }

  useActionCreatorStore.setState(currentState);
};

const restoreStateFromLocalStorage = (mode: TMode) => {
  restoreModeStoreState(mode);
  restoreAoiStoreState(mode);
  restoreResultsStoreState(mode);
  restoreDataSetsStoreState(mode);
  restoreDateStoreState(mode);
  restoreFootprintStoreState(mode);
  restoreTrueColorImageStoreState(mode);
  restoreActionCreatorStoreState(mode);
};

const saveStateInLocalStorage = (mode: TMode) => {
  setItemInLocalStorage(storeKeys.MODE(mode), getModeStoreState());
  setItemInLocalStorage(storeKeys.AOI(mode), getAoiStoreState());
  setItemInLocalStorage(storeKeys.RESULTS(mode), getResultsStoreState());
  setItemInLocalStorage(storeKeys.DATA_SETS(mode), getDataSetsStoreState());
  setItemInLocalStorage(storeKeys.DATE(mode), getDateStoreState());
  setItemInLocalStorage(storeKeys.FOOTPRINT(mode), getFootprintStoreState());
  setItemInLocalStorage(storeKeys.TRUE_COLOR_IMAGE(mode), getTrueColorImageStoreState());
  setItemInLocalStorage(storeKeys.ACTION_CREATOR(mode), getActionCreatorStoreState());
};

const resetLocalStorage = (mode: TMode) => {
  localStorage.removeItem(storeKeys.MODE(mode));
  localStorage.removeItem(storeKeys.AOI(mode));
  localStorage.removeItem(storeKeys.RESULTS(mode));
  localStorage.removeItem(storeKeys.DATA_SETS(mode));
  localStorage.removeItem(storeKeys.DATE(mode));
  localStorage.removeItem(storeKeys.FOOTPRINT(mode));
  localStorage.removeItem(storeKeys.TRUE_COLOR_IMAGE(mode));
  localStorage.removeItem(storeKeys.ACTION_CREATOR(mode));
};

export const toggleMode = (currentMode: TMode): TMode => {
  const newMode = currentMode === 'search' ? 'action-creator' : 'search';

  saveStateInLocalStorage(currentMode);
  restoreStateFromLocalStorage(newMode);

  return newMode;
};

resetLocalStorage('search');
resetLocalStorage('action-creator');
