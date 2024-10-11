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

const functionSchema = z.object({
  name: z.string(),
  identifier: z.string(),
  // preset: false means that it is clipping function that we can attach to another functions
  preset: z.boolean(),
  description: z.string().optional(),
  thumbnail_b64: z.string(),
  inputs: z.object({
    stac_collection: inputSchema,
    date_start: inputSchema,
    date_end: inputSchema,
    aoi: inputSchema,
    bbox: inputSchema,
    index: inputSchema.optional(),
  }),
  outputs: z.object({
    collection: outputSchema,
  }),
});

export const presetsSchema = z.object({
  functions: z.array(functionSchema),
  total: z.number(),
});

export type TPresets = z.infer<typeof presetsSchema>;
