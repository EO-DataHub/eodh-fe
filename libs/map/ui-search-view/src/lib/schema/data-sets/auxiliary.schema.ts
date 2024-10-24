import { z } from 'zod';

export const auxiliaryInitialSchema = z.object({
  esacciGloballc: z
    .object({
      enabled: z.boolean(),
      expanded: z.boolean(),
    })
    .optional(),
  clmsCorinelc: z
    .object({
      enabled: z.boolean(),
      expanded: z.boolean(),
    })
    .optional(),
  clmsWaterBodies: z
    .object({
      enabled: z.boolean(),
      expanded: z.boolean(),
    })
    .optional(),
});

export const auxiliaryUpdateGenericSchema = z.object({
  esacciGloballc: z.object({
    enabled: z.boolean(),
    expanded: z.boolean(),
  }),
  clmsCorinelc: z.object({
    enabled: z.boolean(),
    expanded: z.boolean(),
  }),
  clmsWaterBodies: z.object({
    enabled: z.boolean(),
    expanded: z.boolean(),
  }),
});
