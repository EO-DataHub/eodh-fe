import { z } from 'zod';

const notDisplayedErrorMessage = '';

export const sentinel1Schema = z.object({
  enabled: z.boolean(),
  acquisitionMode: z.object({
    ew: z.boolean(),
    hh: z.boolean(),
    hh_hv: z.boolean(),
    iw: z.boolean(),
    vv: z.boolean(),
    vv_vh: z.boolean(),
  }),
  orbitDirection: z.object({
    ascending: z.boolean(),
    descending: z.boolean(),
  }),
});

export const sentinel1Refine = (schema: z.infer<typeof sentinel1Schema>, ctx: z.RefinementCtx) => {
  const acquisitionMode = schema.acquisitionMode;
  const orbitDirection = schema.orbitDirection;

  if (!schema.enabled) {
    return;
  }

  if (!acquisitionMode.ew && !acquisitionMode.iw) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'MAP.SEARCH_VIEW.VALIDATION.ONE_OF_FIELDS_REQUIRED',
      path: ['acquisitionMode', 'ew'],
    });

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: notDisplayedErrorMessage,
      path: ['acquisitionMode', 'iw'],
    });
  }

  if (acquisitionMode.ew && !acquisitionMode.hh && !acquisitionMode.hh_hv) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'MAP.SEARCH_VIEW.VALIDATION.ONE_OF_FIELDS_REQUIRED',
      path: ['acquisitionMode', 'hh'],
    });

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: notDisplayedErrorMessage,
      path: ['acquisitionMode', 'hh_hv'],
    });
  }

  if (acquisitionMode.iw && !acquisitionMode.vv && !acquisitionMode.vv_vh) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'MAP.SEARCH_VIEW.VALIDATION.ONE_OF_FIELDS_REQUIRED',
      path: ['acquisitionMode', 'vv'],
    });

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: notDisplayedErrorMessage,
      path: ['acquisitionMode', 'vv_vh'],
    });
  }

  if (!orbitDirection.ascending && !orbitDirection.descending) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'MAP.SEARCH_VIEW.VALIDATION.ONE_OF_FIELDS_REQUIRED',
      path: ['orbitDirection', 'ascending'],
    });

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: notDisplayedErrorMessage,
      path: ['orbitDirection', 'descending'],
    });
  }
};
