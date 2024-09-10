import type {} from '@redux-devtools/extension';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { TCollection } from '@ukri/map/data-access-stac-catalog'; // todo: [fix boundaries] check if it fixed when Anti-Corruption Layer for Map will be created
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IFootprintStore {
  currentCollection: TCollection | undefined;
  collections: {
    [key: string]: {
      collection: TCollection | undefined;
      visible: boolean;
    };
  };
  setCollection: (url: TCollection | undefined, id?: string) => void;
  visible: boolean;
  toggleVisibility: (id?: string) => void;
}

const useFootprintStore = create<IFootprintStore>()(
  devtools((set) => ({
    currentCollection: undefined,
    collections: {},
    setCollection: (collection: TCollection | undefined, id?: string) =>
      set((state) => ({
        currentCollection: collection,
        collections: !id
          ? state.collections
          : {
              ...state.collections,
              [id]: {
                collection,
                visible: true,
              },
            },
      })),
    visible: true,
    toggleVisibility: (id?: string) =>
      set((state) => ({
        visible: !state.visible,
        collections: !id
          ? state.collections
          : {
              ...state.collections,
              [id]: {
                collection: state.collections[id].collection,
                visible: !state.collections[id].visible,
              },
            },
      })),
  }))
);

export const useFootprintCollection = (id?: string) => {
  return useFootprintStore((state) => {
    if (!id) {
      return state.currentCollection;
    }

    if (state.collections[id]) {
      return state.collections[id].collection;
    }

    return undefined;
  });
};

export const useFootprintCollectionMutation = () => {
  return useFootprintStore((state) => state.setCollection);
};

export const useFootprintLayerVisible = (id?: string) => {
  return useFootprintStore((state) => (!id ? state.visible : state.collections[id]?.visible));
};

export const useToggleFootprintLayer = () => {
  return useFootprintStore((state) => state.toggleVisibility);
};
