import type {} from '@redux-devtools/extension';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface IModalStore {
  permanentHidden: boolean;
  open: boolean;
  hidePermanently: (permanentHidden?: boolean) => void;
  show: () => void;
  close: () => void;
}

const useModalStore = create<IModalStore>()(
  devtools(
    persist(
      (set) => ({
        permanentHidden: false,
        open: false,
        hidePermanently: (permanentHidden?: boolean) =>
          set((state) => ({
            ...state,
            open: true,
            permanentHidden: permanentHidden !== undefined ? permanentHidden : state.permanentHidden,
          })),
        show: () =>
          set((state) => ({
            ...state,
            open: state.permanentHidden ? false : true,
          })),
        close: () =>
          set((state) => ({
            ...state,
            open: false,
          })),
      }),
      {
        name: 'action-creator-tabs-flow-modal',
        partialize: (state) => ({ permanentHidden: state.permanentHidden }),
      }
    )
  )
);

const isOpen = (state: IModalStore) => {
  if (state.permanentHidden) {
    return false;
  }

  return state.open;
};

export const useTabsFlowModalState = () => {
  return useModalStore((state) => ({
    isOpen: isOpen(state),
    permanentHidden: state.permanentHidden,
  }));
};

export const useDoNotShowAgain = () => {
  return useModalStore((state) => state.hidePermanently);
};

export const useCloseTabsFlowModal = () => {
  return useModalStore((state) => state.close);
};

export const useOpenTabsFlowModal = () => {
  return useModalStore((state) => (state.permanentHidden ? state.close : state.show));
};
