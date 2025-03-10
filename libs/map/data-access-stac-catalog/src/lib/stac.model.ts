import { TDateString } from '@ukri/shared/utils/date';
import z from 'zod';

const coordinateSchema = z.tuple([z.number(), z.number()]);

const polygonSchema = z.object({
  type: z.literal('Polygon'),
  coordinates: z.union([z.array(z.array(z.array(z.number()))), z.array(z.array(coordinateSchema))]),
});

const multiPolygonSchema = z.object({
  type: z.literal('MultiPolygon'),
  coordinates: z.union([z.array(z.array(z.array(coordinateSchema))), z.array(z.array(z.array(z.array(z.number()))))]),
});

const circleSchema = z.object({
  type: z.literal('Circle'),
  coordinates: z.array(z.array(z.array(z.number()))),
});

const geometrySchema = z.union([polygonSchema, multiPolygonSchema, circleSchema]);

const sentinel1CedaPropertySchema = z
  .object({
    datetime: z.custom<NonNullable<TDateString>>(
      (value) => !z.string().datetime({ offset: true }).safeParse(value).error
    ),
    'eo:cloud_cover': z.union([z.number(), z.string().transform((data) => parseFloat(data))]).optional(),
    'grid:code': z.string().optional(),
    'Orbit Direction': z.string().optional(),
    instrument_mode: z.string().optional(),
    Polarisation: z.array(z.string()).optional(),
  })
  .transform((data) => ({
    datetime: data.datetime,
    'eo:cloud_cover': data['eo:cloud_cover'],
    'grid:code': data['grid:code'],
    'sat:orbit_state': data['Orbit Direction'],
    'sar:instrument_mode': data.instrument_mode,
    'sar:polarizations': data.Polarisation,
  }));

const skySatPropertySchema = z
  .object({
    datetime: z.custom<NonNullable<TDateString>>(
      (value) => !z.string().datetime({ offset: true }).safeParse(value).error
    ),
    cloud_percent: z.number(),
  })
  .transform((data) => ({
    datetime: data.datetime,
    'eo:cloud_cover': data.cloud_percent,
    'grid:code': undefined,
  }));

const rapidEyePropertySchema = z
  .object({
    datetime: z.custom<NonNullable<TDateString>>(
      (value) => !z.string().datetime({ offset: true }).safeParse(value).error
    ),
    cloud_cover: z.number().transform((value) => value * 100),
  })
  .transform((data) => ({
    datetime: data.datetime,
    'eo:cloud_cover': data.cloud_cover,
    'grid:code': undefined,
  }));

const planetScopePropertySchema = z
  .object({
    datetime: z.custom<NonNullable<TDateString>>(
      (value) => !z.string().datetime({ offset: true }).safeParse(value).error
    ),
    cloud_percent: z.number(),
  })
  .transform((data) => ({
    datetime: data.datetime,
    'eo:cloud_cover': data.cloud_percent,
    'grid:code': undefined,
  }));

const propertySchema = z.object({
  datetime: z.custom<NonNullable<TDateString>>(
    (value) => !z.string().datetime({ offset: true }).safeParse(value).error
  ),
  'eo:cloud_cover': z.union([z.number(), z.string().transform((data) => parseFloat(data))]).optional(),
  'grid:code': z.string().optional(),
  'sat:orbit_state': z.string().optional(),
  'sar:instrument_mode': z.string().optional(),
  'sar:polarizations': z.array(z.string()).optional(),
});

const linkSchema = z.object({
  href: z.string(),
  rel: z.union([
    z.literal('self'),
    z.literal('parent'),
    z.literal('collection'),
    z.literal('root'),
    z.literal('canonical'),
    z.literal('license'),
    z.literal('derived_from'),
    z.literal('thumbnail'),
    z.literal('next').optional(),
  ]),
  type: z.string().optional(),
  title: z.string().nullish(),
  merge: z.boolean().optional(),
  method: z.string().optional(),
  body: z.object({}).passthrough().optional(),
});

const assetSchema = z.object({
  title: z.string().nullish(),
  description: z.string().nullish(),
  href: z.string(),
  type: z.string().nullish(),
  size: z.number().optional(),
  roles: z.array(z.string()).optional(),
  'raster:bands': z
    .array(
      z.object({
        nodata: z.number().nullable(),
        unit: z.string(),
      })
    )
    .optional(),
});

const waterQualitySchema = assetSchema.extend({
  statistics: z.object({
    maximum: z.number().nullable(),
    mean: z.number().nullable(),
    median: z.number().nullable(),
    minimum: z.number().nullable(),
    stddev: z.number().nullable(),
    valid_percent: z.number().nullable(),
  }),
});

const featureSchema = z.object({
  type: z.literal('Feature'),
  geometry: geometrySchema,
  properties: z.union([
    propertySchema,
    sentinel1CedaPropertySchema,
    skySatPropertySchema,
    rapidEyePropertySchema,
    planetScopePropertySchema,
  ]),
  id: z.string(),
  bbox: z.tuple([z.number(), z.number(), z.number(), z.number()]),
  stac_version: z.string(),
  stac_extensions: z.array(z.string()).optional(),
  assets: z.object({
    thumbnail: assetSchema.optional(),
    cog: assetSchema.optional(),
    visual: assetSchema.optional(),
    cdom: waterQualitySchema.optional(),
    cya_cells: waterQualitySchema.optional(),
    doc: waterQualitySchema.optional(),
    turb: waterQualitySchema.optional(),
    ndwi: waterQualitySchema.optional(),
  }),
  links: z.array(linkSchema),
  collection: z.string(),
});

export const collectionSchema = z.object({
  type: z.literal('FeatureCollection'),
  features: z.array(featureSchema),
  links: z.array(linkSchema),
});

export type TAssetName = keyof TFeature['assets'];
export type TGeometry = z.infer<typeof geometrySchema>;
export type TCollection = z.infer<typeof collectionSchema>;
export type TFeature = TCollection['features'][number];
export type TAsset = z.infer<typeof assetSchema>;
