import { formatDate, TDateString } from '@ukri/shared/utils/date';
import z from 'zod';

const coordinateSchema = z.tuple([z.number(), z.number()]);

const polygonSchema = z.object({
  type: z.literal('Polygon').transform(() => 'polygon' as const),
  coordinates: z.union([z.array(z.array(z.array(z.number()))), z.array(z.array(coordinateSchema))]),
});

const presetSchema = z
  .object({
    identifier: z.union([z.literal('land-cover-change-detection'), z.string()]),
    name: z.string(),
    description: z.string().optional(),
    thumbnail_b64: z.string().nullish(),
    workflow: z.object({
      clip: z.object({
        identifier: z.literal('clip'),
        order: z.number(),
        inputs: z.object({
          aoi: z
            .object({
              type: z.literal('Polygon'),
            })
            .optional(),
          collection: z.string().optional(),
        }),
      }),
      'land-cover-change-detection': z.object({
        identifier: z.literal('land-cover-change-detection'),
        order: z.number(),
        inputs: z.object({
          aoi: polygonSchema.optional(),
          date_start: z
            .custom<NonNullable<TDateString>>((value) => !z.string().datetime().safeParse(value).error)
            .transform((value) => formatDate(value))
            .optional(),
          date_end: z
            .custom<NonNullable<TDateString>>((value) => !z.string().datetime().safeParse(value).error)
            .transform((value) => formatDate(value))
            .optional(),
          identifier: z.string(),
          stac_collection: z.string(),
        }),
      }),
    }),
  })
  .transform((data) => {
    const dateFrom = data.workflow['land-cover-change-detection'].inputs.date_start;
    const dateTo = data.workflow['land-cover-change-detection'].inputs.date_end;
    const dateRange =
      dateFrom && dateTo
        ? {
            from: dateFrom,
            to: dateTo,
          }
        : undefined;

    return {
      identifier: data.identifier,
      name: data.name,
      description: data.description,
      imageUrl: data.thumbnail_b64 ? `data:image/jpeg;base64,${data.thumbnail_b64}` : undefined,
      defaultValues: {
        aoi: data.workflow['land-cover-change-detection'].inputs.aoi,
        dateRange,
        dataSet: data.workflow['land-cover-change-detection'].inputs.stac_collection,
        functions: Object.entries(data.workflow).map(([, item]) => ({
          identifier: item.identifier,
          order: item.order,
        })),
      },
    };
  });

export const presetsSchema = z.object({
  presets: z.array(presetSchema),
  total: z.number(),
});

export type TPreset = z.infer<typeof presetSchema>;
