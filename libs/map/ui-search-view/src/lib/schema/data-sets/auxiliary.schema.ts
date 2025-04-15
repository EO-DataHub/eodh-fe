import { z } from 'zod';

export const auxiliaryInitialSchema = z.object({
  expanded: z.boolean().optional(),
  esacciGloballc: z
    .object({
      enabled: z.boolean().optional(),
      expanded: z.boolean().optional(),
    })
    .optional(),
});

export const auxiliaryUpdateGenericSchema = z.object({
  esacciGloballc: z.object({
    enabled: z.boolean().optional(),
    expanded: z.boolean().optional(),
  }),
});
