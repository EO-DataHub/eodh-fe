// eslint-disable-next-line @nx/enforce-module-boundaries
import { TCollection } from '@ukri/map/data-access-stac-catalog';

export interface IFootprintStore {
  collections: {
    [key: string]: {
      collection: TCollection | undefined;
      visible: boolean;
    };
  };
  setCollection: (collection: TCollection | undefined, id?: string) => void;
  footprintClickId: string | undefined;
  thumbnailHoverId: string | undefined;
  setFootprintClickId: (id: string | undefined) => void;
  setThumbnailHoverId: (id: string | undefined) => void;
  toggleVisibility: (id?: string) => void;
  show: (id?: string) => void;
  hide: (id?: string) => void;
}

export type TFootprintStoreState = Omit<IFootprintStore, 'setCollection' | 'toggleVisibility' | 'show' | 'hide'>;
