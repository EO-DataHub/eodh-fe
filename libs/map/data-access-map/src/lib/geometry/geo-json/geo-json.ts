import { TAreaValue } from '../../store/action-creator/action-creator.schema';
import { detectCoordinateSystem, TCoordinateSystem } from '../../store/aoi/aoi-import/coordinate-validator';
import { TGeoJSONGeometry } from '../../store/aoi/aoi-import/geojson.types';
import { validateGeometryType } from '../../store/aoi/aoi-import/geojson-validator';
import { transformGeometryToAreaValue } from '../../store/aoi/aoi-import/shape-detector';

export interface IParseResult {
  success: boolean;
  areaValue?: TAreaValue;
  error?: string;
  detectedCRS?: TCoordinateSystem;
}

export const extractCoordinates = (geometry: TGeoJSONGeometry): number[][] => {
  if (geometry.type === 'Polygon') {
    return geometry.coordinates[0];
  }

  if (geometry.type === 'MultiPolygon') {
    return geometry.coordinates[0][0];
  }

  return [];
};

export const parseGeoJson = (geometry: TGeoJSONGeometry): IParseResult => {
  try {
    const geometryValidation = validateGeometryType(geometry);

    if (!geometryValidation.valid) {
      return {
        success: false,
        error: geometryValidation.errors.join(', '),
      };
    }

    const coordinates = extractCoordinates(geometry);
    const coordinateDetection = detectCoordinateSystem(coordinates);

    if (!coordinateDetection.valid) {
      return {
        success: false,
        error: coordinateDetection.error,
      };
    }

    const areaValue = transformGeometryToAreaValue(geometry);

    return {
      success: true,
      areaValue: areaValue,
      detectedCRS: coordinateDetection.detectedProjection,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to parse GeoJSON',
    };
  }
};
