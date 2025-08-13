import { Geometry } from 'ol/geom';

import { TCoordinate, TShape, TShapeType } from '../../geometry/shape.model';

export type TAoiState = 'readonly' | 'edit';

export type TDrawingTool = {
  enabled: boolean;
  type: TShapeType;
};

export interface IAoiStore {
  state: TAoiState;
  coordinates: TCoordinate | undefined;
  fitToAoi?: boolean;
  drawingTool?: TDrawingTool;
  shape: TShape;
  setShape: (shape: TShape | TCoordinate | undefined, fitToAoi?: boolean) => void;
  setFitToAoi: (fitToAoi: boolean) => void;
  updateShape: (shape: Geometry | undefined | ((oldShape: TShape | undefined) => Geometry | undefined)) => void;
  visible: boolean;
  toggleVisibility: () => void;
  show: () => void;
  hide: () => void;
  changeState: (state: TAoiState) => void;
  toggleDrawingToolShape: (shape: TDrawingTool['type']) => void;
  setDrawingTool: (drawingTool?: TDrawingTool) => void;
}

export type TAoiStoreState = Omit<
  IAoiStore,
  | 'shape'
  | 'setShape'
  | 'toggleVisibility'
  | 'show'
  | 'hide'
  | 'changeState'
  | 'updateShape'
  | 'drawingTool'
  | 'toggleDrawingToolShape'
  | 'setDrawingTool'
>;
