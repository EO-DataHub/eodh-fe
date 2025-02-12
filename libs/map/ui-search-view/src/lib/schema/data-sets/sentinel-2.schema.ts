import { RefinementCtx, z } from 'zod';

const notDisplayedErrorMessage = '';

const addCustomIssue = (ctx: RefinementCtx, path: string, message: string) => {
  ctx.addIssue({
    code: z.ZodIssueCode.custom,
    message,
    path: [path],
  });
};

const addCustomIssues = (ctx: RefinementCtx, paths: string[], message: string) => {
  paths.forEach((path) => {
    addCustomIssue(ctx, path, message);
  });
};

export const sentinel2Schema = z.object({
  enabled: z.boolean(),
  l1c: z.boolean(),
  l2a: z.boolean(),
  l2aARD: z.boolean(),
  cloudCoverage: z.number().min(0).max(100),
});

export const sentinel2SearchRefine = (schema: z.infer<typeof sentinel2Schema>, ctx: z.RefinementCtx) => {
  if (!schema.enabled) {
    return;
  }

  if (!schema.l1c && !schema.l2a && !schema.l2aARD) {
    addCustomIssues(ctx, ['l2a', 'l2aARD'], notDisplayedErrorMessage);
    addCustomIssue(ctx, 'l1c', 'MAP.SEARCH_VIEW.VALIDATION.ONE_OF_FIELDS_REQUIRED');
  }
};

export const sentinel2ActionCreatorRefine = (schema: z.infer<typeof sentinel2Schema>, ctx: z.RefinementCtx) => {
  if (!schema.enabled) {
    return;
  }

  if (schema.l1c && schema.l2a && !schema.l2aARD) {
    addCustomIssues(ctx, ['enabled', 'l2a'], notDisplayedErrorMessage);
    addCustomIssue(ctx, 'l1c', 'MAP.SEARCH_VIEW.VALIDATION.ONLY_ONE_FIELD_IS_REQUIRED');
  } else if (schema.l1c && !schema.l2a && schema.l2aARD) {
    addCustomIssues(ctx, ['enabled', 'l2aARD'], notDisplayedErrorMessage);
    addCustomIssue(ctx, 'l1c', 'MAP.SEARCH_VIEW.VALIDATION.ONLY_ONE_FIELD_IS_REQUIRED');
  } else if (!schema.l1c && schema.l2a && schema.l2aARD) {
    addCustomIssues(ctx, ['enabled', 'l2aARD'], notDisplayedErrorMessage);
    addCustomIssue(ctx, 'l2a', 'MAP.SEARCH_VIEW.VALIDATION.ONLY_ONE_FIELD_IS_REQUIRED');
  } else if (schema.l1c && schema.l2a && schema.l2aARD) {
    addCustomIssues(ctx, ['enabled', 'l2a', 'l2aARD'], notDisplayedErrorMessage);
    addCustomIssue(ctx, 'l1c', 'MAP.SEARCH_VIEW.VALIDATION.ONLY_ONE_FIELD_IS_REQUIRED');
  } else if (!schema.l1c && !schema.l2a && !schema.l2aARD) {
    addCustomIssues(ctx, ['enabled', 'l2a', 'l2aARD'], notDisplayedErrorMessage);
    addCustomIssue(ctx, 'l1c', 'MAP.SEARCH_VIEW.VALIDATION.ONE_OF_FIELDS_REQUIRED');
  }
};
