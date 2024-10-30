import type {} from '@redux-devtools/extension';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { IAoiStore, TAoiState, TAoiStoreState } from './aoi.model';
import { createShape, getCoordinates } from './geometry';

export const useAoiStore = create<IAoiStore>()(
  devtools((set) => ({
    state: 'edit',
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
    visible: true,
    toggleVisibility: () => set((state) => ({ visible: !state.visible })),
    show: () => set(() => ({ visible: true })),
    hide: () => set(() => ({ visible: false })),
    changeState: (state: TAoiState) => set(() => ({ state })),
  }))
);

export const getAoiStoreState = (): TAoiStoreState => {
  const { show, hide, changeState, toggleVisibility, shape, ...rest } = useAoiStore.getState();

  return { ...rest };
};

export const useAoi = (): Omit<IAoiStore, 'coordinates'> => {
  return useAoiStore((state) => ({
    state: state.state,
    shape: state.shape,
    setShape: state.setShape,
    updateShape: state.updateShape,
    visible: state.visible,
    toggleVisibility: state.toggleVisibility,
    show: state.show,
    hide: state.hide,
    changeState: state.changeState,
  }));
};