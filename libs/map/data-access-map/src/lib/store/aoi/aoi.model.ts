import { Geometry } from 'ol/geom';

type TCoordinates = number[][][] | [number, number][][];

export type TCoordinate =
  | {
      type: 'circle';
      center: number[];
      radius: number;
    }
  | {
      type: 'rectangle';
      coordinates: TCoordinates;
    }
  | {
      type: 'polygon';
      coordinates: TCoordinates;
    };

export type TShapeType = 'circle' | 'rectangle' | 'polygon';

export type TShape = { type: TShapeType; shape: Geometry | undefined } | undefined;

export type TAoiState = 'readonly' | 'edit';

export interface IAoiStore {
  state: TAoiState;
  coordinates: TCoordinate | undefined;
  shape: TShape;
  setShape: (shape: TShape | TCoordinate | undefined) => void;
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
