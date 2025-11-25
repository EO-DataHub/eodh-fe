import { TAreaValue } from '../../action-creator/action-creator.schema';
import { IGeoJSONFeature, TGeoJSON } from './geojson.types';
import { validateGeoJSON, validateGeometryType } from './geojson-validator';
import { transformGeometryToAreaValue } from './shape-detector';

export interface IParseResult {
  success: boolean;
  areaValue?: TAreaValue;
  error?: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const parseGeoJSONFile = async (file: File): Promise<IParseResult> => {
  try {
    const text = await file.text();
    const data: TGeoJSON = JSON.parse(text);

    const validation = validateGeoJSON(data);
    if (!validation.valid) {
      return {
        success: false,
        error: validation.errors.join(', '),
      };
    }

    let feature: IGeoJSONFeature;
    if (data.type === 'FeatureCollection') {
      feature = data.features[0];
    } else {
      feature = data;
    }

    const geometryValidation = validateGeometryType(feature.geometry);
    if (!geometryValidation.valid) {
      return {
        success: false,
        error: geometryValidation.errors.join(', '),
      };
    }

    const areaValue = transformGeometryToAreaValue(feature.geometry);

    return {
      success: true,
      areaValue,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to parse GeoJSON file',
    };
  }
};
