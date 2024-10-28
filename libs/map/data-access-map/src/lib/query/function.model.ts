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

const dateTimeSchema = z.object({
  type: z.literal('datetime'),
  required: z.boolean(),
  default: z.string().nullish(),
});

const coordinateSchema = z.tuple([z.number(), z.number()]);
const circleSchema = z.array(z.array(z.array(z.number())));
const geometrySchema = z.union([
  z.array(z.array(z.array(z.number()))),
  circleSchema,
  z.array(z.array(coordinateSchema)),
]);

const polygonSchema = z.object({
  type: z.literal('polygon'),
  required: z.boolean(),
  default: geometrySchema.nullish(),
});

const inputSchema = z.union([booleanSchema, stringSchema, numberSchema, dateTimeSchema, polygonSchema]);

const functionSchema = z
  .object({
    name: z.string(),
    identifier: z.union([
      z.literal('raster-calculate'),
      z.literal('lulc-change'),
      z.literal('water-quality'),
      z.literal('clip'),
      z.string(),
    ]),
    preset: z.boolean(),
    description: z.string().optional(),
    thumbnail_b64: z.string(),
    inputs: z.object({
      stac_collection: inputSchema.optional(),
      date_start: inputSchema.optional(),
      date_end: inputSchema.optional(),
      aoi: inputSchema.optional(),
      calibrate: inputSchema.optional(),
      index: inputSchema.optional(),
      limit: inputSchema.optional(),
    }),
    outputs: z.object({
      collection: z.object({
        type: z.string(),
      }),
    }),
  })
  .transform((data) => ({
    name: data.name,
    identifier: data.identifier,
    standalone: data.preset,
    inputs: {
      ...data,
      aoi: data.inputs.aoi,
      stacCollection: data.inputs.stac_collection,
      dateStart: data.inputs.date_start,
      dateEnd: data.inputs.date_end,
    },
    params: {
      index: data.inputs.index,
      limit: data.inputs.limit,
      calibrate: data.inputs.calibrate,
    },
  }));

export const functionListSchema = z.object({
  functions: z.array(functionSchema),
  total: z.number(),
});

export type TFunction = z.infer<typeof functionSchema>;
