import { Circle, Geometry, Polygon } from 'ol/geom';

type TCoordinates = number[][][] | [number, number][][];

export type TCoordinate =
  | {
      type: 'Circle';
      center: number[];
      radius: number;
    }
  | {
      type: 'Polygon';
      coordinates: TCoordinates;
    };

const isCircle = (geometry: Geometry): geometry is Circle => geometry.getType() === 'Circle';

const isPolygon = (geometry: Geometry): geometry is Polygon => geometry.getType() === 'Polygon';

export const getCoordinates = (shape?: Geometry): TCoordinate | undefined => {
  if (!shape) {
    return undefined;
  }

  if (isCircle(shape)) {
    return {
      type: 'Circle',
      center: shape.getCenter(),
      radius: shape.getRadius(),
    };
  } else if (isPolygon(shape)) {
    return {
      type: 'Polygon',
      coordinates: shape.getCoordinates(),
    };
  }

  return undefined;
};

export const createPolygon = (coordinate: TCoordinate | undefined): Geometry | undefined => {
  if (!coordinate) {
    return undefined;
  }

  switch (coordinate.type) {
    case 'Polygon': {
      return new Polygon(coordinate.coordinates);
    }

    case 'Circle': {
      return new Circle(coordinate.center, coordinate.radius);
    }

    default: {
      return undefined;
    }
  }
};
