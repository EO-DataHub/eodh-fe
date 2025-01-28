import { Geometry } from 'ol/geom';

import { TCoordinate, TShape } from '../../geometry/shape.model';

export type TAoiState = 'readonly' | 'edit';

export interface IAoiStore {
  state: TAoiState;
  coordinates: TCoordinate | undefined;
  fitToAoi?: boolean;
  shape: TShape;
  setShape: (shape: TShape | TCoordinate | undefined, fitToAoi?: boolean) => void;
  updateShape: (shape: Geometry | undefined) => void;
  visible: boolean;
  toggleVisibility: () => void;
  show: () => void;
  hide: () => void;
  changeState: (state: TAoiState) => void;
}

export type TAoiStoreState = Omit<
  IAoiStore,
  'shape' | 'setShape' | 'toggleVisibility' | 'show' | 'hide' | 'changeState' | 'updateShape'
>;
