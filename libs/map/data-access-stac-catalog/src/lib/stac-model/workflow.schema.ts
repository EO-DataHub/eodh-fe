import { TDateString } from '@ukri/shared/utils/date';
import z from 'zod';

import { thumbnailAssetSchema } from './asset.schema';
import { featureGenericSchema } from './feature-generic.schema';

const propertySchema = z
  .object({
    datetime: z.custom<NonNullable<TDateString>>(
      (value) => !z.string().datetime({ offset: true }).safeParse(value).error
    ),
    cloudCoverage: z.never().optional(),
    gridCode: z.never().optional(),
    orbitState: z.never().optional(),
    instrumentMode: z.never().optional(),
    polarizations: z.never().optional(),
  })
  .transform((data) => ({
    datetime: data.datetime,
    cloudCoverage: data.cloudCoverage as never,
    gridCode: data.gridCode as never,
    orbitState: data.orbitState as never,
    instrumentMode: data.instrumentMode as never,
    polarizations: data.polarizations as never,
  }));

const waterQualityAssetSchema = z.object({
  title: z.string(),
  type: z.string(),
  href: z.string(),
  size: z.number(),
  roles: z.array(z.string()),
  'proj:epsg': z.number(),
  'proj:shape': z.array(z.number()),
  'proj:transform': z.array(z.number()),
  'raster:bands': z.array(
    z.object({
      nodata: z.number().nullable(),
      unit: z.string(),
    })
  ),
  colormap: z.object({
    max: z.number(),
    min: z.number().nullable(),
    mpl_equivalent_cmap: z.string(),
    name: z.string(),
    reversed: z.boolean(),
    steps: z.number(),
    units: z.string(),
  }),
  statistics: z.object({
    maximum: z.number().nullable(),
    mean: z.number().nullable(),
    median: z.number().nullable(),
    minimum: z.number().nullable(),
    stddev: z.number().nullable(),
    valid_percent: z.number().nullable(),
  }),
  'classification:classes': z.never().optional(),
});

export const waterQualitySchema = featureGenericSchema.extend({
  properties: propertySchema,
  assets: z.object({
    thumbnail: thumbnailAssetSchema.optional(),
    data: waterQualityAssetSchema.optional(),
    cdom: waterQualityAssetSchema.optional(),
    cya_cells: waterQualityAssetSchema.optional(),
    doc: waterQualityAssetSchema.optional(),
    turb: waterQualityAssetSchema.optional(),
    ndwi: waterQualityAssetSchema.optional(),
  }),
});

const landCoverChangesAssetSchema = z.object({
  title: z.string(),
  type: z.string(),
  href: z.string(),
  size: z.number(),
  roles: z.array(z.string()),
  colormap: z.never().optional(),
  statistics: z.never().optional(),
  'classification:classes': z.array(
    z.object({
      'color-hint': z.string().transform((color) => {
        const fullColor = color.padEnd(6, '0');
        return fullColor.startsWith('#') ? fullColor : `#${fullColor}`;
      }),
      description: z.string(),
      value: z.number().nullable(),
    })
  ),
});

export const landCoverChangesSchema = featureGenericSchema.extend({
  properties: propertySchema
    .innerType()
    .extend({
      lulc_classes_m2: z.record(z.string().or(z.number()), z.number()),
      lulc_classes_percentage: z.record(z.string().or(z.number()), z.number()),
    })
    .transform((data) => ({
      datetime: data.datetime,
      lulc_classes_m2: data.lulc_classes_m2,
      lulc_classes_percentage: data.lulc_classes_percentage,
      cloudCoverage: data.cloudCoverage as never,
      gridCode: data.gridCode as never,
      orbitState: data.orbitState as never,
      instrumentMode: data.instrumentMode as never,
      polarizations: data.polarizations as never,
    })),
  assets: z.object({
    thumbnail: thumbnailAssetSchema.optional(),
    data: landCoverChangesAssetSchema,
    cdom: z.never().optional(),
    cya_cells: z.never().optional(),
    doc: z.never().optional(),
    turb: z.never().optional(),
    ndwi: z.never().optional(),
  }),
});

export const featureWorkflowSchema = z.union([landCoverChangesSchema, waterQualitySchema]);
