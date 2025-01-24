// eslint-disable-next-line @nx/enforce-module-boundaries
import { TAssetKey, TFeature } from '@ukri/map/data-access-stac-catalog';

export interface ITrueImageStore {
  stacUrl: string | undefined;
  feature: TFeature | undefined;
  visibleKey: TAssetKey | undefined;
  setFeature: (feature: TFeature | undefined, key?: TAssetKey) => void;
}

export type TTrueImageStoreState = Omit<ITrueImageStore, 'setFeature'>;
