import type {} from '@redux-devtools/extension';
import Geometry from 'ol/geom/Geometry';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IAoiStore {
  currentShape: undefined | Geometry;
  setCurrentShape: (shape: Geometry | undefined) => void;
}

const useAoiStore = create<IAoiStore>()(
  devtools((set) => ({
    currentShape: undefined,
    setCurrentShape: (shape: Geometry | undefined) => set(() => ({ currentShape: shape?.clone() })),
  }))
);

export const useCurrentAoi = () => {
  return useAoiStore((state) => state.currentShape);
};

export const useCurrentAoiMutation = () => {
  return useAoiStore((state) => state.setCurrentShape);
};
