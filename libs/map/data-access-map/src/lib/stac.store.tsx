import type {} from '@redux-devtools/extension';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IStacStore {
  stacUrl: string | undefined;
  setStacUrl: (url: string | undefined) => void;
}

const useStacStore = create<IStacStore>()(
  devtools((set) => ({
    stacUrl: undefined,
    setStacUrl: (url: string | undefined) => set(() => ({ stacUrl: url })),
  }))
);

export const useStacUrl = () => {
  return useStacStore((state) => state.stacUrl);
};

export const useStacUrlMutation = () => {
  return useStacStore((state) => state.setStacUrl);
};
