import type {} from '@redux-devtools/extension';
import { createQueryStorage } from '@ukri/shared/utils/store';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import { IModeStore, TMode } from './mode.model';
import { toggleMode } from './toggle-state';

const useModeStore = create<IModeStore>()(
  devtools(
    persist(
      (set) => ({
        mode: 'search',
        changeMode: (mode: TMode) => set(() => ({ mode })),
        toggleMode: () => set((state) => ({ mode: toggleMode(state.mode) })),
      }),
      {
        name: 'mode',
        storage: createJSONStorage(() => createQueryStorage()),
        partialize: (state) => ({
          mode: state.mode,
        }),
      }
    )
  )
);

export const useMode = () => {
  return useModeStore((state) => ({
    mode: state.mode,
    changeMode: state.changeMode,
    toggleMode: state.toggleMode,
  }));
};
