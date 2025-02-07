import type {} from '@redux-devtools/extension';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { TAssetKey, TFeature } from '@ukri/map/data-access-stac-catalog';
import { useCallback, useMemo } from 'react';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { TMode } from '../mode.model';

const createUniqueItemId = (item: TFeature, key?: TAssetKey) =>
  key ? (`${item.collection}_${item.id}_KEY_${key}` as TUid) : (`${item.collection}_${item.id}` as TUid);

type TId = string;
type TCollection = string;
export type TUid = `${TCollection}_${TId}` | `${TCollection}_${TId}_KEY_${TAssetKey}`;

export type TComparisonItem = TFeature & {
  uid: TUid;
  mode: TMode;
  stacUrl?: string;
  key?: TAssetKey;
};

interface IComparisonToolStore {
  comparisonItems: {
    firsItemId?: TUid;
    secondItemId?: TUid;
    items: TComparisonItem[];
  };
  comparisonModeEnabled: boolean;
  toggleComparisonMode: (comparisonModeEnabled?: boolean) => void;
  addComparisonItem: (item: TFeature, mode: TMode, key?: TAssetKey) => void;
  removeComparisonItem: (item: TFeature, key?: TAssetKey) => void;
}

const useComparisonToolStore = create<IComparisonToolStore>()(
  devtools((set) => ({
    comparisonItems: {
      firsItemId: undefined,
      secondItemId: undefined,
      items: [],
    },
    comparisonModeEnabled: false,
    toggleComparisonMode: () =>
      set((state) => ({
        ...state,
        comparisonModeEnabled: !state.comparisonModeEnabled,
      })),
    addComparisonItem: (item: TFeature, mode: TMode, key?: TAssetKey) =>
      set((state) => {
        const uniqueId = createUniqueItemId(item, key);
        const newItem = {
          ...item,
          uid: uniqueId,
          mode: mode,
          stacUrl: item?.links.find((link) => link.rel === 'self')?.href,
          key,
        };
        if (state.comparisonItems.firsItemId === undefined) {
          return {
            ...state,
            comparisonItems: {
              ...state.comparisonItems,
              firsItemId: uniqueId,
              items: [...state.comparisonItems.items, newItem],
            },
          };
        } else if (state.comparisonItems.secondItemId === undefined) {
          return {
            ...state,
            comparisonItems: {
              ...state.comparisonItems,
              secondItemId: uniqueId,
              items: [...state.comparisonItems.items, newItem],
            },
          };
        }
        return {
          ...state,
        };
      }),
    removeComparisonItem: (item: TFeature, key?: TAssetKey) => {
      set((state) => {
        const uniqueId = createUniqueItemId(item, key);
        const items = state.comparisonItems.items.filter((item) => item.uid !== uniqueId);
        return {
          ...state,
          comparisonModeEnabled: false,
          comparisonItems: {
            ...state.comparisonItems,
            firsItemId: state.comparisonItems.firsItemId === uniqueId ? undefined : state.comparisonItems.firsItemId,
            secondItemId:
              state.comparisonItems.secondItemId === uniqueId ? undefined : state.comparisonItems.secondItemId,
            items,
          },
        };
      });
    },
  }))
);

export const useComparisonMode = () => {
  const { comparisonItems, comparisonModeEnabled, toggleComparisonMode, addComparisonItem, removeComparisonItem } =
    useComparisonToolStore((state) => ({
      comparisonItems: state.comparisonItems,
      comparisonModeEnabled: state.comparisonModeEnabled,
      toggleComparisonMode: state.toggleComparisonMode,
      addComparisonItem: state.addComparisonItem,
      removeComparisonItem: state.removeComparisonItem,
    }));

  const itemAddedToComparisonMode = useCallback(
    (item: TFeature, key?: TAssetKey) => {
      const uniqueId = createUniqueItemId(item, key);
      // console.log('comparisonItems.items', comparisonItems.items);
      return comparisonItems.items.some((item) => item.uid === uniqueId);
    },
    [comparisonItems.items]
  );

  const canAddAsNewItemToComparisonMode = useCallback(
    (item: TFeature, key?: TAssetKey) => {
      const isAddedForComparison = itemAddedToComparisonMode(item, key);
      return comparisonItems.items.length >= 2 && !isAddedForComparison;
    },
    [comparisonItems.items, itemAddedToComparisonMode]
  );

  const toggleCompareItem = useCallback(
    (item: TFeature, mode: TMode, key?: TAssetKey) => {
      if (itemAddedToComparisonMode(item, key)) {
        removeComparisonItem(item, key);
        return;
      }

      addComparisonItem(item, mode, key);
    },
    [addComparisonItem, removeComparisonItem, itemAddedToComparisonMode]
  );

  return useMemo(
    () => ({
      comparisonItems,
      comparisonModeEnabled,
      toggleComparisonMode,
      addComparisonItem,
      removeComparisonItem,
      itemAddedToComparisonMode,
      canAddAsNewItemToComparisonMode,
      toggleCompareItem,
    }),
    [
      comparisonItems,
      comparisonModeEnabled,
      toggleComparisonMode,
      addComparisonItem,
      removeComparisonItem,
      itemAddedToComparisonMode,
      canAddAsNewItemToComparisonMode,
      toggleCompareItem,
    ]
  );
};
