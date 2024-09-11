import type {} from '@redux-devtools/extension';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ITrueImageStore {
  stacUrl: string | undefined;
  setStacUrl: (url: string | undefined) => void;
}

const useTrueColorImageStore = create<ITrueImageStore>()(
  devtools((set) => ({
    stacUrl: undefined,
    setStacUrl: (url: string | undefined) => set(() => ({ stacUrl: url })),
  }))
);

export const useTrueColorImageUrl = () => {
  return useTrueColorImageStore((state) => state.stacUrl);
};

export const useTrueColorImageUrlMutation = () => {
  return useTrueColorImageStore((state) => state.setStacUrl);
};
