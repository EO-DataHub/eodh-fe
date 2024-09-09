import type {} from '@redux-devtools/extension';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface IChecklistStore {
  permanentHidden: boolean;
  open: boolean;
  toggle: (permanentHidden?: boolean) => void;
  show: () => void;
  isAoiValid: boolean;
  setAoi: (valid: boolean) => void;
  isDataSetsValid: boolean;
  setDataSets: (valid: boolean) => void;
  isDateRangeValid: boolean;
  setDateRange: (valid: boolean) => void;
}

const useChecklistStore = create<IChecklistStore>()(
  devtools(
    persist(
      (set) => ({
        permanentHidden: false,
        open: true,
        isAoiValid: false,
        isDataSetsValid: false,
        isDateRangeValid: false,
        toggle: (permanentHidden?: boolean) =>
          set((state) => ({
            open: !state.open,
            permanentHidden: permanentHidden !== undefined ? permanentHidden : state.permanentHidden,
          })),
        show: () =>
          set(() => ({
            open: true,
            permanentHidden: false,
          })),
        setAoi: (valid: boolean) => set(() => ({ isAoiValid: valid })),
        setDataSets: (valid: boolean) => set(() => ({ isDataSetsValid: valid })),
        setDateRange: (valid: boolean) => set(() => ({ isDateRangeValid: valid })),
      }),
      {
        name: 'map-search-view-show-checklist',
        partialize: (state) => ({ permanentHidden: state.permanentHidden }),
      }
    )
  )
);

const isOpen = (state: IChecklistStore) => {
  if (state.permanentHidden) {
    return false;
  }

  return state.open;
};

export const useChecklistState = () => {
  return useChecklistStore((state) => ({
    open: isOpen(state),
    isAoiValid: state.isAoiValid,
    isDataSetsValid: state.isDataSetsValid,
    isDateRangeValid: state.isDateRangeValid,
  }));
};

export const useToggleChecklistVisibility = () => {
  return useChecklistStore((state) => state.toggle);
};

export const useShowChecklist = () => {
  return useChecklistStore((state) => state.show);
};

export const useSetValidation = () => {
  return useChecklistStore((state) => ({
    setAoiValid: state.setAoi,
    setDataSetsValid: state.setDataSets,
    setDateRangeValid: state.setDateRange,
  }));
};
