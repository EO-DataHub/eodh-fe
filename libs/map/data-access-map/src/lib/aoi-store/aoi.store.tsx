import type {} from '@redux-devtools/extension';
import { createQueryStorage } from '@ukri/shared/utils/store';
import cloneDeep from 'lodash/cloneDeep';
import mergeWith from 'lodash/mergeWith';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import { defaultState, IAoiStore, TAoiState, TAoiStoreState } from './aoi.model';
import { createShape, getCoordinates } from './geometry';

export const useAoiStore = create<IAoiStore>()(
  devtools(
    persist(
      (set) => ({
        ...defaultState,
        shape: undefined,
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
        show: () => set(() => ({ visible: true })),
        hide: () => set(() => ({ visible: false })),
        toggleVisibility: () => set((state) => ({ visible: !state.visible })),
        changeState: (state: TAoiState) => set(() => ({ state })),
      }),
      {
        name: 'aoi',
        storage: createJSONStorage(() => createQueryStorage()),
        partialize: (state) => ({
          state: state.state,
          coordinates: state.coordinates,
          visible: state.visible,
        }),
        merge: (persistedState, currentState) =>
          mergeWith(cloneDeep(persistedState), currentState, {
            shape: createShape(
              (persistedState as IAoiStore).coordinates,
              (persistedState as IAoiStore).coordinates?.type
            ),
          }),
      }
    )
  )
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
