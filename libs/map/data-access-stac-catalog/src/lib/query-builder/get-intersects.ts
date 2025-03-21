// eslint-disable-next-line @nx/enforce-module-boundaries
import { transformCoordinatesFrom3857to4326 } from '@ukri/map/data-access-map';
import { Circle, Geometry, Polygon } from 'ol/geom';
import { fromCircle } from 'ol/geom/Polygon';

import { TGeometry } from '../stac-model/geometry.schema';

const isCircle = (geometry: Geometry): geometry is Circle => geometry.getType() === 'Circle';

const isPolygon = (geometry: Geometry): geometry is Polygon => geometry.getType() === 'Polygon';

export const getIntersects = (aoi: Geometry | undefined): TGeometry | undefined => {
  if (!aoi) {
    return undefined;
  }

  if (isCircle(aoi)) {
    const aoiCircleEpsg4326 = transformCoordinatesFrom3857to4326(fromCircle(aoi.clone()).getCoordinates());
    return {
      type: 'Polygon',
      coordinates: aoiCircleEpsg4326,
    };
  } else if (isPolygon(aoi)) {
    const aoiPolygonEpsg4326 = transformCoordinatesFrom3857to4326(aoi.clone().getCoordinates());
    return {
      type: 'Polygon',
      coordinates: aoiPolygonEpsg4326,
    };
  }

  return undefined;
};
