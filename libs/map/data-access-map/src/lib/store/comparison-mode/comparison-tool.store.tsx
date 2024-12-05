import type {} from '@redux-devtools/extension';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { TFeature } from '@ukri/map/data-access-stac-catalog';
import { useCallback, useMemo } from 'react';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { TMode } from '../mode.model';

const createUniqueItemId = (item: TFeature) => `${item.collection}_${item.id}` as TUid;

type TId = string;
type TCollection = string;
export type TUid = `${TCollection}_${TId}`;

export type TComparisonItem = TFeature & {
  uid: TUid;
  mode: TMode;
  stacUrl?: string;
};

interface IComparisonToolStore {
  comparisonItems: {
    firsItemId?: TUid;
    secondItemId?: TUid;
    items: TComparisonItem[];
  };
  comparisonModeEnabled: boolean;
  toggleComparisonMode: (comparisonModeEnabled?: boolean) => void;
  addComparisonItem: (item: TFeature, mode: TMode) => void;
  removeComparisonItem: (item: TFeature) => void;
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
    addComparisonItem: (item: TFeature, mode: TMode) =>
      set((state) => {
        const uniqueId = createUniqueItemId(item!);
        const newItem = {
          ...item,
          uid: uniqueId,
          mode: mode,
          stacUrl: item?.links.find((link) => link.rel === 'self')?.href,
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
    removeComparisonItem: (item: TFeature) => {
      set((state) => {
        const uniqueId = createUniqueItemId(item);
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
    (item: TFeature) => {
      const uniqueId = createUniqueItemId(item);
      return comparisonItems.items.some((item) => item.uid === uniqueId);
    },
    [comparisonItems.items]
  );

  const canAddAsNewItemToComparisonMode = useCallback(
    (item: TFeature) => {
      const isAddedForComparison = itemAddedToComparisonMode(item);
      return comparisonItems.items.length >= 2 && !isAddedForComparison;
    },
    [comparisonItems.items, itemAddedToComparisonMode]
  );

  const toggleCompareItem = useCallback(
    (id: string) => {
      if (itemAddedToComparisonMode(id)) {
        removeComparisonItem(id);
        return;
      }

      addComparisonItem({ id });
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
