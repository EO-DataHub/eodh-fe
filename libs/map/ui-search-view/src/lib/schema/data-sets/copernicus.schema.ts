import { z } from 'zod';

import { sentinel1Refine, sentinel1Schema } from './sentinel-1.schema';
import { sentinel2ActionCreatorRefine, sentinel2Schema, sentinel2SearchRefine } from './sentinel-2.schema';
import { sentinel3Refine, sentinel3Schema } from './sentinel-3.schema';
import { sentinel5pRefine, sentinel5pSchema } from './sentinel-5p.schema';

const notDisplayedErrorMessage = '';

export const copernicusInitialSearchSchema = z.object({
  enabled: z.boolean().optional(),
  expanded: z.boolean(),
  sentinel1: sentinel1Schema
    .extend({
      expanded: z.boolean(),
      enabled: z.boolean(),
    })
    .optional(),
  sentinel2: sentinel2Schema
    .extend({
      expanded: z.boolean(),
      enabled: z.boolean(),
    })
    .optional(),
  sentinel3: sentinel3Schema
    .extend({
      expanded: z.boolean(),
      enabled: z.boolean(),
    })
    .optional(),
  sentinel5P: sentinel5pSchema
    .extend({
      expanded: z.boolean(),
      enabled: z.boolean(),
    })
    .optional(),
});

export const copernicusInitialUpdateSchema = z.object({
  expanded: z.boolean(),
  sentinel1: sentinel1Schema
    .extend({
      expanded: z.boolean(),
      enabled: z.boolean(),
    })
    .optional(),
  sentinel2: sentinel2Schema
    .extend({
      expanded: z.boolean(),
      enabled: z.boolean(),
    })
    .optional(),
  sentinel3: sentinel3Schema
    .extend({
      expanded: z.boolean(),
      enabled: z.boolean(),
    })
    .optional(),
  sentinel5P: sentinel5pSchema
    .extend({
      expanded: z.boolean(),
      enabled: z.boolean(),
    })
    .optional(),
});
export const copernicusUpdateSearchSchema = z.object({
  sentinel1: sentinel1Schema.superRefine(sentinel1Refine),
  sentinel2: sentinel2Schema.superRefine(sentinel2SearchRefine),
  sentinel3: sentinel3Schema.superRefine(sentinel3Refine),
  sentinel5P: sentinel5pSchema.superRefine(sentinel5pRefine),
});

export const copernicusUpdateActionCreatorSchema = z.object({
  sentinel1: sentinel1Schema.superRefine(sentinel1Refine),
  sentinel2: sentinel2Schema.superRefine(sentinel2ActionCreatorRefine),
  sentinel3: sentinel3Schema.superRefine(sentinel3Refine),
  sentinel5P: sentinel5pSchema.superRefine(sentinel5pRefine),
});

export const copernicusUpdateSchema = copernicusUpdateSearchSchema.superRefine((schema, ctx) => {
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
