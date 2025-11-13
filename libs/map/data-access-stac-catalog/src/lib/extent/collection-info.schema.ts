import { TDateString } from '@ukri/shared/utils/date';
import z from 'zod';

export const intervalSchema = z
  .tuple([
    z.custom<TDateString | null>((value) => !z.string().datetime().nullish().safeParse(value).error).nullish(),
    z.custom<TDateString | null>((value) => !z.string().datetime().nullish().safeParse(value).error).nullish(),
  ])
  .rest(z.any());

export const collectionInfoSchema = z.object({
  extent: z.object({
    temporal: z.object({
      interval: z.tuple([intervalSchema]).rest(z.any()),
    }),
  }),
});
