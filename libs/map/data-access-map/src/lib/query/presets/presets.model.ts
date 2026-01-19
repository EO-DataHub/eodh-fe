import { formatDate, TDateTimeString } from '@ukri/shared/utils/date';
import isObject from 'lodash/isObject';
import z from 'zod';

import { extractCoordinates, parseGeoJson } from '../../geometry/geo-json/geo-json';
import { TCoordinate } from '../../geometry/shape.model';
import { transformAreaValueCoordinates } from '../../store/aoi/aoi-import/coordinate-transformer';
import { detectCoordinateSystem } from '../../store/aoi/aoi-import/coordinate-validator';
import { TGeoJSONGeometry } from '../../store/aoi/aoi-import/geojson.types';
import { validateGeometryType } from '../../store/aoi/aoi-import/geojson-validator';

function getGeometryFromUnknown(data: unknown): TGeoJSONGeometry | undefined {
  if (!isObject(data)) {
    return undefined;
  }

  const type = (data as { type?: 'FeatureCollection' | 'Feature' | 'Polygon' | 'MultiPolygon' }).type;

  switch (type) {
    case 'FeatureCollection': {
      const features = (data as { features?: Array<{ geometry?: TGeoJSONGeometry }> }).features;
      return features?.[0]?.geometry;
    }
    case 'Feature':
      return (data as { geometry?: TGeoJSONGeometry }).geometry;
    case 'Polygon':
    case 'MultiPolygon':
      return data as TGeoJSONGeometry;
    default:
      return undefined;
  }
}

const polygonSchema = z.unknown().transform((value, ctx): TCoordinate => {
  const addError = () => {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Invalid AOI geometry',
    });
    return z.NEVER;
  };

  if (!isObject(value)) {
    return addError();
  }

  const geometry = getGeometryFromUnknown(value);
  if (!geometry) {
    return addError();
  }

  const geometryValidation = validateGeometryType(geometry);
  if (!geometryValidation.valid) {
    return addError();
  }

  const coordinates = extractCoordinates(geometry);
  const coordinateDetection = detectCoordinateSystem(coordinates);
  if (!coordinateDetection.valid) {
    return addError();
  }

  const parsedGeoJson = parseGeoJson(geometry);
  if (!parsedGeoJson.success || !parsedGeoJson.areaValue || !parsedGeoJson.detectedCRS) {
    return addError();
  }

  return transformAreaValueCoordinates(parsedGeoJson.areaValue, parsedGeoJson.detectedCRS);
});

const dateTimeStringSchema = z
  .custom<NonNullable<TDateTimeString>>((value) => !z.string().datetime().safeParse(value).error)
  .optional();

const clipSchema = z.object({
  identifier: z.literal('clip'),
  order: z.number(),
  inputs: z.object({
    aoi: z
      .object({
        type: z.literal('Polygon'),
      })
      .optional(),
    collection: z.string().optional(),
  }),
});

const functionInputsSchema = z.object({
  aoi: polygonSchema.optional(),
  date_start: dateTimeStringSchema.optional(),
  date_end: dateTimeStringSchema.optional(),
  identifier: z.string(),
  stac_collection: z.string(),
});

const presetBaseSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  thumbnail_b64: z.string().nullish(),
  disabled: z.boolean(),
});

const landCoverSchema = presetBaseSchema
  .extend({
    identifier: z.literal('land-cover-change-detection'),
    workflow: z.object({
      clip: clipSchema,
      'land-cover-change-detection': z.object({
        identifier: z.literal('land-cover-change-detection'),
        order: z.number(),
        inputs: functionInputsSchema,
      }),
    }),
  })
  .transform((data) => {
    const dateFrom = data.workflow?.['land-cover-change-detection']?.inputs.date_start;
    const dateTo = data.workflow?.['land-cover-change-detection']?.inputs.date_end;
    const dateRange =
      dateFrom && dateTo
        ? {
            from: formatDate(dateFrom as TDateTimeString),
            to: formatDate(dateTo as TDateTimeString),
          }
        : undefined;

    return {
      identifier: data.identifier,
      name: data.name,
      description: data.description,
      disabled: data.disabled,
      imageUrl: data.thumbnail_b64 ? `data:image/jpeg;base64,${data.thumbnail_b64}` : undefined,
      verified: true,
      defaultValues: {
        aoi: data.workflow?.['land-cover-change-detection'].inputs.aoi,
        dateRange,
        dataSet: data.workflow?.['land-cover-change-detection']?.inputs.stac_collection,
        functions: data.workflow
          ? Object.entries(data.workflow).map(([, item]) => ({
              identifier: item.identifier,
              order: item.order,
            }))
          : [],
      },
    };
  });

const waterQualitySchema = presetBaseSchema
  .extend({
    identifier: z.literal('water-quality'),
    workflow: z.object({
      clip: clipSchema,
      'water-quality': z.object({
        identifier: z.literal('water-quality'),
        order: z.number(),
        inputs: functionInputsSchema,
      }),
    }),
  })
  .transform((data) => {
    const dateFrom = data.workflow?.['water-quality']?.inputs.date_start;
    const dateTo = data.workflow?.['water-quality']?.inputs.date_end;
    const dateRange =
      dateFrom && dateTo
        ? {
            from: formatDate(dateFrom as TDateTimeString),
            to: formatDate(dateTo as TDateTimeString),
          }
        : undefined;

    return {
      identifier: data.identifier,
      name: data.name,
      description: data.description,
      disabled: data.disabled,
      imageUrl: data.thumbnail_b64 ? `data:image/jpeg;base64,${data.thumbnail_b64}` : undefined,
      verified: false,
      defaultValues: {
        aoi: data.workflow?.['water-quality'].inputs.aoi,
        dateRange,
        dataSet: data.workflow?.['water-quality']?.inputs.stac_collection,
        functions: data.workflow
          ? Object.entries(data.workflow).map(([, item]) => ({
              identifier: item.identifier,
              order: item.order,
            }))
          : [],
      },
    };
  });

const presetSchema = z.union([landCoverSchema, waterQualitySchema]);

export const presetsSchema = z.object({
  presets: z.array(presetSchema),
  total: z.number(),
});

export type TPreset = z.infer<typeof presetSchema>;
