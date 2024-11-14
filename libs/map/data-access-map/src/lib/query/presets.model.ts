import { formatDate, TDateTimeString } from '@ukri/shared/utils/date';
import z from 'zod';

const coordinateSchema = z.tuple([z.number(), z.number()]);

const polygonSchema = z.object({
  type: z.literal('Polygon').transform(() => 'polygon' as const),
  coordinates: z.union([z.array(z.array(z.array(z.number()))), z.array(z.array(coordinateSchema))]),
});

const dateTimeStringSchema = z
  .custom<NonNullable<TDateTimeString>>((value) => !z.string().datetime().safeParse(value).error)
  .optional();

const clipSchema = z.object({
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
});

const landCoverChangeDetectionSchema = z.object({
  identifier: z.literal('land-cover-change-detection'),
  order: z.number(),
  inputs: z.object({
    aoi: polygonSchema,
    date_start: dateTimeStringSchema.optional(),
    date_end: dateTimeStringSchema.optional(),
    identifier: z.string(),
    stac_collection: z.string(),
  }),
});

const landCoverSchema = z.object({
  identifier: z.literal('land-cover-change-detection'),
  name: z.string(),
  description: z.string().optional(),
  thumbnail_b64: z.string().nullish(),
  disabled: z.boolean().default(false),
  workflow: z.object({
    clip: clipSchema,
    'land-cover-change-detection': landCoverChangeDetectionSchema,
  }),
});

const disabledSchema = z.object({
  identifier: z.literal('water-quality'),
  name: z.string(),
  description: z.string().optional(),
  thumbnail_b64: z.string().nullish(),
  disabled: z.boolean().default(true),
  workflow: z.object({}).optional(),
});

type TWorkflowType = {
  'land-cover-change-detection': {
    identifier: string;
    order: number;
    inputs: {
      identifier: string;
      stac_collection: string;
      aoi: {
        type: 'polygon';
        coordinates: number[][][];
      };
      date_start: string;
      date_end: string;
    };
  };
  clip: {
    identifier: string;
    order: number;
    inputs: {
      aoi: {
        type: 'polygon';
      };
      collection: string;
    };
  };
};

const presetSchema = z.union([landCoverSchema, disabledSchema]).transform((data) => {
  const workflow = data.workflow as TWorkflowType;

  const dateFrom = workflow?.['land-cover-change-detection']?.inputs.date_start;
  const dateTo = workflow?.['land-cover-change-detection']?.inputs.date_end;
  const dateRange =
    dateFrom && dateTo
      ? {
          from: formatDate(dateFrom as TDateTimeString),
          to: formatDate(dateTo as TDateTimeString),
        }
      : undefined;

  return {
    identifier: data.identifier,
    name: data.name,
    description: data.description,
    disabled: data.disabled,
    imageUrl: data.thumbnail_b64 ? `data:image/jpeg;base64,${data.thumbnail_b64}` : undefined,
    defaultValues: {
      aoi: workflow?.['land-cover-change-detection']?.inputs?.aoi,
      dateRange,
      dataSet: workflow?.['land-cover-change-detection']?.inputs.stac_collection,
      functions: workflow
        ? Object.entries(workflow).map(([, item]) => ({
            identifier: item.identifier,
            order: item.order,
          }))
        : [],
    },
  };
});

export const presetsSchema = z.object({
  presets: z.array(presetSchema),
  total: z.number(),
});

export type TPreset = z.infer<typeof presetSchema>;
