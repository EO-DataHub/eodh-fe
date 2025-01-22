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
    }
  | {
      type: 'line';
      coordinates: number[][];
    };

export type TShapeType = 'circle' | 'rectangle' | 'polygon' | 'line';

export type TShape = { type: TShapeType; shape: Geometry | undefined } | undefined;

export type TUnitType = 'km' | 'km2' | 'miles' | 'miles2';

export type TUnit = {
  value: number;
  unit: {
    type: TUnitType;
    displayedValue: string;
  };
};
