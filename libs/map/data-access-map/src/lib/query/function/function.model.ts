import z from 'zod';

const stringSchema = z.object({
  type: z.literal('string'),
  required: z.boolean(),
  default: z.string(),
  options: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
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

export const isVerified = (identifier: string) => identifier !== 'water-quality';

export const functionSchema = z
  .object({
    identifier: z.union([
      z.literal('land-cover-change-detection'),
      z.literal('ndvi'),
      z.literal('evi'),
      z.literal('savi'),
      z.literal('clip'),
      z.string(),
    ]),
    standalone: z.boolean(),
    visible: z.boolean(),
    name: z.string(),
    description: z.string().optional(),
    inputs: z.object({
      stac_collection: stringSchema.optional(),
      date_start: dateTimeSchema.optional(),
      date_end: dateTimeSchema.optional(),
      aoi: polygonSchema.optional(),
    }),
    outputs: z.object({
      collection: z.object({
        type: z.union([z.literal('stac_collection'), z.string()]),
      }),
    }),
  })
  .transform((data) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { stac_collection, date_start, date_end, ...rest } = data.inputs;

    return {
      name: data.name,
      identifier: data.identifier,
      standalone: data.standalone,
      visible: data.visible,
      verified: isVerified(data.identifier),
      inputs: {
        ...rest,
        aoi: data.inputs.aoi,
        stacCollection: stac_collection,
        dateStart: date_start,
        dateEnd: date_end,
      },
    };
  });

export const functionListSchema = z.object({
  functions: z.array(functionSchema),
  total: z.number(),
});

export type TFunction = z.infer<typeof functionSchema>;
