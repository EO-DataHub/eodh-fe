import type {} from '@redux-devtools/extension';
import isFunction from 'lodash/isFunction';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { createShape, getCoordinates } from '../../geometry/geometry';
import { IAoiStore, TAoiState, TAoiStoreState, TDrawingTool } from './aoi.model';

export const useAoiStore = create<IAoiStore>()(
  devtools((set) => ({
    state: 'edit',
    shape: undefined,
    drawingTool: undefined,
    coordinates: undefined,
    fitToAoi: false,
    setFitToAoi: (fitToAoi: boolean) =>
      set(() => ({
        fitToAoi: fitToAoi !== undefined ? fitToAoi : undefined,
      })),
    setShape: (shape, fitToAoi?: boolean) =>
      set(() => ({
        shape: createShape(getCoordinates(shape), shape?.type),
        coordinates: getCoordinates(shape),
        fitToAoi: fitToAoi !== undefined ? fitToAoi : undefined,
      })),
    updateShape: (shapeOrFunction) =>
      set((state) => {
        const shape = isFunction(shapeOrFunction) ? shapeOrFunction(state.shape) : shapeOrFunction;
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
    setDrawingTool: (drawingTool?: TDrawingTool) => set(() => ({ drawingTool })),
    toggleDrawingToolShape: (shape: TDrawingTool['type']) =>
      set((state) => {
        if (state.drawingTool?.type === shape) {
          return { drawingTool: undefined };
        }
        return {
          drawingTool: {
            enabled: true,
            type: shape,
          },
        };
      }),
  }))
);

export const getAoiStoreState = (): TAoiStoreState => {
  const { show, hide, changeState, toggleVisibility, shape, toggleDrawingToolShape, setDrawingTool, ...rest } =
    useAoiStore.getState();

  return { ...rest };
};

export const useAoi = (): Omit<IAoiStore, 'coordinates'> => {
  return useAoiStore((state) => ({
    fitToAoi: state.fitToAoi,
    state: state.state,
    shape: state.shape,
    setShape: state.setShape,
    updateShape: state.updateShape,
    visible: state.visible,
    toggleVisibility: state.toggleVisibility,
    show: state.show,
    hide: state.hide,
    changeState: state.changeState,
    drawingTool: state.drawingTool,
    toggleDrawingToolShape: state.toggleDrawingToolShape,
    setDrawingTool: state.setDrawingTool,
    setFitToAoi: state.setFitToAoi,
  }));
};
