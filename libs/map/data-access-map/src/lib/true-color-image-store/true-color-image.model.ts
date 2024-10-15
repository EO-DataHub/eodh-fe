// eslint-disable-next-line @nx/enforce-module-boundaries
import { TFeature } from '@ukri/map/data-access-stac-catalog';

export interface ITrueImageStore {
  stacUrl: string | undefined;
  feature: TFeature | undefined;
  setFeature: (feature: TFeature | undefined) => void;
}

export type TTrueImageStoreState = Omit<ITrueImageStore, 'setFeature'>;
