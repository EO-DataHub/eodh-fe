import { TDateString } from '@ukri/shared/utils/date';
import z from 'zod';

const intervalSchema = z
  .array(
    z.array(z.custom<NonNullable<TDateString>>((value) => !z.string().datetime().safeParse(value).error)).length(2)
  )
  .length(1);

const extentSchema = z.object({
  spatial: z.object({
    bbox: z.array(z.array(z.number()).length(4)).length(1),
  }),
  temporal: z.object({
    interval: intervalSchema,
  }),
});

export const collectionInfoCacheSchema = z.object({
  collectionInterval: z.object({
    from: z.custom<NonNullable<TDateString>>((value) => !z.string().datetime().safeParse(value).error),
    to: z.custom<NonNullable<TDateString>>((value) => !z.string().datetime().safeParse(value).error),
  }),
});

export const collectionInfoResponseSchema = z
  .object({
    id: z.string(),
    extent: extentSchema,
  })
  .transform((data) => {
    return {
      collectionInterval: {
        from: data.extent.temporal.interval[0][0],
        to: data.extent.temporal.interval[0][1],
      },
    };
  });

export type TCollectionInfo = z.infer<typeof collectionInfoResponseSchema>;
