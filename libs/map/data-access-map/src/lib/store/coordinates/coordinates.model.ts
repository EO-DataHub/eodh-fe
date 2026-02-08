import { Coordinate } from 'ol/coordinate';

export interface ICoordinateLabel {
  index: number;
  coordinate: Coordinate;
  formatted: string;
}

export interface ICoordinatesStore {
  coordinates: ICoordinateLabel[];
  visible: boolean;
  drawingCompleted: boolean;
  setCoordinates: (coordinates: ICoordinateLabel[]) => void;
  clearCoordinates: () => void;
  toggleVisibility: () => void;
  setDrawingCompleted: (completed: boolean) => void;
}
