// eslint-disable-next-line @nx/enforce-module-boundaries
import { TCollection } from '@ukri/map/data-access-stac-catalog';

export interface IHighlightedItem {
  featureId: TCollection['features'][number]['id'] | undefined;
  eventSource: 'map' | 'results-list';
  eventType: 'click' | 'pointermove' | undefined;
}

export interface IFootprintStore {
  collections: {
    [key: string]: {
      collection: TCollection | undefined;
      visible: boolean;
    };
  };
  setCollection: (collection: TCollection | undefined, id?: string) => void;
  highlightedItem: IHighlightedItem | undefined;
  setHighlightedItem: (highlightFeature: IHighlightedItem | undefined) => void;
  toggleVisibility: (id?: string) => void;
  show: (id?: string) => void;
  hide: (id?: string) => void;
}

export type TFootprintStoreState = Omit<IFootprintStore, 'setCollection' | 'toggleVisibility' | 'show' | 'hide'>;
