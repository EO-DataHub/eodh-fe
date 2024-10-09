// eslint-disable-next-line @nx/enforce-module-boundaries
import { TCollection } from '@ukri/map/data-access-stac-catalog';

export interface IFootprintStore {
  collections: {
    [key: string]: {
      collection: TCollection | undefined;
      visible: boolean;
    };
  };
  setCollection: (url: TCollection | undefined, id?: string) => void;
  toggleVisibility: (id?: string) => void;
  show: (id?: string) => void;
  hide: (id?: string) => void;
}

export type TFootprintStoreState = Omit<IFootprintStore, 'setCollection' | 'toggleVisibility' | 'show' | 'hide'>;
