import type {} from '@redux-devtools/extension';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { TFeature } from '@ukri/map/data-access-stac-catalog';
import { useCallback, useMemo } from 'react';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { TMode } from '../mode.model';

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
  removeComparisonItem: (itemUid?: TUid) => void;
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
        const uniqueId: TUid = `${item.collection}_${item.id}`;
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
    removeComparisonItem: (itemUid?: string) => {
      set((state) => {
        const items = state.comparisonItems.items.filter((item) => item.uid !== itemUid);
        return {
          ...state,
          comparisonModeEnabled: false,
          comparisonItems: {
            ...state.comparisonItems,
            firsItemId: state.comparisonItems.firsItemId === itemUid ? undefined : state.comparisonItems.firsItemId,
            secondItemId:
              state.comparisonItems.secondItemId === itemUid ? undefined : state.comparisonItems.secondItemId,
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
    (itemUid?: TUid) => {
      return comparisonItems.items.some((item) => item.uid === itemUid);
    },
    [comparisonItems.items]
  );

  const canAddAsNewItemToComparisonMode = useCallback(
    (itemUid?: TUid) => {
      const isAddedForComparison = itemAddedToComparisonMode(itemUid);
      return comparisonItems.items.length >= 2 && !isAddedForComparison;
    },
    [comparisonItems.items, itemAddedToComparisonMode]
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
    }),
    [
      comparisonItems,
      comparisonModeEnabled,
      toggleComparisonMode,
      addComparisonItem,
      removeComparisonItem,
      itemAddedToComparisonMode,
      canAddAsNewItemToComparisonMode,
    ]
  );
};
