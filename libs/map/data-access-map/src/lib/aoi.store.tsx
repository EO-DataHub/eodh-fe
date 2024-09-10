import type {} from '@redux-devtools/extension';
import Geometry from 'ol/geom/Geometry';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type TAoiMode = 'search' | 'view';

interface IAoiStore {
  mode: TAoiMode;
  currentShape: undefined | Geometry;
  setCurrentShape: (shape: Geometry | undefined) => void;
  visible: boolean;
  toggleVisibility: () => void;
  changeMode: (mode: TAoiMode) => void;
}

const useAoiStore = create<IAoiStore>()(
  devtools((set) => ({
    mode: 'search',
    currentShape: undefined,
    setCurrentShape: (shape: Geometry | undefined) => set(() => ({ currentShape: shape?.clone() })),
    visible: true,
    toggleVisibility: () => set((state) => ({ visible: !state.visible })),
    changeMode: (mode: TAoiMode) => set(() => ({ mode })),
  }))
);

export const useAoiMode = () => {
  return useAoiStore((state) => state.mode);
};

export const useCurrentAoi = () => {
  return useAoiStore((state) => state.currentShape);
};

export const useCurrentAoiMutation = () => {
  return useAoiStore((state) => state.setCurrentShape);
};

export const useAoiLayerVisible = () => {
  return useAoiStore((state) => state.visible);
};

export const useToggleAoiLayer = () => {
  return useAoiStore((state) => state.toggleVisibility);
};

export const useChangeAoiMode = () => {
  return useAoiStore((state) => state.changeMode);
};
