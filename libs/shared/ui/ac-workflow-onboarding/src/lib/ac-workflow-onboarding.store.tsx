import type {} from '@redux-devtools/extension';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface IAcOnboardingStore {
  visible: boolean;
  status: 'not-started' | 'started' | 'finished';
  permanentHidden: boolean;
  show: () => void;
  hide: (permanentHidden?: boolean) => void;
  start: () => void;
  complete: () => void;
}

const useOnboardingStore = create<IAcOnboardingStore>()(
  devtools(
    persist(
      (set) => ({
        status: 'not-started',
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
        start: () =>
          set(() => ({
            status: 'started',
            visible: true,
          })),
        complete: () =>
          set(() => ({
            status: 'finished',
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
    visible: state.visible && state.status === 'started',
    started: state.status !== 'not-started',
    finished: state.status === 'finished',
    hide: state.hide,
    show: state.show,
    start: state.start,
    complete: state.complete,
  }));
};
