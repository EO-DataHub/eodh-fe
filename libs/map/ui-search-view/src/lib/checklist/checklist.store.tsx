import type {} from '@redux-devtools/extension';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type TMode = 'search' | 'action-creator';

interface IChecklistStore {
  permanentHidden: boolean;
  mode: TMode;
  open: boolean;
  toggle: (permanentHidden?: boolean) => void;
  show: () => void;
  isAoiValid: boolean;
  setAoi: (valid: boolean) => void;
  isDataSetsValid: boolean;
  setDataSets: (valid: boolean) => void;
  isDateRangeValid: boolean;
  setDateRange: (valid: boolean) => void;
  setMode: (mode: TMode) => void;
}

const useChecklistStore = create<IChecklistStore>()(
  devtools(
    persist(
      (set) => ({
        mode: 'search',
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
        setAoi: (valid: boolean) =>
          set((state) => {
            if (valid === state.isAoiValid) {
              return state;
            }

            return { isAoiValid: valid };
          }),
        setDataSets: (valid: boolean) =>
          set((state) => {
            if (valid === state.isDataSetsValid) {
              return state;
            }

            return { isDataSetsValid: valid };
          }),
        setDateRange: (valid: boolean) =>
          set((state) => {
            if (valid === state.isDateRangeValid) {
              return state;
            }

            return { isDateRangeValid: valid };
          }),
        setMode: (mode: TMode) => set(() => ({ mode })),
      }),
      {
        name: 'map-search-view-show-checklist',
        partialize: (state) => ({ permanentHidden: state.permanentHidden }),
      }
    )
  )
);

const isOpen = (state: IChecklistStore) => {
  if (state.permanentHidden || state.mode !== 'search') {
    return false;
  }

  return state.open;
};

export const useChecklistState = () => {
  return useChecklistStore((state) => ({
    mode: state.mode,
    open: isOpen(state),
    isAoiValid: state.isAoiValid,
    isDataSetsValid: state.isDataSetsValid,
    isDateRangeValid: state.isDateRangeValid,
  }));
};

export const useChecklist = () => {
  return useChecklistStore((state) => ({
    toggle: state.toggle,
    show: state.show,
    setMode: state.setMode,
  }));
};

export const useSetValidation = () => {
  return useChecklistStore((state) => ({
    setAoiValid: state.setAoi,
    setDataSetsValid: state.setDataSets,
    setDateRangeValid: state.setDateRange,
  }));
};
