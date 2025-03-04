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
  setAoiValid: (valid: boolean) => void;
  isDataSetsValid: boolean;
  setDataSetsValid: (valid: boolean) => void;
  isDateRangeValid: boolean;
  setDateRangeValid: (valid: boolean) => void;
  isDateRangeUpdated: boolean;
  setDateRangeState: (updated: boolean) => void;
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
        isDateRangeUpdated: false,
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
        setAoiValid: (valid: boolean) =>
          set((state) => {
            if (valid === state.isAoiValid) {
              return state;
            }

            return { isAoiValid: valid };
          }),
        setDataSetsValid: (valid: boolean) =>
          set((state) => {
            if (valid === state.isDataSetsValid) {
              return state;
            }

            return { isDataSetsValid: valid };
          }),
        setDateRangeValid: (valid: boolean) =>
          set((state) => {
            if (valid === state.isDateRangeValid) {
              return state;
            }

            return { isDateRangeValid: valid };
          }),
        setDateRangeState: (updated: boolean) =>
          set((state) => {
            if (updated === state.isDateRangeUpdated) {
              return state;
            }

            return { isDateRangeUpdated: updated };
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
    isDateRangeUpdated: state.isDateRangeUpdated,
  }));
};

export const useChecklist = () => {
  return useChecklistStore((state) => ({
    toggle: state.toggle,
    show: state.show,
    setMode: state.setMode,
    setAoiValid: state.setAoiValid,
    setDataSetsValid: state.setDataSetsValid,
    setDateRangeValid: state.setDateRangeValid,
    setDateRangeState: state.setDateRangeState,
  }));
};
