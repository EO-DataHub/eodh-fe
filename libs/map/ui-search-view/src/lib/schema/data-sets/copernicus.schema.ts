import { z } from 'zod';

import { sentinel1Refine, sentinel1Schema } from './sentinel-1.schema';
import { sentinel2ActionCreatorRefine, sentinel2Schema, sentinel2SearchRefine } from './sentinel-2.schema';

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
});
export const copernicusUpdateSchema = z.object({
  sentinel1: sentinel1Schema.superRefine(sentinel1Refine),
  sentinel2: sentinel2Schema.superRefine(sentinel2SearchRefine),
});

export const copernicusUpdateActionCreatorSchema = z.object({
  sentinel1: sentinel1Schema.superRefine(sentinel1Refine),
  sentinel2: sentinel2Schema.superRefine(sentinel2ActionCreatorRefine),
});
