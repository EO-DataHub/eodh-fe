import { LineString } from 'ol/geom';
import { getArea as getAreaFromGeometry } from 'ol/sphere';

import { createGeometry } from './geometry';
import { TCoordinate, TUnit, TUnitType } from './shape.model';

const SQUARE_KM_TO_SQUARE_MILE = 0.386102;
const KM_TO_MILE = 0.621371192;

export const getArea = (value: TCoordinate | undefined): number => {
  const shape = createGeometry(value);
  if (!shape) {
    return 0;
  }

  return getAreaFromGeometry(shape) || 0;
};

export const getLineLength = (coordinates: TCoordinate | undefined) => {
  const shape = createGeometry(coordinates);

  if (!shape || !coordinates) {
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
      return lineString.getLength();
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

    case 'km': {
      if (value > 100) {
        return {
          value: Math.round((value / 1000) * 100) / 100,
          unit: {
            type: unit,
            displayedValueTranslation: 'GLOBAL.UNITS.KM',
          },
        };
      }

      return {
        value: Math.round(value * 100) / 100,
        unit: {
          type: unit,
          displayedValueTranslation: 'GLOBAL.UNITS.KM',
        },
      };
    }

    case 'km2': {
      if (value > 10000) {
        return {
          value: Math.round((value / 1000000) * 100) / 100,
          unit: {
            type: unit,
            displayedValueTranslation: 'GLOBAL.UNITS.KM',
          },
        };
      }

      return {
        value: Math.round(value * 100) / 100,
        unit: {
          type: unit,
          displayedValueTranslation: 'GLOBAL.UNITS.KM',
        },
      };
    }
  }
};
