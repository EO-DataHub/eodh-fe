import { TDateString } from '@ukri/shared/utils/date';
import { z } from 'zod';

const coordinateSchema = z.tuple([z.number(), z.number()]);
const circleSchema = z.object({
  type: z.literal('circle'),
  center: z.array(z.number()),
  radius: z.number(),
});
const rectangleSchema = z.object({
  type: z.literal('rectangle'),
  coordinates: z.union([z.array(z.array(z.array(z.number()))), z.array(z.array(coordinateSchema))]),
});
const polygonSchema = z.object({
  type: z.literal('polygon'),
  coordinates: z.union([z.array(z.array(z.array(z.number()))), z.array(z.array(coordinateSchema))]),
});

export const areaValueSchema = z.union([circleSchema, rectangleSchema, polygonSchema]);

export const dataSetValueSchema = z.union([
  z.literal('sentinel-1'),
  z.literal('sentinel-2'),
  z.literal('sentinel-2-l2a-ard'),
  z.literal('sentinel-3'),
  z.literal('sentinel-5p'),
  z.literal('esacci-globallc'),
  z.literal('clms-corinelc'),
  z.literal('clms-water-bodies'),
]);

export const dateRangeValueSchema = z.object({
  from: z
    .custom<TDateString>((value) => !z.string().date().safeParse(value).error, {
      message: 'MAP.ACTION_CREATOR_PANEL.WORKFLOW.ERROR.NO_DATE_SELECTED',
    })
    .nullable(),
  to: z
    .custom<TDateString>((value) => !z.string().date().safeParse(value).error, {
      message: 'MAP.ACTION_CREATOR_PANEL.WORKFLOW.ERROR.NO_DATE_SELECTED',
    })
    .nullable(),
});

export const functionValueSchema = z.object({
  identifier: z.string(),
  verified: z.boolean(),
  supportedDataSets: z.array(z.string()),
});

export type TAreaValue = z.infer<typeof areaValueSchema>;
export type TDataSetValue = z.infer<typeof dataSetValueSchema>;
export type TDateRangeValue = z.infer<typeof dateRangeValueSchema>;
export type TFunctionValue = z.infer<typeof functionValueSchema>;
