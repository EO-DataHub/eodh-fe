import { z } from 'zod';

import { sentinel1Refine, sentinel1Schema } from './sentinel-1.schema';
import { sentinel2Refine, sentinel2Schema } from './sentinel-2.schema';
import { sentinel3Refine, sentinel3Schema } from './sentinel-3.schema';
import { sentinel5pRefine, sentinel5pSchema } from './sentinel-5p.schema';

const notDisplayedErrorMessage = '';

export const copernicusInitialSchema = z.object({
  enabled: z.boolean(),
  expanded: z.boolean(),
  sentinel1: sentinel1Schema
    .extend({
      expanded: z.boolean().optional(),
      enabled: z.boolean().optional(),
    })
    .optional(),
  sentinel2: sentinel2Schema
    .extend({
      expanded: z.boolean().optional(),
      enabled: z.boolean().optional(),
    })
    .optional(),
  sentinel3: sentinel3Schema
    .extend({
      expanded: z.boolean().optional(),
      enabled: z.boolean().optional(),
    })
    .optional(),
  sentinel5P: sentinel5pSchema
    .extend({
      expanded: z.boolean().optional(),
      enabled: z.boolean().optional(),
    })
    .optional(),
});

export const copernicusUpdateGenericSchema = z.object({
  sentinel1: sentinel1Schema.superRefine(sentinel1Refine),
  sentinel2: sentinel2Schema.superRefine(sentinel2Refine),
  sentinel3: sentinel3Schema.superRefine(sentinel3Refine),
  sentinel5P: sentinel5pSchema.superRefine(sentinel5pRefine),
});

export const copernicusUpdateSchema = copernicusUpdateGenericSchema.superRefine((schema, ctx) => {
  if (
    !schema.sentinel1.enabled &&
    !schema.sentinel2.enabled &&
    !schema.sentinel3.enabled &&
    !schema.sentinel5P.enabled
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'MAP.SEARCH_VIEW.VALIDATION.ONE_OF_FIELDS_REQUIRED',
      path: ['sentinel1.enabled'],
    });

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: notDisplayedErrorMessage,
      path: ['sentinel2.enabled'],
    });

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: notDisplayedErrorMessage,
      path: ['sentinel3.enabled'],
    });

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: notDisplayedErrorMessage,
      path: ['sentinel5P.enabled'],
    });
  }
});
