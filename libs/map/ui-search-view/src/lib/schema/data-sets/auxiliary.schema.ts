import { z } from 'zod';

export const auxiliaryInitialSchema = z.object({
  expanded: z.boolean().optional(),
  esacciGloballc: z
    .object({
      enabled: z.boolean(),
      expanded: z.boolean().optional(),
    })
    .optional(),
  clmsCorinelc: z
    .object({
      enabled: z.boolean(),
      expanded: z.boolean().optional(),
    })
    .optional(),
  clmsWaterBodies: z
    .object({
      enabled: z.boolean(),
      expanded: z.boolean().optional(),
    })
    .optional(),
});

export const auxiliaryUpdateGenericSchema = z.object({
  esacciGloballc: z.object({
    enabled: z.boolean(),
    expanded: z.boolean().optional(),
  }),
  clmsCorinelc: z.object({
    enabled: z.boolean(),
    expanded: z.boolean().optional(),
  }),
  clmsWaterBodies: z.object({
    enabled: z.boolean(),
    expanded: z.boolean().optional(),
  }),
});
