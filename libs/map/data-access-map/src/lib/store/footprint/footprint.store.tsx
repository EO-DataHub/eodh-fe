import type {} from '@redux-devtools/extension';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { TCollection } from '@ukri/map/data-access-stac-catalog'; // todo: [fix boundaries] check if it fixed when Anti-Corruption Layer for Map will be created
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { IFootprintStore, TFootprintStoreState } from './footprint.model';

const defaultCollectionName = 'default';

export const useFootprintStore = create<IFootprintStore>()(
  devtools((set) => ({
    currentCollection: undefined,
    collections: {},
    footprintClickId: undefined,
    thumbnailHoverId: undefined,
    setFootprintClickId: (id: string | undefined) => set({ footprintClickId: id }),
    setThumbnailHoverId: (id: string | undefined) => set({ thumbnailHoverId: id }),
    setCollection: (collection: TCollection | undefined, id = defaultCollectionName) =>
      set((state) => {
        const currentCollection = state.collections[id];

        return {
          collections: {
            ...state.collections,
            [id]: {
              collection: collection ? { ...collection } : undefined,
              visible: currentCollection ? currentCollection.visible : true,
            },
          },
        };
      }),
    toggleVisibility: (id: string = defaultCollectionName) =>
      set((state) => {
        const currentCollection = state.collections[id];

        if (!currentCollection) {
          return state;
        }

        return {
          collections: {
            ...state.collections,
            [id]: {
              collection: currentCollection.collection,
              visible: !currentCollection.visible,
            },
          },
        };
      }),
    show: (id: string = defaultCollectionName) =>
      set((state) => {
        const currentCollection = state.collections[id];

        if (!currentCollection) {
          return state;
        }

        return {
          collections: {
            ...state.collections,
            [id]: {
              collection: currentCollection.collection,
              visible: true,
            },
          },
        };
      }),
    hide: (id: string = defaultCollectionName) =>
      set((state) => {
        const currentCollection = state.collections[id];

        if (!currentCollection) {
          return state;
        }

        return {
          collections: {
            ...state.collections,
            [id]: {
              collection: currentCollection.collection,
              visible: false,
            },
          },
        };
      }),
  }))
);

export const useFootprintClickId = () => {
  return useFootprintStore((state) => state.footprintClickId);
};

export const useSetFootprintClickId = () => {
  return useFootprintStore((state) => state.setFootprintClickId);
};

export const useThumbnailHoverId = () => {
  return useFootprintStore((state) => state.thumbnailHoverId);
};

export const useSetThumbnailHoverId = () => {
  return useFootprintStore((state) => state.setThumbnailHoverId);
};

export const getFootprintStoreState = (): TFootprintStoreState => {
  const { toggleVisibility, show, hide, setCollection, ...rest } = useFootprintStore.getState();

  return { ...rest };
};

export const useFootprintCollection = (id: string = defaultCollectionName) => {
  return useFootprintStore((state) => {
    if (state.collections[id]) {
      return state.collections[id].collection;
    }

    return undefined;
  });
};

export const useFootprintCollectionMutation = () => {
  return useFootprintStore((state) => state.setCollection);
};

export const useFootprintLayerVisible = (id: string = defaultCollectionName) => {
  return useFootprintStore((state) => {
    const currentCollection = state.collections[id];
    return currentCollection ? currentCollection.visible : false;
  });
};

export const useToggleFootprintLayer = () => {
  return useFootprintStore((state) => ({
    show: state.show,
    hide: state.hide,
    toggle: state.toggleVisibility,
  }));
};
