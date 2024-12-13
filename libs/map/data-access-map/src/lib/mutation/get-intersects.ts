import { Circle, Geometry, Polygon } from 'ol/geom';
import { fromCircle } from 'ol/geom/Polygon';

export type TGeometry = {
  type: 'Polygon';
  coordinates: number[][][] | [number, number][][];
};

const isCircle = (geometry: Geometry): geometry is Circle => geometry.getType() === 'Circle';

const isPolygon = (geometry: Geometry): geometry is Polygon => geometry.getType() === 'Polygon';

// todo this code is repeated in data-access-stac-catalog. We should figure it out in the future how to not repeat it
export const getIntersects = (aoi: Geometry | undefined): TGeometry | undefined => {
  if (!aoi) {
    return undefined;
  }

  const aoiEpsg4326 = aoi.clone().transform('EPSG:3857', 'EPSG:4326');

  if (isCircle(aoiEpsg4326)) {
    return {
      type: 'Polygon',
      coordinates: fromCircle(aoiEpsg4326).getCoordinates(),
    };
  } else if (isPolygon(aoiEpsg4326)) {
    return {
      type: 'Polygon',
      coordinates: aoiEpsg4326.getCoordinates(),
    };
  }

  return undefined;
};
