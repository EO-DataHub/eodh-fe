import { Coordinate } from 'ol/coordinate';
import { Circle as OlCircle, Geometry, Polygon } from 'ol/geom';
import { transform } from 'ol/proj';

const SOURCE_PROJECTION = 'EPSG:3857';
const TARGET_PROJECTION = 'EPSG:4326';
const COORDINATE_PRECISION = 5;

export const formatCoordinate = (coord: Coordinate): string => {
  const [longitude, latitude] = transform(coord, SOURCE_PROJECTION, TARGET_PROJECTION);
  return `${latitude.toFixed(COORDINATE_PRECISION)}°, ${longitude.toFixed(COORDINATE_PRECISION)}°`;
};

export const getPolygonCoordinates = (geometry: Geometry): Coordinate[] => {
  if (geometry instanceof Polygon) {
    const coords = geometry.getCoordinates()[0];
    return coords.slice(0, -1);
  }

  if (geometry instanceof OlCircle) {
    return [geometry.getCenter()];
  }

  return [];
};
