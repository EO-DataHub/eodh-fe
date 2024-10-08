import { Geometry } from 'ol/geom';

import { TCoordinate } from './geometry';

export type TAoiState = 'readonly' | 'edit';

export interface IAoiStore {
  state: TAoiState;
  coordinates: TCoordinate | undefined;
  shape: undefined | Geometry;
  setShape: (shape: Geometry | TCoordinate | undefined) => void;
  visible: boolean;
  toggle: () => void;
  show: () => void;
  hide: () => void;
  changeState: (state: TAoiState) => void;
}

export type TAoiStoreState = Omit<IAoiStore, 'shape' | 'setShape' | 'toggle' | 'show' | 'hide' | 'changeState'>;
