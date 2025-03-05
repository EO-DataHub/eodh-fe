import { z } from 'zod';

import { sentinel1Refine, sentinel1Schema } from './sentinel-1.schema';
import { sentinel2ActionCreatorRefine, sentinel2Schema, sentinel2SearchRefine } from './sentinel-2.schema';
import { sentinel3Refine, sentinel3Schema } from './sentinel-3.schema';
import { sentinel5pRefine, sentinel5pSchema } from './sentinel-5p.schema';

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
export const copernicusUpdateSchema = z.object({
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
