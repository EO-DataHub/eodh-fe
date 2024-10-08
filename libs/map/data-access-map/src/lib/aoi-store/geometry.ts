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

const isCoordinates = (shape?: Geometry | TCoordinate): shape is TCoordinate => {
  // eslint-disable-next-line no-prototype-builtins
  return !!shape?.hasOwnProperty('type') && !shape?.hasOwnProperty('getType');
};

export const getCoordinates = (shape?: Geometry | TCoordinate): TCoordinate | undefined => {
  if (!shape) {
    return undefined;
  }

  const coordinates = isCoordinates(shape);

  if (coordinates) {
    return shape;
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
