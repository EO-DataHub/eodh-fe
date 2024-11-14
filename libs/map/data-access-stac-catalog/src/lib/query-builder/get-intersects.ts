import { Circle, Geometry, Polygon } from 'ol/geom';
import { fromCircle } from 'ol/geom/Polygon';

import { TGeometry } from '../stac.model';

const isCircle = (geometry: Geometry): geometry is Circle => geometry.getType() === 'Circle';

const isPolygon = (geometry: Geometry): geometry is Polygon => geometry.getType() === 'Polygon';

export const getIntersects = (aoi: Geometry | undefined): TGeometry | undefined => {
  if (!aoi) {
    return undefined;
  }

  if (isCircle(aoi)) {
    console.log('circle', {
      type: 'Polygon',
      coordinates: fromCircle(aoi).getCoordinates(),
    });
  } else if (isPolygon(aoi)) {
    console.log('polygon', {
      type: 'Polygon',
      coordinates: aoi.getCoordinates(),
    });
  }

  const aoiEpsg4326 = aoi.clone().transform('EPSG:3857', 'urem');

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
