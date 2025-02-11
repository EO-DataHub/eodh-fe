// eslint-disable-next-line @nx/enforce-module-boundaries
import { TAssetName, TFeature } from '@ukri/map/data-access-stac-catalog';

export interface ITrueImageStore {
  stacUrl: string | undefined;
  feature: TFeature | undefined;
  assetNamesWhichShouldBeDisplayed: TAssetName | undefined;
  setFeature: (feature: TFeature | undefined, key?: TAssetName) => void;
}

export type TTrueImageStoreState = Omit<ITrueImageStore, 'setFeature'>;
