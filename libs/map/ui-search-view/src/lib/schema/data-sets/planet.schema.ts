import { z } from 'zod';

export const planetInitialSchema = z.object({
  enabled: z.boolean().optional(),
  expanded: z.boolean().optional(),
  planetScope: z
    .object({
      enabled: z.boolean().optional(),
    })
    .optional(),
  skySat: z
    .object({
      enabled: z.boolean().optional(),
    })
    .optional(),
  rapidEye: z
    .object({
      enabled: z.boolean().optional(),
    })
    .optional(),
  cloudCoverage: z.number().min(0).max(100).optional(),
});

export const planetUpdateSchema = z.object({
  enabled: z.boolean().optional(),
  expanded: z.boolean().optional(),
  planetScope: z.object({
    enabled: z.boolean(),
  }),
  skySat: z.object({
    enabled: z.boolean(),
  }),
  rapidEye: z.object({
    enabled: z.boolean(),
  }),
  cloudCoverage: z.number().min(0).max(100).optional(),
});
