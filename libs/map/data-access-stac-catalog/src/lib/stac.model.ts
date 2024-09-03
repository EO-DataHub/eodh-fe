import z from 'zod';

const coordinateSchema = z.tuple([z.number(), z.number()]);

const geometrySchema = z.object({
  type: z.literal('Polygon'),
  coordinates: z.array(z.array(coordinateSchema)),
});

const propertySchema = z.object({
  datetime: z.string(),
  'eo:cloud_cover': z.number().optional(),
  'grid:code': z.string().optional(),
});

const linkSchema = z.object({
  href: z.string(),
  rel: z.string(),
  type: z.string().optional(),
  method: z.string().optional(),
  body: z
    .object({
      collections: z.array(z.string()).optional(),
      token: z.string(),
    })
    .optional(),
});

const assetSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  href: z.string(),
  type: z.string(),
  roles: z.array(z.string()),
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
    matched: z.number(),
  }),
});

export type TCollectionSchema = z.infer<typeof collectionSchema>;
