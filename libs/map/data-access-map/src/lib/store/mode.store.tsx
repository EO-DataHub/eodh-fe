import type {} from '@redux-devtools/extension';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { defaultState, IModeStore, TMode, TModeStoreState, TView } from './mode.model';
import { toggleMode } from './toggle-mode';

export const useModeStore = create<IModeStore>()(
  devtools((set) => ({
    ...defaultState,
    mode: 'search',
    changeMode: (mode: TMode) => set(() => ({ mode })),
    changeView: (view: TView) => set(() => ({ view })),
    toggleMode: () => set((state) => ({ mode: toggleMode(state.mode) })),
    reset: () => set(() => ({ ...defaultState })),
  }))
);

export const getModeStoreState = (): TModeStoreState => {
  const { changeMode, changeView, toggleMode, reset, mode, ...rest } = useModeStore.getState();

  return { ...rest };
};

export const useMode = () => {
  return useModeStore((state) => ({
    mode: state.mode,
    view: state.view,
    changeMode: state.changeMode,
    changeView: state.changeView,
    toggleMode: state.toggleMode,
  }));
};
