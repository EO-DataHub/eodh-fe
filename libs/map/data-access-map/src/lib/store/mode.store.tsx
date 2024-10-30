import type {} from '@redux-devtools/extension';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { IModeStore, TACView, TMode } from './mode.model';
import { toggleMode } from './toggle-mode';

const useModeStore = create<IModeStore>()(
  devtools((set) => ({
    mode: 'search',
    changeMode: (mode: TMode) => set(() => ({ mode })),
    toggleMode: () => set((state) => ({ mode: toggleMode(state.mode) })),
    acView: 'acTreeView',
    changeAcView: (acView: TACView) => set(() => ({ acView })),
    acResultsData: undefined,
    setAcResultsData: (acResultsData) => set(() => ({ acResultsData })),
    acResultStatus: 'pending',
    setAcResultStatus: (acResultStatus) => set(() => ({ acResultStatus })),
  }))
);

export const useMode = () => {
  return useModeStore((state) => ({
    mode: state.mode,
    changeMode: state.changeMode,
    toggleMode: state.toggleMode,
    acView: state.acView,
    changeAcView: state.changeAcView,
    acResultsData: state.acResultsData,
    setAcResultsData: state.setAcResultsData,
    acResultStatus: state.acResultStatus,
    setAcResultStatus: state.setAcResultStatus,
  }));
};
