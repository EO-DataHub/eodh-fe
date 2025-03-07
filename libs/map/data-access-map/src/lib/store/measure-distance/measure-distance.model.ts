import { Geometry } from 'ol/geom';

import { TCoordinate, TShapeType } from '../../geometry/shape.model';

export type TShape = { type: TShapeType; shape: Geometry | undefined } | undefined;

export interface IMeasureDistanceStore {
  coordinates: TCoordinate | undefined;
  shape: TShape;
  setShape: (shape: TShape | TCoordinate | undefined) => void;
  updateShape: (shape: Geometry | undefined) => void;
  visible: boolean;
  enabled: boolean;
  show: () => void;
  hide: () => void;
  enable: () => void;
  disable: () => void;
}

export type TMeasureDistanceStoreState = Omit<
  IMeasureDistanceStore,
  'shape' | 'setShape' | 'updateShape' | 'show' | 'hide' | 'enable' | 'disable'
>;
