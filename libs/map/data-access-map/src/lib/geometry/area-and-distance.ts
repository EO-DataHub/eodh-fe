import { Circle, Geometry, LineString } from 'ol/geom';
import { fromCircle } from 'ol/geom/Polygon';
import { getArea as getAreaFromGeometry, getLength } from 'ol/sphere';

import { createGeometry } from './geometry';
import { TCoordinate, TUnit, TUnitType } from './shape.model';

const SQUARE_KM_TO_SQUARE_MILE = 0.386102;
const KM_TO_MILE = 0.621371192;

const isCircle = (shape: Geometry): shape is Circle => shape.getType() === 'Circle';

export const getArea = (value: TCoordinate | undefined): number => {
  const shape = createGeometry(value);

  if (!shape) {
    return 0;
  }

  const geometry = isCircle(shape) ? fromCircle(shape) : shape;
  return getAreaFromGeometry(geometry) || 0;
};

export const getLineLength = (coordinates: TCoordinate | undefined) => {
  if (!coordinates) {
    return 0;
  }

  switch (coordinates.type) {
    case 'circle': {
      return 2 * Math.PI * coordinates.radius;
    }

    case 'rectangle':
    case 'polygon': {
      let featureLength = 0;
      coordinates.coordinates.forEach((coordinates) => {
        for (let i = 0; i < coordinates.length; i++) {
          const lineString = new LineString([coordinates[i], coordinates[(i + 1) % coordinates.length]]);
          featureLength += lineString.getLength();
        }
      });
      return featureLength;
    }

    case 'line': {
      const lineString = new LineString(coordinates.coordinates);
      const lengthInMeters = getLength(lineString);
      return lengthInMeters;
    }

    default: {
      return 0;
    }
  }
};

export const convertUnits = (value: number, unit: TUnitType): TUnit => {
  switch (unit) {
    case 'miles2': {
      value = value * SQUARE_KM_TO_SQUARE_MILE;
      return {
        value: Math.round((value / 1000000) * 100) / 100,
        unit: {
          type: unit,
          displayedValueTranslation: 'GLOBAL.UNITS.MILES',
        },
      };
    }

    case 'miles': {
      value = value * KM_TO_MILE;
      return {
        value: Math.round((value / 1000) * 100) / 100,
        unit: {
          type: unit,
          displayedValueTranslation: 'GLOBAL.UNITS.MILES',
        },
      };
    }

    case 'km2': {
      return {
        value: Math.round((value / 1000000) * 100) / 100,
        unit: {
          type: unit,
          displayedValueTranslation: 'GLOBAL.UNITS.KM',
        },
      };
    }

    case 'km': {
      return {
        value: Math.round((value / 1000) * 100) / 100,
        unit: {
          type: unit,
          displayedValueTranslation: 'GLOBAL.UNITS.KM',
        },
      };
    }
  }
};
