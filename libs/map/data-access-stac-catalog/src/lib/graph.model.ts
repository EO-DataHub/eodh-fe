import z from 'zod';

const colorSchema = z
  .string()
  .refine((value) => /^#[0-9a-f]{3,6}$/i.test(value ?? ''), 'Value should be correct HEX color');

const stackBarAsset = z
  .object({
    title: z.string(),
    units: z.string(),
    chart_type: z.literal('classification-stacked-bar-chart'),
    x_labels: z.array(z.string()),
    data: z.array(
      z.object({
        name: z.string(),
        area: z.array(z.number()),
        percentage: z.array(z.number()),
        'color-hint': colorSchema,
      })
    ),
  })
  .transform((data) => ({
    title: data.title,
    unit: data.units,
    chartType: 'stacked-bar' as const,
    categories: data.x_labels,
    data: data.data.map((item) => ({
      name: item.name,
      value: item.area,
      percentage: item.percentage,
      color: item['color-hint'],
    })),
  }));

const rangeAreaWithLineAsset = z
  .object({
    title: z.string(),
    units: z.string(),
    chart_type: z.literal('range-area-with-line'),
    color: colorSchema,
    data: z.array(
      z.object({
        min: z.number().nullable(),
        max: z.number().nullable(),
        median: z.number().nullable(),
        x_label: z.string(),
      })
    ),
  })
  .transform((data) => ({
    title: data.title,
    unit: data.units,
    chartType: data.chart_type,
    color: data.color,
    data: data.data.map((item) => ({
      min: item.min,
      max: item.max,
      median: item.median,
      timestamp: item.x_label,
    })),
  }));

const stackBarSchema = z
  .object({
    job_id: z.string(),
    assets: z.object({
      data: stackBarAsset,
    }),
    continuation_token: z.string(),
  })
  .transform((data) => ({
    jobId: data.job_id,
    assets: data.assets,
    chartType: 'stacked-bar' as const,
    continuationToken: data.continuation_token,
  }));

const rangeAreaWithLineSchema = z
  .object({
    job_id: z.string(),
    assets: z.record(z.string(), rangeAreaWithLineAsset),
    continuation_token: z.string(),
  })
  .transform((data) => ({
    jobId: data.job_id,
    assets: data.assets,
    chartType: 'range-area-with-line' as const,
    continuationToken: data.continuation_token,
  }));

export const chartSchema = z.union([stackBarSchema, rangeAreaWithLineSchema]);

export type TRangeAreaWithLineChartData = z.infer<typeof rangeAreaWithLineSchema>;
export type TStackBarChartData = z.infer<typeof stackBarSchema>;
export type TChartData = z.infer<typeof chartSchema>;
