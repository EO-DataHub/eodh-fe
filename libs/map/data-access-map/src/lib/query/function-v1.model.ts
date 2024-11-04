import z from 'zod';

const stringSchema = z.object({
  type: z.literal('string'),
  required: z.boolean(),
  default: z.string(),
  options: z.array(z.string()),
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

const functionSchema = z
  .object({
    name: z.string(),
    identifier: z.union([
      z.literal('ndvi'),
      z.literal('evi'),
      z.literal('savi'),
      z.literal('clip'),
      z.literal('land-cover-change-detection'),
      z.string(),
    ]),
    visible: z.boolean(),
    standalone: z.boolean(),
    description: z.string().optional(),
    inputs: z.object({
      stac_collection: stringSchema.optional(),
      date_start: dateTimeSchema.optional(),
      date_end: dateTimeSchema.optional(),
      aoi: polygonSchema.optional(),
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
    visible: data.visible,
    standalone: data.standalone,
    inputs: {
      ...data,
      aoi: data.inputs.aoi,
      stacCollection: data.inputs.stac_collection,
      dateStart: data.inputs.date_start,
      dateEnd: data.inputs.date_end,
    },
  }));

export const functionListSchema = z.object({
  functions: z.array(functionSchema),
  total: z.number(),
});

export type TFunction = z.infer<typeof functionSchema>;
