import type {} from '@redux-devtools/extension';
import { Geometry } from 'ol/geom';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { IAoiStore, TAoiState, TAoiStoreState } from './aoi.model';
import { createPolygon, getCoordinates } from './geometry';

export const useAoiStore = create<IAoiStore>()(
  devtools((set) => ({
    state: 'edit',
    shape: undefined,
    coordinates: undefined,
    setShape: (shape: Geometry | undefined) =>
      set((state) => ({
        ...state,
        shape: createPolygon(getCoordinates(shape)),
        coordinates: getCoordinates(shape),
      })),
    visible: true,
    toggle: () => set((state) => ({ visible: !state.visible })),
    show: () => set(() => ({ visible: true })),
    hide: () => set(() => ({ visible: false })),
    changeState: (state: TAoiState) => set(() => ({ state })),
  }))
);

export const getAoiStoreState = (): TAoiStoreState => {
  const { show, hide, changeState, toggle, ...rest } = useAoiStore.getState();

  return { ...rest };
};

export const useAoi = () => {
  return useAoiStore((state) => ({
    state: state.state,
    shape: state.shape,
    setShape: state.setShape,
    visible: state.visible,
    toggle: state.toggle,
    show: state.show,
    hide: state.hide,
    changeState: state.changeState,
  }));
};
