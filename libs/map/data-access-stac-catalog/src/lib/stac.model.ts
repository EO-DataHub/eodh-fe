import z from 'zod';

const coordinateSchema = z.tuple([z.number(), z.number()]);

const polygonSchema = z.object({
  type: z.literal('Polygon'),
  coordinates: z.union([z.array(z.array(z.array(z.number()))), z.array(z.array(coordinateSchema))]),
});

const multiPolygonSchema = z.object({
  type: z.literal('MultiPolygon'),
  coordinates: z.array(z.array(z.array(coordinateSchema))),
});

const circleSchema = z.object({
  type: z.literal('Circle'),
  coordinates: z.array(z.array(z.array(z.number()))),
});

const geometrySchema = z.union([polygonSchema, multiPolygonSchema, circleSchema]);

const propertySchema = z.object({
  datetime: z.string(),
  'eo:cloud_cover': z.number().optional(),
  'grid:code': z.string().optional(),
  'sat:orbit_state': z.string().optional(),
  'sar:instrument_mode': z.string().optional(),
  'sar:polarizations': z.array(z.string()).optional(),
});

const linkSchema = z.object({
  href: z.string(),
  rel: z.string(),
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
  roles: z.array(z.string()).optional(),
  'raster:bands': z
    .array(
      z.object({
        nodata: z.number(),
        data_type: z.string(),
      })
    )
    .optional(),
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

export type TGeometry = z.infer<typeof geometrySchema>;
export type TCollection = z.infer<typeof collectionSchema>;
