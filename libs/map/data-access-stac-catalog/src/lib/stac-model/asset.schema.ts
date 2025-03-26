import z from 'zod';

export const noDataSchema = z.union([z.number(), z.string()]).nullish();

export const assetSchema = z.object({
  title: z.string().nullish(),
  description: z.string().nullish(),
  href: z.string(),
  type: z.string().nullish(),
  size: z.number().optional(),
  roles: z.array(z.string()).optional(),
  nodata: noDataSchema,
  'raster:bands': z
    .array(
      z.object({
        nodata: noDataSchema,
        unit: z.string(),
      })
    )
    .optional(),
});

export const thumbnailAssetSchema = z.object({
  title: z.string().nullish(),
  description: z.string().nullish(),
  href: z.string().nullish().optional(),
  type: z.string().nullish(),
  size: z.number().optional(),
  roles: z.array(z.string()).optional(),
  nodata: noDataSchema,
  'raster:bands': z
    .array(
      z.object({
        nodata: noDataSchema,
        unit: z.string(),
      })
    )
    .optional(),
});
