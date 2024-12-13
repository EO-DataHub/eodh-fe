import type {} from '@redux-devtools/extension';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface IAcOnboardingStore {
  permanentHidden: boolean;
  toggle: (permanentHidden?: boolean) => void;
}

const useOnboardingStore = create<IAcOnboardingStore>()(
  devtools(
    persist(
      (set) => ({
        permanentHidden: true,
        toggle: (permanentHidden?: boolean) =>
          set((state) => ({
            permanentHidden: permanentHidden !== undefined ? permanentHidden : state.permanentHidden,
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

export const useToggleOnboardingVisibility = () => {
  return useOnboardingStore((state) => state.toggle);
};
