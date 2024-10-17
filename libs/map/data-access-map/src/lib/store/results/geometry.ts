import { Circle, Geometry, Polygon } from 'ol/geom';

import { TCoordinate } from './results.model';

const isCircle = (geometry: Geometry): geometry is Circle => geometry.getType() === 'Circle';

const isPolygon = (geometry: Geometry): geometry is Polygon => geometry.getType() === 'Polygon';

export const getCoordinates = (shape?: Geometry): TCoordinate | undefined => {
  if (!shape) {
    return undefined;
  }

  if (isCircle(shape)) {
    return {
      type: 'circle',
      center: shape.getCenter(),
      radius: shape.getRadius(),
    };
  } else if (isPolygon(shape)) {
    return {
      type: 'polygon',
      coordinates: shape.getCoordinates(),
    };
  }

  return undefined;
};

export const createGeometry = (coordinate: TCoordinate | undefined): Geometry | undefined => {
  if (!coordinate) {
    return undefined;
  }

  switch (coordinate.type) {
    case 'polygon': {
      return new Polygon(coordinate.coordinates);
    }

    case 'circle': {
      return new Circle(coordinate.center, coordinate.radius);
    }

    default: {
      return undefined;
    }
  }
};
