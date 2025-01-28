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
      set(() =>
        // eslint-disable-next-line no-console
        // console.log('feature in setFeature', key, feature),
        ({
          stacUrl: key ? feature?.assets[key]?.href : feature?.links.find((link) => link.rel === 'self')?.href,
          feature,
          visibleKey: key ? key : undefined,
        })
      ),
  }))
);

export const getTrueColorImageStoreState = (): TTrueImageStoreState => ({
  stacUrl: useTrueColorImageStore.getState().stacUrl,
  feature: useTrueColorImageStore.getState().feature,
  visibleKey: useTrueColorImageStore.getState().visibleKey,
});

export const useTrueColorImage = (): ITrueImageStore => {
  // console.log('useTrueColorImageStore', useTrueColorImageStore.getState());
  return useTrueColorImageStore();
};
