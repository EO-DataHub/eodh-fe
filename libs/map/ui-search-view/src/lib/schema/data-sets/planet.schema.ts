import { z } from 'zod';

const planetScopeSchema = z.object({
  enabled: z.boolean(),
});

const skySatSchema = z.object({
  enabled: z.boolean(),
});

const rapidEyeSchema = z.object({
  enabled: z.boolean(),
});

export const planetSchema = z.object({
  enabled: z.boolean(),
  expanded: z.boolean(),
  planetScope: planetScopeSchema.extend({
    expanded: z.boolean().optional(),
    enabled: z.boolean(),
  }),
  skySat: skySatSchema.extend({
    expanded: z.boolean().optional(),
    enabled: z.boolean(),
  }),
  rapidEye: rapidEyeSchema.extend({
    expanded: z.boolean().optional(),
    enabled: z.boolean(),
  }),
});
