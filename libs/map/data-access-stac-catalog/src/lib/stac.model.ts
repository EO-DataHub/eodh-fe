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

const propertySchema = z.object({
  datetime: z.custom<NonNullable<TDateString>>(
    (value) => !z.string().datetime({ offset: true }).safeParse(value).error
  ),
  'eo:cloud_cover': z.number().optional(),
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
  title: z.string().optional(),
  merge: z.boolean().optional(),
  method: z.string().optional(),
  body: z
    .object({
      collections: z.array(z.string()).optional(),
      token: z.string().optional(),
      next: z.number().optional(),
    })
    .optional(),
});

const assetSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  href: z.string(),
  type: z.string(),
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
  properties: propertySchema,
  id: z.string(),
  bbox: z.tuple([z.number(), z.number(), z.number(), z.number()]),
  stac_version: z.string(),
  stac_extensions: z.array(z.string()).optional(),
  assets: z.object({
    thumbnail: assetSchema,
    visual: assetSchema.optional(),
    cdom: waterQualitySchema.optional(),
    cya_cells: waterQualitySchema.optional(),
    doc: waterQualitySchema.optional(),
    turb: waterQualitySchema.optional(),
  }),
  links: z.array(linkSchema),
  collection: z.string(),
});

export const collectionSchema = z.object({
  type: z.literal('FeatureCollection'),
  features: z.array(featureSchema),
  links: z.array(linkSchema),
  context: z.object({
    returned: z.number(),
    limit: z.number(),
    matched: z.number().optional(),
    next: z.number().optional(),
  }),
});

export type TAssetName = keyof TFeature['assets'];
export type TWaterQuality = z.infer<typeof waterQualitySchema>;
export type TGeometry = z.infer<typeof geometrySchema>;
export type TCollection = z.infer<typeof collectionSchema>;
export type TFeature = TCollection['features'][number];
export type TAsset = z.infer<typeof assetSchema>;
