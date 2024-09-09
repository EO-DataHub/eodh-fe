import type {} from '@redux-devtools/extension';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { TCollection } from '@ukri/map/data-access-stac-catalog';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IFootprintStore {
  collection: TCollection | undefined;
  setCollection: (url: TCollection | undefined) => void;
  visible: boolean;
  toggleVisibility: () => void;
}

const useFootprintStore = create<IFootprintStore>()(
  devtools((set) => ({
    collection: undefined,
    setCollection: (collection: TCollection | undefined) => set(() => ({ collection })),
    visible: true,
    toggleVisibility: () => set((state) => ({ visible: !state.visible })),
  }))
);

export const useFootprintCollection = () => {
  return useFootprintStore((state) => state.collection);
};

export const useFootprintCollectionMutation = () => {
  return useFootprintStore((state) => state.setCollection);
};

export const useFootprintLayerVisible = () => {
  return useFootprintStore((state) => state.visible);
};

export const useToggleFootprintLayer = () => {
  return useFootprintStore((state) => state.toggleVisibility);
};
