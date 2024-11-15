import type {} from '@redux-devtools/extension';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface IModalStore {
  permanentHidden: boolean;
  open: boolean;
  hidePermanently: () => void;
  show: () => void;
  close: () => void;
}

const useModalStore = create<IModalStore>()(
  devtools(
    persist(
      (set) => ({
        permanentHidden: false,
        open: true,
        hidePermanently: () =>
          set((state) => ({
            open: state.open,
            permanentHidden: true,
          })),
        show: () =>
          set(() => ({
            open: true,
            permanentHidden: false,
          })),
        close: () =>
          set(() => ({
            open: false,
            permanentHidden: false,
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
    // TODO add conditions to check if the modal should be shown (if results are loaded)
    return false;
  }

  return state.open;
};

export const useModalState = () => {
  return useModalStore((state) => ({
    isOpen: isOpen(state),
  }));
};

export const useDoNotShowAgain = () => {
  return useModalStore((state) => state.hidePermanently);
};

export const useCloseModal = () => {
  return useModalStore((state) => state.close);
};
