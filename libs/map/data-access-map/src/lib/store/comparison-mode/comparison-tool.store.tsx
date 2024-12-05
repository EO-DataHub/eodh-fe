import type {} from '@redux-devtools/extension';
import { useCallback, useMemo } from 'react';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type TComparisonItem = {
  id: string;
};

interface IComparisonToolStore {
  comparisonItems: {
    firsItemId?: string;
    secondItemId?: string;
    items: TComparisonItem[];
  };
  comparisonModeEnabled: boolean;
  toggleComparisonMode: (comparisonModeEnabled?: boolean) => void;
  addComparisonItem: (item: TComparisonItem) => void;
  removeComparisonItem: (itemId?: string) => void;
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
    addComparisonItem: (item: { id: string }) =>
      set((state) => {
        if (state.comparisonItems.firsItemId === undefined) {
          return {
            ...state,
            comparisonItems: {
              ...state.comparisonItems,
              firsItemId: item.id,
              items: [...state.comparisonItems.items, item],
            },
          };
        } else if (state.comparisonItems.secondItemId === undefined) {
          return {
            ...state,
            comparisonItems: {
              ...state.comparisonItems,
              secondItemId: item.id,
              items: [...state.comparisonItems.items, item],
            },
          };
        }
        return {
          ...state,
        };
      }),
    removeComparisonItem: (itemId?: string) => {
      set((state) => {
        const items = state.comparisonItems.items.filter((item) => item.id !== itemId);
        return {
          ...state,
          comparisonModeEnabled: false,
          comparisonItems: {
            ...state.comparisonItems,
            firsItemId: state.comparisonItems.firsItemId === itemId ? undefined : state.comparisonItems.firsItemId,
            secondItemId:
              state.comparisonItems.secondItemId === itemId ? undefined : state.comparisonItems.secondItemId,
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
    (itemId?: string) => {
      return comparisonItems.items.some((item) => item.id === itemId);
    },
    [comparisonItems.items]
  );

  const canAddAsNewItemToComparisonMode = useCallback(
    (itemId?: string) => {
      const isAddedForComparison = itemAddedToComparisonMode(itemId);
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
