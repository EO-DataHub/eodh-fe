import { TDateString } from '@ukri/shared/utils/date';
import z from 'zod';

const intervalSchema = z.array(z.array(z.string()).length(2)).length(1);

const extentSchema = z.object({
  spatial: z.object({
    bbox: z.array(z.array(z.number()).length(4)).length(1),
  }),
  temporal: z.object({
    interval: intervalSchema,
  }),
});

const linkSchema = z.object({
  href: z.string(),
  rel: z.string(),
  type: z.string().optional(),
});

export const collectionInfoSchema = z
  .object({
    type: z.literal('Collection'),
    stac_version: z.string(),
    id: z.string(),
    title: z.string(),
    description: z.string(),
    links: z.array(linkSchema),
    keywords: z.array(z.string()),
    license: z.string(),
    extent: extentSchema,
    stac_extensions: z.array(z.string()),
    providers: z.array(z.unknown()),
    summaries: z.record(z.unknown()),
    assets: z.record(z.unknown()),
  })
  .transform((data) => {
    return {
      collectionInterval: {
        from: data.extent.temporal.interval[0][0] as NonNullable<TDateString>,
        to: data.extent.temporal.interval[0][1] as NonNullable<TDateString>,
      },
    };
  });

export type TCollectionInfo = z.infer<typeof collectionInfoSchema>;
