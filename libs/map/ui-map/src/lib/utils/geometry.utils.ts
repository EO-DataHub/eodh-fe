import { boundingExtent } from 'ol/extent';
import { fromLonLat } from 'ol/proj';

type TCoordinate = [number, number];

export const convertCoordinatesToMapProjection = (geometry: {
  type: string;
  coordinates: number[][][];
}): TCoordinate[] => {
  if (geometry.type === 'Polygon') {
    return geometry.coordinates[0].map((coord) => fromLonLat(coord) as TCoordinate);
  }
  return [];
};

export const isCoordinateWithinGeometry = (
  clickCoordinate: number[],
  geometry: { type: string; coordinates: number[][][] }
): boolean => {
  const coords = convertCoordinatesToMapProjection(geometry);

  if (coords.length === 0) {
    return false;
  }

  const extent = boundingExtent(coords);
  const [x, y] = clickCoordinate;
  const [minX, minY, maxX, maxY] = extent;

  return x >= minX && x <= maxX && y >= minY && y <= maxY;
};
