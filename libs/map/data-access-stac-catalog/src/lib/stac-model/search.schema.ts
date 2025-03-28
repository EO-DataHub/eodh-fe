import { TDateString } from '@ukri/shared/utils/date';
import z from 'zod';

import { assetSchema, thumbnailAssetSchema } from './asset.schema';
import { featureGenericSchema } from './feature-generic.schema';

const propertySchema = z
  .object({
    datetime: z.custom<NonNullable<TDateString>>(
      (value) => !z.string().datetime({ offset: true }).safeParse(value).error
    ),
    cloudCoverage: z.union([z.number(), z.string().transform((data) => parseFloat(data))]).optional(),
    gridCode: z.string().optional(),
    orbitState: z.string().optional(),
    instrumentMode: z.string().optional(),
    polarizations: z.array(z.string()).optional(),
    cloud_cover: z.never().optional(),
    cloud_percent: z.never().optional(),
    'eo:cloud_cover': z.never().optional(),
    'grid:code': z.never().optional(),
    'sat:orbit_state': z.never().optional(),
    'sar:instrument_mode': z.never().optional(),
    'sar:polarizations': z.never().optional(),
    'Orbit Direction': z.never().optional(),
  })
  .transform((data) => ({
    datetime: data.datetime,
    cloudCoverage: data.cloudCoverage,
    gridCode: data.gridCode,
    orbitState: data.orbitState,
    instrumentMode: data.instrumentMode,
    polarizations: data.polarizations,
  }));

const sentinel1Element84PropertySchema = z
  .object({
    datetime: z.custom<NonNullable<TDateString>>(
      (value) => !z.string().datetime({ offset: true }).safeParse(value).error
    ),
    'eo:cloud_cover': z.union([z.number(), z.string().transform((data) => parseFloat(data))]).optional(),
    'grid:code': z.string().optional(),
    'sat:orbit_state': z.string().optional(),
    'sar:instrument_mode': z.string().optional(),
    'sar:polarizations': z.array(z.string()).optional(),
    cloud_cover: z.never().optional(),
    cloud_percent: z.never().optional(),
    cloudCoverage: z.never().optional(),
    gridCode: z.never().optional(),
    orbitState: z.never().optional(),
    instrumentMode: z.never().optional(),
    polarizations: z.never().optional(),
  })
  .transform((data) => ({
    datetime: data.datetime,
    cloudCoverage: data['eo:cloud_cover'],
    gridCode: data['grid:code'],
    orbitState: data['sat:orbit_state'],
    instrumentMode: data['sar:instrument_mode'],
    polarizations: data['sar:polarizations'],
  }));

const sentinel1CedaPropertySchema = z
  .object({
    datetime: z.custom<NonNullable<TDateString>>(
      (value) => !z.string().datetime({ offset: true }).safeParse(value).error
    ),
    'eo:cloud_cover': z.union([z.number(), z.string().transform((data) => parseFloat(data))]).optional(),
    'grid:code': z.string().optional(),
    'Orbit Direction': z.string().optional(),
    instrument_mode: z.string().optional(),
    Polarisation: z.array(z.string()).optional(),
    cloud_cover: z.never().optional(),
    cloud_percent: z.never().optional(),
    cloudCoverage: z.never().optional(),
    gridCode: z.never().optional(),
    orbitState: z.never().optional(),
    instrumentMode: z.never().optional(),
    polarizations: z.never().optional(),
  })
  .transform((data) => ({
    datetime: data.datetime,
    cloudCoverage: data['eo:cloud_cover'],
    gridCode: data['grid:code'],
    orbitState: data['Orbit Direction'],
    instrumentMode: data.instrument_mode,
    polarizations: data.Polarisation,
  }));

const skySatPropertySchema = z
  .object({
    datetime: z.custom<NonNullable<TDateString>>(
      (value) => !z.string().datetime({ offset: true }).safeParse(value).error
    ),
    cloud_percent: z.number(),
    cloudCoverage: z.never().optional(),
    gridCode: z.never().optional(),
    orbitState: z.never().optional(),
    instrumentMode: z.never().optional(),
    polarizations: z.never().optional(),
  })
  .transform((data) => ({
    datetime: data.datetime,
    cloudCoverage: data.cloud_percent,
    gridCode: undefined,
  }));

const rapidEyePropertySchema = z
  .object({
    datetime: z.custom<NonNullable<TDateString>>(
      (value) => !z.string().datetime({ offset: true }).safeParse(value).error
    ),
    cloud_cover: z.number().transform((value) => value * 100),
    cloudCoverage: z.never().optional(),
    gridCode: z.never().optional(),
    orbitState: z.never().optional(),
    instrumentMode: z.never().optional(),
    polarizations: z.never().optional(),
  })
  .transform((data) => ({
    datetime: data.datetime,
    cloudCoverage: data.cloud_cover,
    gridCode: undefined,
  }));

const planetScopePropertySchema = z
  .object({
    datetime: z.custom<NonNullable<TDateString>>(
      (value) => !z.string().datetime({ offset: true }).safeParse(value).error
    ),
    cloud_percent: z.number(),
    cloudCoverage: z.never().optional(),
    gridCode: z.never().optional(),
    orbitState: z.never().optional(),
    instrumentMode: z.never().optional(),
    polarizations: z.never().optional(),
  })
  .transform((data) => ({
    datetime: data.datetime,
    cloudCoverage: data.cloud_percent,
    gridCode: undefined,
  }));

export const featureSearchSchema = featureGenericSchema.extend({
  properties: z.union([
    propertySchema,
    sentinel1Element84PropertySchema,
    sentinel1CedaPropertySchema,
    skySatPropertySchema,
    rapidEyePropertySchema,
    planetScopePropertySchema,
  ]),
  assets: z.object({
    thumbnail: thumbnailAssetSchema.optional(),
    cog: assetSchema.optional(),
    visual: assetSchema.optional(),
  }),
});
