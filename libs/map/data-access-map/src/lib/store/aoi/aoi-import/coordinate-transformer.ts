import { transform } from 'ol/proj';

import { TCoordinate } from '../../../geometry/shape.model';
import { TCoordinateSystem } from './coordinate-validator';

const TARGET_PROJECTION: TCoordinateSystem = 'EPSG:3857';

const transformCoordinate = (coord: number[], sourceProjection: TCoordinateSystem): number[] => {
  if (sourceProjection === TARGET_PROJECTION) {
    return coord;
  }

  if (sourceProjection === 'EPSG:4326' && TARGET_PROJECTION === 'EPSG:3857') {
    return transform([coord[0], coord[1]], 'EPSG:4326', 'EPSG:3857');
  }

  return coord;
};

const transformCoordinates2D = (coords: number[][], sourceProjection: TCoordinateSystem): number[][] => {
  if (sourceProjection === TARGET_PROJECTION) {
    return coords;
  }

  return coords.map((coord) => transformCoordinate(coord, sourceProjection));
};

const transformCoordinates3D = (coords: number[][][], sourceProjection: TCoordinateSystem): number[][][] => {
  if (sourceProjection === TARGET_PROJECTION) {
    return coords;
  }

  return coords.map((ring) => transformCoordinates2D(ring, sourceProjection));
};

export const transformAreaValueCoordinates = (
  areaValue: TCoordinate,
  sourceProjection: TCoordinateSystem
): TCoordinate => {
  if (sourceProjection === TARGET_PROJECTION) {
    return areaValue;
  }

  if (areaValue.type === 'circle') {
    return {
      type: 'circle',
      center: transformCoordinate(areaValue.center, sourceProjection),
      radius: areaValue.radius,
    };
  }

  if (areaValue.type === 'rectangle') {
    return {
      type: 'rectangle',
      coordinates: transformCoordinates3D(areaValue.coordinates, sourceProjection),
    };
  }

  if (areaValue.type === 'polygon') {
    return {
      type: 'polygon',
      coordinates: transformCoordinates3D(areaValue.coordinates, sourceProjection),
    };
  }

  return areaValue;
};
