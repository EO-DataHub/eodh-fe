import { TDateString } from '@ukri/shared/utils/date';
import uniq from 'lodash/uniq';
import { z } from 'zod';

export const isAreaImportNode = (node: TNodeImport): node is TAreaNodeImport => node.type === 'area';
export const isDataSetImportNode = (node: TNodeImport): node is TDataSetNodeImport => node.type === 'dataSet';
export const isDateRangeImportNode = (node: TNodeImport): node is TDateRangeNodeImport => node.type === 'dateRange';
export const isFunctionImportNode = (node: TNodeImport): node is TFunctionNodeImport => node.type === 'function';

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
const geometrySchema = z.union([circleSchema, rectangleSchema, polygonSchema]);

const baseNodeSchema = z.object({
  id: z.string(),
  order: z.number(),
});

export const areaNodeSchema = baseNodeSchema.extend({
  type: z.literal('area'),
  value: geometrySchema.nullish(),
});

export const dataSetNodeSchema = baseNodeSchema.extend({
  type: z.literal('dataSet'),
  value: z
    .union([
      z.literal('sentinel-1'),
      z.literal('sentinel-2-l1c'),
      z.literal('sentinel-2-l2a'),
      z.literal('sentinel-3'),
      z.literal('sentinel-5p'),
      z.literal('esacci-globallc'),
      z.literal('clms-corinelc'),
      z.literal('clms-water-bodies'),
    ])
    .nullish(),
});

export const dateRangeNodeSchema = baseNodeSchema.extend({
  type: z.literal('dateRange'),
  value: z
    .object({
      from: z.custom<TDateString>((value) => !z.string().date().safeParse(value).error).nullable(),
      to: z.custom<TDateString>((value) => !z.string().date().safeParse(value).error).nullable(),
    })
    .nullish(),
});

const functionNodeSchema = baseNodeSchema.extend({
  type: z.literal('function'),
  value: z
    .object({
      identifier: z.string(),
      supportedDataSets: z.array(z.string()),
    })
    .nullish(),
});

export const nodeImportSchema = z
  .object({
    version: z.literal('1.0'),
    nodes: z.union([areaNodeSchema, dataSetNodeSchema, dateRangeNodeSchema, functionNodeSchema]).array(),
  })
  .superRefine((schema, ctx) => {
    const order = schema.nodes.map((node) => node.order).sort();
    const areaNodes = schema.nodes.filter((node) => isAreaImportNode(node));
    const dataSetNodes = schema.nodes.filter((node) => isDataSetImportNode(node));
    const dateRangeNodes = schema.nodes.filter((node) => isDateRangeImportNode(node));
    const functionNodes = schema.nodes.filter((node) => isFunctionImportNode(node));
    const message = 'GLOBAL.ERRORS.WORKFLOW_IMPORT.WRONG_FILE';

    if (uniq(order).length !== order.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message,
      });
    }

    if (areaNodes.length <= 0 || dataSetNodes.length <= 0 || dateRangeNodes.length <= 0 || functionNodes.length <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message,
      });
    }

    if (areaNodes.length > 1 || dataSetNodes.length > 1 || dateRangeNodes.length > 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message,
      });
    }
  });

export type TAreaNodeImport = z.infer<typeof areaNodeSchema>;
export type TDateRangeNodeImport = z.infer<typeof dateRangeNodeSchema>;
export type TDataSetNodeImport = z.infer<typeof dataSetNodeSchema>;
export type TFunctionNodeImport = z.infer<typeof functionNodeSchema>;
export type TNodeImport = TAreaNodeImport | TDateRangeNodeImport | TDataSetNodeImport | TFunctionNodeImport;
export type TWorkflowImport = z.infer<typeof nodeImportSchema>;
