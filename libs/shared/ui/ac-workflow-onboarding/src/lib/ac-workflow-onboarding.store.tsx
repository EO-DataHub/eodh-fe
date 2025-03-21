import type {} from '@redux-devtools/extension';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface IAcOnboardingStore {
  visible: boolean;
  enabled: boolean;
  status: 'initial' | 'finished';
  permanentHidden: boolean;
  show: () => void;
  hide: (permanentHidden?: boolean) => void;
  enable: () => void;
  disable: () => void;
  complete: () => void;
  reset: () => void;
}

const useOnboardingStore = create<IAcOnboardingStore>()(
  devtools(
    persist(
      (set) => ({
        status: 'initial',
        enabled: false,
        visible: false,
        permanentHidden: false,
        hide: (permanentHidden?: boolean) =>
          set((state) => ({
            visible: false,
            permanentHidden: permanentHidden !== undefined ? permanentHidden : state.permanentHidden,
          })),
        show: () =>
          set(() => ({
            visible: true,
            permanentHidden: false,
          })),
        enable: () =>
          set(() => ({
            enabled: true,
          })),
        disable: () =>
          set(() => ({
            enabled: false,
          })),
        complete: () =>
          set(() => ({
            status: 'finished',
          })),
        reset: () =>
          set(() => ({
            status: 'initial',
            visible: true,
          })),
      }),
      {
        name: 'ac-workflow-onboarding',
        partialize: (state) => ({ permanentHidden: state.permanentHidden }),
      }
    )
  )
);

export const useAcOnboarding = () => {
  return useOnboardingStore((state) => ({
    permanentHidden: state.permanentHidden,
    visible: state.visible && state.enabled,
    finished: state.status === 'finished',
    hide: state.hide,
    show: state.show,
    enable: state.enable,
    disable: state.disable,
    complete: state.complete,
    reset: state.reset,
  }));
};
