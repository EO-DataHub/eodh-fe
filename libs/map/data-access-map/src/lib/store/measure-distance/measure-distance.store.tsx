import type {} from '@redux-devtools/extension';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { createShape, getCoordinates } from '../../geometry/geometry';
import { IMeasureDistanceStore, TMeasureDistanceStoreState } from './measure-distance.model';

export const useMeasureDistanceStore = create<IMeasureDistanceStore>()(
  devtools((set) => ({
    visible: false,
    shape: undefined,
    coordinates: undefined,
    setShape: (shape) =>
      set(() => ({
        shape: createShape(getCoordinates(shape), shape?.type),
        coordinates: getCoordinates(shape),
      })),
    updateShape: (shape) =>
      set((state) => {
        if (!shape || !state.shape?.type) {
          return {
            shape: undefined,
            coordinates: undefined,
          };
        }

        return {
          shape: createShape(getCoordinates({ type: state.shape.type, shape }), state.shape.type),
          coordinates: getCoordinates({ type: state.shape.type, shape }),
        };
      }),
    toggleVisibility: () => set((state) => ({ visible: !state.visible })),
  }))
);

export const getMeasureDistanceStoreState = (): TMeasureDistanceStoreState => {
  const { toggleVisibility, shape, ...rest } = useMeasureDistanceStore.getState();

  return { ...rest };
};

export const useMeasureDistance = (): Omit<IMeasureDistanceStore, 'coordinates'> => {
  return useMeasureDistanceStore((state) => ({
    shape: state.shape,
    setShape: state.setShape,
    updateShape: state.updateShape,
    visible: state.visible,
    toggleVisibility: state.toggleVisibility,
  }));
};
