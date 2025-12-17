import isPlainObject from 'lodash/isPlainObject';

import { TGeoJSONGeometry } from './geojson.types';

interface IValidationResult {
  valid: boolean;
  errors: string[];
}

type TGeojson = {
  type?: string;
  features?: {
    geometry?: {
      type?: string;
    };
  }[];
  geometry?: {
    type?: string;
  };
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const validateGeoJSON = (data: TGeojson | null | undefined): IValidationResult => {
  const errors: string[] = [];

  if (!data || !isPlainObject(data) || !data?.type) {
    errors.push('Invalid JSON structure');
    return { valid: false, errors };
  }

  if (!['Feature', 'FeatureCollection'].includes(data.type)) {
    errors.push('GeoJSON must be a Feature or FeatureCollection');
    return { valid: false, errors };
  }

  if (data.type === 'FeatureCollection') {
    if (!Array.isArray(data.features) || data.features.length === 0) {
      errors.push('FeatureCollection must contain at least one feature');
      return { valid: false, errors };
    }

    for (const feature of data.features) {
      if (!feature.geometry || !feature.geometry.type) {
        errors.push('Feature missing geometry');
        return { valid: false, errors };
      }
    }
  }

  if (data.type === 'Feature') {
    if (!data.geometry || !data.geometry.type) {
      errors.push('Feature missing geometry');
      return { valid: false, errors };
    }
  }

  return { valid: true, errors: [] };
};

export const validateGeometryType = (geometry: TGeoJSONGeometry): IValidationResult => {
  const supportedTypes = ['Polygon', 'MultiPolygon'];

  if (!supportedTypes.includes(geometry.type)) {
    return {
      valid: false,
      errors: [`Unsupported geometry type: ${geometry.type}. Only Polygon and MultiPolygon are supported.`],
    };
  }

  return { valid: true, errors: [] };
};
