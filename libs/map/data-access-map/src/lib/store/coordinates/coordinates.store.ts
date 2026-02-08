import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { ICoordinateLabel, ICoordinatesStore } from './coordinates.model';

export const useCoordinatesStore = create<ICoordinatesStore>()(
  devtools((set) => {
    return {
      coordinates: [] as ICoordinateLabel[],
      setCoordinates: (coordinates) => set(() => ({ coordinates })),
      clearCoordinates: () => set(() => ({ coordinates: [] as ICoordinateLabel[] })),
      visible: true,
      toggleVisibility: () => set((state) => ({ visible: !state.visible })),
    };
  })
);

export const useCoordinates = () => {
  return useCoordinatesStore((state) => ({
    coordinates: state.coordinates,
    setCoordinates: state.setCoordinates,
    clearCoordinates: state.clearCoordinates,
    visible: state.visible,
    toggleVisibility: state.toggleVisibility,
  }));
};
