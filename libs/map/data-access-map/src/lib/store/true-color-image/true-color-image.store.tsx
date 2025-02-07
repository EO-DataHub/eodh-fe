import type {} from '@redux-devtools/extension';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { TAssetKey, TFeature } from '@ukri/map/data-access-stac-catalog';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { ITrueImageStore, TTrueImageStoreState } from './true-color-image.model';

export const useTrueColorImageStore = create<ITrueImageStore>()(
  devtools((set) => ({
    stacUrl: undefined,
    feature: undefined,
    visibleKey: undefined,
    setFeature: (feature: TFeature | undefined, key?: TAssetKey) =>
      set(() => ({
        stacUrl: feature?.links.find((link) => link.rel === 'self')?.href,
        feature,
        visibleKey: key,
      })),
  }))
);

export const getTrueColorImageStoreState = (): TTrueImageStoreState => ({
  stacUrl: useTrueColorImageStore.getState().stacUrl,
  feature: useTrueColorImageStore.getState().feature,
  visibleKey: useTrueColorImageStore.getState().visibleKey,
});

export const useTrueColorImage = (): ITrueImageStore => {
  return useTrueColorImageStore();
};
