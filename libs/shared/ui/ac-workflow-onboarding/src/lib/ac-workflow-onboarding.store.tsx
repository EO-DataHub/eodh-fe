import type {} from '@redux-devtools/extension';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface IAcOnboardingStore {
  permanentHidden: boolean;
  hide: (permanentHidden: boolean) => void;
}

const useOnboardingStore = create<IAcOnboardingStore>()(
  devtools(
    persist(
      (set) => ({
        permanentHidden: false,
        hide: () =>
          set(() => ({
            permanentHidden: true,
          })),
        show: () =>
          set(() => ({
            permanentHidden: false,
          })),
      }),
      {
        name: 'ac-workflow-onboarding',
        partialize: (state) => ({ permanentHidden: state.permanentHidden }),
      }
    )
  )
);

export const useAcOnboardingState = () => {
  return useOnboardingStore((state) => ({
    permanentHidden: state.permanentHidden,
  }));
};

export const useTogglePermanentlyOnboarding = () => {
  return useOnboardingStore((state) => state.hide);
};
