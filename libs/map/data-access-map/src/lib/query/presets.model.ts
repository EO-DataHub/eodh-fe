import z from 'zod';

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
          aoi: z
            .object({
              type: z.literal('Polygon'),
            })
            .optional(),
          date_start: z.string().optional(),
          date_end: z.string().optional(),
          identifier: z.string(),
          stac_collection: z.string(),
        }),
      }),
    }),
  })
  .transform((data) => ({
    identifier: data.identifier,
    name: data.name,
    description: data.description,
    imageUrl: data.thumbnail_b64 ? `data:image/jpeg;base64,${data.thumbnail_b64}` : undefined,
    defaultValues: {
      dataSet: data.workflow['land-cover-change-detection'].inputs.stac_collection,
      function: data.identifier,
    },
  }));

export const presetsSchema = z.object({
  presets: z.array(presetSchema),
  total: z.number(),
});

export type TPreset = z.infer<typeof presetSchema>;
