import { z } from 'zod';

const notDisplayedErrorMessage = '';

export const sentinel2Schema = z.object({
  enabled: z.boolean(),
  l1c: z.boolean().optional(),
  l2a: z.boolean().optional(),
  l2aARD: z.boolean().optional(),
  cloudCoverage: z.number().min(0).max(100),
});

export const sentinel2SearchRefine = (schema: z.infer<typeof sentinel2Schema>, ctx: z.RefinementCtx) => {
  if (!schema.enabled) {
    return;
  }

  if (!schema.l1c && !schema.l2a && !schema.l2aARD) {
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

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: notDisplayedErrorMessage,
      path: ['l2aARD'],
    });
  }
};

export const sentinel2ActionCreatorRefine = (schema: z.infer<typeof sentinel2Schema>, ctx: z.RefinementCtx) => {
  if (!schema.enabled) {
    return;
  }

  if (schema.l1c && schema.l2a && !schema.l2aARD) {
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
  } else if (schema.l1c && !schema.l2a && schema.l2aARD) {
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
      path: ['l2aARD'],
    });
  } else if (!schema.l1c && schema.l2a && schema.l2aARD) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: notDisplayedErrorMessage,
      path: ['enabled'],
    });

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'MAP.SEARCH_VIEW.VALIDATION.ONLY_ONE_FIELD_IS_REQUIRED',
      path: ['l2a'],
    });

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: notDisplayedErrorMessage,
      path: ['l2aARD'],
    });
  } else if (schema.l1c && schema.l2a && schema.l2aARD) {
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

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: notDisplayedErrorMessage,
      path: ['l2aARD'],
    });
  } else if (!schema.l1c && !schema.l2a && !schema.l2aARD) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: notDisplayedErrorMessage,
      path: ['enabled'],
    });

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

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: notDisplayedErrorMessage,
      path: ['l2aARD'],
    });
  }
};
