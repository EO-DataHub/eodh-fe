import type {} from '@redux-devtools/extension';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { IModeStore, TMode } from './mode.model';
import { toggleMode } from './toggle-state';

const useModeStore = create<IModeStore>()(
  devtools((set) => ({
    mode: 'search',
    changeMode: (mode: TMode) => set(() => ({ mode })),
    toggleMode: () => set((state) => ({ mode: toggleMode(state.mode) })),
  }))
);

export const useMode = () => {
  return useModeStore((state) => ({
    mode: state.mode,
    changeMode: state.changeMode,
    toggleMode: state.toggleMode,
  }));
};
