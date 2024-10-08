import type {} from '@redux-devtools/extension';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { useAoiStore } from './aoi-store/aoi.store';
import { useDataSetsStore } from './data-sets-store/data-sets.store';
import { useDateStore } from './date-store/date.store';
import { useFootprintStore } from './footprint.store';
import { useTrueColorImageStore } from './true-color-image.store';

type TMode = 'search' | 'action-creator';

interface IModeStore {
  mode: TMode;
  changeMode: (mode: TMode) => void;
  toggleMode: () => void;
}

const useModeStore = create<IModeStore>()(
  devtools((set) => ({
    mode: 'search',
    changeMode: (mode: TMode) => set(() => ({ mode })),
    toggleMode: () =>
      set((state) => {
        const newMode = state.mode === 'search' ? 'action-creator' : 'search';

        useAoiStore.getState().setShape(undefined);
        useAoiStore.getState().changeState(newMode === 'action-creator' ? 'readonly' : 'edit');
        useDateStore.getState().updateDate(undefined);
        useDataSetsStore.getState().updateDataSets(undefined);
        useDataSetsStore.getState().changeSchema(newMode);
        useFootprintStore.getState().setCollection(undefined);
        useTrueColorImageStore.getState().setStacUrl(undefined);

        return { mode: newMode };
      }),
  }))
);

export const useMode = () => {
  return useModeStore((state) => ({
    mode: state.mode,
    changeMode: state.changeMode,
    toggleMode: state.toggleMode,
  }));
};
