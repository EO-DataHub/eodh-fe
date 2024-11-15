import { z } from 'zod';

const notDisplayedErrorMessage = '';

export const sentinel5pSchema = z.object({
  enabled: z.boolean().optional(),
  aer_ai: z.boolean(),
  ch4: z.boolean(),
  cloud: z.boolean(),
  co: z.boolean(),
  hcho: z.boolean(),
  no2: z.boolean(),
  o3: z.boolean(),
  so2: z.boolean(),
});

export const sentinel5pRefine = (schema: z.infer<typeof sentinel5pSchema>, ctx: z.RefinementCtx) => {
  if (!schema.enabled) {
    return;
  }

  if (
    !schema.aer_ai &&
    !schema.ch4 &&
    !schema.cloud &&
    !schema.co &&
    !schema.hcho &&
    !schema.no2 &&
    !schema.o3 &&
    !schema.so2
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'MAP.SEARCH_VIEW.VALIDATION.ONE_OF_FIELDS_REQUIRED',
      path: ['aer_ai'],
    });

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: notDisplayedErrorMessage,
      path: ['ch4'],
    });

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: notDisplayedErrorMessage,
      path: ['cloud'],
    });

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: notDisplayedErrorMessage,
      path: ['co'],
    });

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: notDisplayedErrorMessage,
      path: ['hcho'],
    });

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: notDisplayedErrorMessage,
      path: ['no2'],
    });

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: notDisplayedErrorMessage,
      path: ['o3'],
    });

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: notDisplayedErrorMessage,
      path: ['so2'],
    });
  }
};
