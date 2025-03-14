import { Circle, Geometry, LineString, Polygon } from 'ol/geom';

import { TCoordinate, TShape, TShapeType } from './shape.model';

const isCircle = (geometry: Geometry): geometry is Circle => geometry.getType() === 'Circle';

const isPolygon = (geometry: Geometry): geometry is Polygon => geometry.getType() === 'Polygon';

const isLineString = (geometry: Geometry): geometry is LineString => geometry.getType() === 'LineString';

const isCoordinates = (shape: TShape | TCoordinate): shape is TCoordinate => {
  // eslint-disable-next-line no-prototype-builtins
  return !shape?.hasOwnProperty('shape');
};

export const getCoordinates = (shape?: TShape | TCoordinate): TCoordinate | undefined => {
  if (!shape) {
    return undefined;
  }

  const coordinates = isCoordinates(shape);

  if (coordinates) {
    return shape;
  }

  if (!shape.shape) {
    return undefined;
  }

  switch (shape.type) {
    case 'circle': {
      if (!isCircle(shape.shape)) {
        return undefined;
      }

      return {
        type: 'circle',
        center: shape.shape.getCenter(),
        radius: shape.shape.getRadius(),
      };
    }

    case 'rectangle': {
      if (!isPolygon(shape.shape)) {
        return undefined;
      }

      return {
        type: 'rectangle',
        coordinates: shape.shape.getCoordinates(),
      };
    }

    case 'polygon': {
      if (!isPolygon(shape.shape)) {
        return undefined;
      }

      return {
        type: 'polygon',
        coordinates: shape.shape.getCoordinates(),
      };
    }

    case 'line': {
      if (!isLineString(shape.shape)) {
        return undefined;
      }

      return {
        type: 'line',
        coordinates: shape.shape.getCoordinates(),
      };
    }
  }

  return undefined;
};

export const createGeometry = (coordinate: TCoordinate | undefined): Geometry | undefined => {
  if (!coordinate) {
    return undefined;
  }

  switch (coordinate.type) {
    case 'rectangle':
    case 'polygon': {
      return new Polygon(coordinate.coordinates);
    }

    case 'circle': {
      return new Circle(coordinate.center, coordinate.radius);
    }

    case 'line': {
      return new LineString(coordinate.coordinates);
    }

    default: {
      return undefined;
    }
  }
};

export const createShape = (
  coordinate: TCoordinate | undefined,
  type: TShapeType | undefined
): { type: TShapeType; shape: Geometry | undefined } | undefined => {
  const shape = createGeometry(coordinate);

  if (!shape || !type) {
    return undefined;
  }

  return {
    type,
    shape,
  };
};
