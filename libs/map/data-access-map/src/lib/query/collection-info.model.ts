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

export const collectionInfoSchema = z
  .object({
    id: z.string(),
    extent: extentSchema,
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
