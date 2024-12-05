import type {} from '@redux-devtools/extension';
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
  comparisonMode: boolean;
  toggleComparisonMode: (comparisonMode?: boolean) => void;
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
    comparisonMode: false,
    toggleComparisonMode: () =>
      set((state) => ({
        ...state,
        comparisonMode: !state.comparisonMode,
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
          comparisonMode: false,
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
  const comparisonState = useComparisonToolStore((state) => ({
    comparisonItems: state.comparisonItems,
    comparisonMode: state.comparisonMode,
  }));

  const toggleComparisonMode = useComparisonToolStore((state) => state.toggleComparisonMode);
  const addComparisonItem = useComparisonToolStore((state) => state.addComparisonItem);
  const removeComparisonItem = useComparisonToolStore((state) => state.removeComparisonItem);
  const itemAddedToComparisonMode = (itemId?: string) => {
    return comparisonState.comparisonItems.items.some((item) => item.id === itemId);
  };
  const canAddAsNewItemToComparisonMode = (itemId?: string) => {
    const isAddedForComparison = itemAddedToComparisonMode(itemId);
    return comparisonState.comparisonItems.items.length >= 2 && !isAddedForComparison;
  };

  return {
    ...comparisonState,
    toggleComparisonMode,
    addComparisonItem,
    removeComparisonItem,
    itemAddedToComparisonMode,
    canAddAsNewItemToComparisonMode,
  };
};
