import type {} from '@redux-devtools/extension';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { ITrueImageStore, TTrueImageStoreState } from './true-color-image.model';

export const useTrueColorImageStore = create<ITrueImageStore>()(
  devtools((set) => ({
    stacUrl: undefined,
    setStacUrl: (url: string | undefined) => set(() => ({ stacUrl: url })),
  }))
);

export const getTrueColorImageStoreState = (): TTrueImageStoreState => ({
  stacUrl: useTrueColorImageStore.getState().stacUrl,
});

export const useTrueColorImage = (): ITrueImageStore => {
  return useTrueColorImageStore();
};
