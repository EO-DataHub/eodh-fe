import { RefinementCtx, z } from 'zod';

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
  l2aARD: z.boolean(),
  cloudCoverage: z.number().min(0).max(100),
});

export const sentinel2SearchRefine = (schema: z.infer<typeof sentinel2Schema>, ctx: z.RefinementCtx) => {
  if (!schema.enabled) {
    return;
  }

  if (!schema.l2aARD) {
    addCustomIssues(ctx, ['l2aARD'], 'MAP.SEARCH_VIEW.VALIDATION.ONE_OF_FIELDS_REQUIRED');
  }
};

export const sentinel2ActionCreatorRefine = (schema: z.infer<typeof sentinel2Schema>, ctx: z.RefinementCtx) => {
  if (!schema.enabled) {
    return;
  }

  if (!schema.l2aARD) {
    addCustomIssues(ctx, ['l2aARD'], 'MAP.SEARCH_VIEW.VALIDATION.ONE_OF_FIELDS_REQUIRED');
  }
};
