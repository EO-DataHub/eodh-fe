import { z } from 'zod';

const notDisplayedErrorMessage = '';

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
      cloudCoverage: z.number().min(0).max(100).optional(),
    })
    .optional(),
});

export const planetUpdateSchema = z
  .object({
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
  })
  .superRefine((schema, ctx: z.RefinementCtx) => {
    if (!schema.enabled) {
      return;
    }

    if (!schema.planetScope.enabled && !schema.skySat.enabled && !schema.rapidEye.enabled) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'MAP.SEARCH_VIEW.VALIDATION.ONE_OF_FIELDS_REQUIRED',
        path: ['planetScope', 'enabled'],
      });

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: notDisplayedErrorMessage,
        path: ['skySat', 'enabled'],
      });

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: notDisplayedErrorMessage,
        path: ['rapidEye', 'enabled'],
      });
    }
  });
