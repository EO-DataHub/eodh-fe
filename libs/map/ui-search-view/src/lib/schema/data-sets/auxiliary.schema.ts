import { z } from 'zod';

const notDisplayedErrorMessage = '';

export const auxiliaryInitialSchema = z.object({
  expanded: z.boolean(),
  esacciGloballc: z
    .object({
      enabled: z.boolean(),
    })
    .optional(),
  clmsCorinelc: z
    .object({
      enabled: z.boolean(),
    })
    .optional(),
  clmsWaterBodies: z
    .object({
      enabled: z.boolean(),
    })
    .optional(),
});

export const auxiliaryUpdateSchema = z
  .object({
    esacciGloballc: z.object({
      enabled: z.boolean(),
    }),
    clmsCorinelc: z.object({
      enabled: z.boolean(),
    }),
    clmsWaterBodies: z.object({
      enabled: z.boolean(),
    }),
  })
  .superRefine((schema, ctx) => {
    if (!schema.esacciGloballc.enabled && !schema.clmsCorinelc.enabled && !schema.clmsWaterBodies.enabled) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'MAP.SEARCH_VIEW.VALIDATION.ONE_OF_FIELDS_REQUIRED',
        path: ['esacciGloballc.enabled'],
      });

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: notDisplayedErrorMessage,
        path: ['clmsCorinelc.enabled'],
      });

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: notDisplayedErrorMessage,
        path: ['clmsWaterBodies.enabled'],
      });
    }
  });
