import z from 'zod';

export const assetSchema = z.object({
  title: z.string().nullish(),
  description: z.string().nullish(),
  href: z.string(),
  type: z.string().nullish(),
  size: z.number().optional(),
  roles: z.array(z.string()).optional(),
  nodata: z.string().optional(),
  'raster:bands': z
    .array(
      z.object({
        nodata: z.number().nullable(),
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
  'raster:bands': z
    .array(
      z.object({
        nodata: z.number().nullable(),
        unit: z.string(),
      })
    )
    .optional(),
});
