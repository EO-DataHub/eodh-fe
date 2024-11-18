import { z } from 'zod';

const notDisplayedErrorMessage = '';

export const sentinel2Schema = z.object({
  enabled: z.boolean(),
  l1c: z.boolean(),
  l2a: z.boolean(),
  cloudCoverage: z.number().min(0).max(100),
});

export const sentinel2SearchRefine = (schema: z.infer<typeof sentinel2Schema>, ctx: z.RefinementCtx) => {
  if (!schema.enabled) {
    return;
  }

  if (!schema.l1c && !schema.l2a) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'MAP.SEARCH_VIEW.VALIDATION.ONE_OF_FIELDS_REQUIRED',
      path: ['l1c'],
    });

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: notDisplayedErrorMessage,
      path: ['l2a'],
    });
  }
};

export const sentinel2ActionCreatorRefine = (schema: z.infer<typeof sentinel2Schema>, ctx: z.RefinementCtx) => {
  if (!schema.enabled) {
    return;
  }

  if (schema.l1c && schema.l2a) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: notDisplayedErrorMessage,
      path: ['enabled'],
    });

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'MAP.SEARCH_VIEW.VALIDATION.ONLY_ONE_FIELD_IS_REQUIRED',
      path: ['l1c'],
    });

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: notDisplayedErrorMessage,
      path: ['l2a'],
    });
  }
};
