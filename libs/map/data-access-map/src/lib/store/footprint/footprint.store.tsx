import type {} from '@redux-devtools/extension';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { TCollection } from '@ukri/map/data-access-stac-catalog'; // todo: [fix boundaries] check if it fixed when Anti-Corruption Layer for Map will be created
import isEqual from 'lodash/isEqual';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { IFootprintStore, IHighlightedItem, TFootprintStoreState } from './footprint.model';

const defaultCollectionName = 'default';

export const useFootprintStore = create<IFootprintStore>()(
  devtools((set) => ({
    currentCollection: undefined,
    collections: {},
    highlightedItems: [],
    highlightItem: (newItem: IHighlightedItem | undefined) =>
      set((state) => {
        if (!newItem) {
          const pointerMoveItems = state.highlightedItems.some((item) => item.eventType === 'pointermove');
          if (pointerMoveItems) {
            return {
              highlightedItems: state.highlightedItems.filter((item) => item.eventType !== 'pointermove'),
            };
          }

          return state;
        }

        const itemAlreadyExists = state.highlightedItems.some((item) => isEqual(item, newItem));
        const itemWithSameIdExits = state.highlightedItems.some((item) => item.featureId === newItem.featureId);

        if (itemAlreadyExists) {
          if (newItem.eventType === 'click') {
            return {
              highlightedItems: state.highlightedItems
                .filter((item) => item.featureId !== newItem.featureId)
                .concat({ ...newItem, eventType: 'pointermove' }),
            };
          }

          return state;
        }

        if (itemWithSameIdExits) {
          return {
            highlightedItems: state.highlightedItems
              .filter((item) => item.eventType !== newItem.eventType)
              .concat({ ...newItem }),
          };
        }

        if (newItem.eventType === 'pointermove') {
          return {
            highlightedItems: state.highlightedItems
              .filter((item) => item.eventType !== 'pointermove')
              .concat({ ...newItem }),
          };
        }

        return { highlightedItems: state.highlightedItems.concat({ ...newItem }) };
      }),
    clearHighlight: () => set(() => ({ highlightedItems: [] })),
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

export const useFootprints = () => {
  return useFootprintStore((state) => ({
    show: state.show,
    hide: state.hide,
    toggle: state.toggleVisibility,
    highlightedItems: state.highlightedItems,
    highlightItem: state.highlightItem,
    clearHighlight: state.clearHighlight,
  }));
};
