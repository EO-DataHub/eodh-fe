import z from 'zod';

const booleanSchema = z.object({
  type: z.literal('boolean'),
  required: z.boolean(),
  default: z.boolean(),
});

const stringSchema = z.object({
  type: z.literal('string'),
  required: z.boolean(),
  default: z.string().nullish(),
  options: z.array(z.string()),
});

const numberSchema = z.object({
  type: z.literal('number'),
  required: z.boolean(),
  default: z.number(),
});

const inputSchema = z.union([booleanSchema, stringSchema, numberSchema]);

const presetSchema = z
  .object({
    name: z.string(),
    preset: z.boolean(),
    identifier: z.string(),
    description: z.string().optional(),
    thumbnail_b64: z.string().optional(),
    inputs: z.object({
      stac_collection: z
        .object({
          type: z.literal('string'),
          required: z.boolean(),
          default: z.string(),
          options: z.array(z.string()),
        })
        .optional(),
      calibrate: inputSchema.optional(),
      index: inputSchema.optional(),
      limit: inputSchema.optional(),
    }),
  })
  .transform((data) => ({
    preset: data.preset,
    identifier: data.identifier,
    name: data.name,
    description: data.description,
    imageUrl: data.thumbnail_b64 && `data:image/jpeg;base64,${data.thumbnail_b64}`,
    defaultValues: {
      dataSet: data.inputs.stac_collection?.default,
      function: data.identifier,
    },
  }));

export const presetsSchema = z.object({
  functions: z.array(presetSchema),
  total: z.number(),
});

export type TPreset = z.infer<typeof presetSchema>;
