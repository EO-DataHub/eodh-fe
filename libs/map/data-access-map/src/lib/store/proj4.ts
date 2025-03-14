import { Coordinate } from 'ol/coordinate';
import proj4 from 'proj4';

// Define the projections
proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs');
proj4.defs('EPSG:3857', '+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs');

export const transformCoordinates = (coordinates: Coordinate, from: string, to: string): Coordinate => {
  return proj4(from, to, coordinates);
};

export const transformCoordinatesFrom3857to4326 = (coordinates: Coordinate[][]): Coordinate[][] => {
  return coordinates.map((array) => {
    return array.map((param) => {
      return transformCoordinates(param, 'EPSG:3857', 'EPSG:4326');
    });
  });
};
