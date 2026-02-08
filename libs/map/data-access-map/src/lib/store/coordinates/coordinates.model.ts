import { Coordinate } from 'ol/coordinate';

export interface ICoordinateLabel {
  index: number;
  coordinate: Coordinate;
  formatted: string;
}

export interface ICoordinatesStore {
  coordinates: ICoordinateLabel[];
  setCoordinates: (coordinates: ICoordinateLabel[]) => void;
  clearCoordinates: () => void;
}
