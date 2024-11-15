import { z } from 'zod';

const notDisplayedErrorMessage = '';

export const sentinel3Schema = z.object({
  enabled: z.boolean().optional(),
  slstr: z.boolean(),
  cloudCoverage: z.number().min(0).max(100),
  olci: z.boolean(),
});

export const sentinel3Refine = (schema: z.infer<typeof sentinel3Schema>, ctx: z.RefinementCtx) => {
  if (!schema.enabled) {
    return;
  }

  if (!schema.slstr && !schema.olci) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'MAP.SEARCH_VIEW.VALIDATION.ONE_OF_FIELDS_REQUIRED',
      path: ['slstr'],
    });

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: notDisplayedErrorMessage,
      path: ['olci'],
    });
  }
};
