import z from 'zod';

const inputSchema = z.object({
  type: z.string(),
  required: z.boolean(),
  description: z.string(),
  default: z.union([z.string(), z.null()]),
  options: z.union([z.array(z.string()), z.null()]),
});

const outputSchema = z.object({
  type: z.string(),
  description: z.string(),
});

const functionSchema = z
  .object({
    name: z.string(),
    identifier: z.string(),
    preset: z.boolean(),
    description: z.string().optional(),
    thumbnail_b64: z.string(),
    inputs: z.object({
      stac_collection: inputSchema.optional(),
      date_start: inputSchema.optional(),
      date_end: inputSchema.optional(),
      aoi: inputSchema.optional(),
      bbox: inputSchema.optional(),
      index: inputSchema.optional(),
    }),
    outputs: z.object({
      collection: outputSchema,
    }),
  })
  .transform((data) => ({
    ...data,
    imageUrl: data.thumbnail_b64 && `data:image/jpeg;base64,${data.thumbnail_b64}`,
  }));

export const presetsSchema = z.object({
  functions: z.array(functionSchema),
  total: z.number(),
});

export type TPresets = z.infer<typeof presetsSchema>;
