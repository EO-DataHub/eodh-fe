import { Coordinate } from 'ol/coordinate';
import { register } from 'ol/proj/proj4.js';
import proj4 from 'proj4';

proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs');
proj4.defs('EPSG:3857', '+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs');
register(proj4);

// todo those functions shouldn't be necessary, OpenLayers should handle transform correctly but for some reason it doesn't.
//  This require further investigation as it should be enough to just call register(proj4) function
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
