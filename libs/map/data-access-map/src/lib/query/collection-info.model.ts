import { z } from 'zod';

const linkSchema = z.object({
  rel: z.string(),
  type: z.string(),
  href: z.string().url(),
});

const bboxSchema = z.tuple([z.number(), z.number(), z.number(), z.number()]);

const intervalSchema = z.tuple([z.string().datetime(), z.string().datetime()]);

export const collectionInfoSchema = z.object({
  type: z.literal('Collection'),
  stac_version: z.string(),
  id: z.string(),
  title: z.string(),
  description: z.string(),
  links: z.array(linkSchema),
  keywords: z.array(z.string()),
  license: z.string(),
  extent: z.object({
    spatial: z.object({
      bbox: z.array(bboxSchema),
    }),
    temporal: z.object({
      interval: z.array(intervalSchema),
    }),
  }),
  stac_extensions: z.array(z.string()),
  providers: z.array(z.unknown()),
  summaries: z.record(z.unknown()),
  assets: z.record(z.unknown()),
});

export type TCollectionInfo = z.infer<typeof collectionInfoSchema>;
