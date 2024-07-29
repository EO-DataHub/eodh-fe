import type {} from '@redux-devtools/extension';
import Geometry from 'ol/geom/Geometry';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IShapeStore {
  currentShape: undefined | Geometry;
  setCurrentShape: (shape: Geometry | undefined) => void;
}

const useShapeStore = create<IShapeStore>()(
  devtools((set) => ({
    currentShape: undefined,
    setCurrentShape: (shape: Geometry | undefined) => set(() => ({ currentShape: shape?.clone() })),
  }))
);

export const useCurrentShape = () => {
  return useShapeStore((state) => state.currentShape);
};

export const useCurrentShapeMutation = () => {
  return useShapeStore((state) => state.setCurrentShape);
};
