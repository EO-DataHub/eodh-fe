import { TAreaValue } from '../../action-creator/action-creator.schema';
import { IGeoJSONGeometry } from './geojson.types';

const isRectangle = (coordinates: number[][][]): boolean => {
  if (coordinates.length !== 1) {
    return false;
  }

  const ring = coordinates[0];
  if (ring.length !== 5) {
    return false;
  }

  const first = ring[0];
  const last = ring[4];
  if (first[0] !== last[0] || first[1] !== last[1]) {
    return false;
  }

  const corners = ring.slice(0, 4);

  const lats = corners.map((c) => c[1]);
  const lons = corners.map((c) => c[0]);

  const uniqueLats = [...new Set(lats)];
  const uniqueLons = [...new Set(lons)];

  return uniqueLats.length === 2 && uniqueLons.length === 2;
};

const isCircle = (coordinates: number[][][]): boolean => {
  if (coordinates.length !== 1) {
    return false;
  }

  const ring = coordinates[0];

  if (ring.length < 30) {
    return false;
  }

  const avgLon = ring.reduce((sum, coord) => sum + coord[0], 0) / ring.length;
  const avgLat = ring.reduce((sum, coord) => sum + coord[1], 0) / ring.length;

  const distances = ring.map((coord) => {
    const dx = coord[0] - avgLon;
    const dy = coord[1] - avgLat;
    return Math.sqrt(dx * dx + dy * dy);
  });

  const avgDistance = distances.reduce((sum, d) => sum + d, 0) / distances.length;
  const maxDeviation = avgDistance * 0.05;

  return distances.every((d) => Math.abs(d - avgDistance) < maxDeviation);
};

const getCircleProperties = (coordinates: number[][][]): { center: number[]; radius: number } => {
  const ring = coordinates[0];

  const centerLon = ring.reduce((sum, coord) => sum + coord[0], 0) / ring.length;
  const centerLat = ring.reduce((sum, coord) => sum + coord[1], 0) / ring.length;

  const distances = ring.map((coord) => {
    const dx = coord[0] - centerLon;
    const dy = coord[1] - centerLat;
    return Math.sqrt(dx * dx + dy * dy);
  });

  const radius = distances.reduce((sum, d) => sum + d, 0) / distances.length;

  return {
    center: [centerLon, centerLat],
    radius,
  };
};

export const transformGeometryToAreaValue = (geometry: IGeoJSONGeometry): TAreaValue => {
  if (geometry.type === 'Polygon') {
    const coordinates = geometry.coordinates as number[][][];

    if (isRectangle(coordinates)) {
      return {
        type: 'rectangle',
        coordinates: coordinates,
      };
    }

    if (isCircle(coordinates)) {
      const { center, radius } = getCircleProperties(coordinates);
      return {
        type: 'circle',
        center,
        radius,
      };
    }

    return {
      type: 'polygon',
      coordinates: coordinates,
    };
  }

  if (geometry.type === 'MultiPolygon') {
    const coordinates = (geometry.coordinates as number[][][][])[0];

    return {
      type: 'polygon',
      coordinates: coordinates,
    };
  }

  throw new Error('Unsupported geometry type');
};
