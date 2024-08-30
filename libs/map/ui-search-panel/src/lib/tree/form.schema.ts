import { z } from 'zod';

const notDisplayedErrorMessage = '';

export const validationSchema = z.object({
  copernicus: z.object({
    sentinel1: z.object({
      enabled: z.boolean(),
      acquisitionMode: z
        .object({
          ew: z.boolean(),
          hh: z.boolean(),
          hh_hv: z.boolean(),
          iw: z.boolean(),
          vv: z.boolean(),
          vv_vh: z.boolean(),
        })
        .superRefine((schema, ctx) => {
          if (!schema.ew && !schema.iw) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'MAP.SEARCH_PANEL.VALIDATION.ONE_OF_FIELDS_REQUIRED',
              path: ['ew'],
            });

            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: notDisplayedErrorMessage,
              path: ['iw'],
            });
          }

          if (schema.ew && !schema.hh && !schema.hh_hv) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'MAP.SEARCH_PANEL.VALIDATION.ONE_OF_FIELDS_REQUIRED',
              path: ['hh'],
            });

            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: notDisplayedErrorMessage,
              path: ['hh_hv'],
            });
          }

          if (schema.iw && !schema.vv && !schema.vv_vh) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'MAP.SEARCH_PANEL.VALIDATION.ONE_OF_FIELDS_REQUIRED',
              path: ['vv'],
            });

            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: notDisplayedErrorMessage,
              path: ['vv_vh'],
            });
          }
        }),
      orbitDirection: z
        .object({
          ascending: z.boolean(),
          descending: z.boolean(),
        })
        .superRefine((schema, ctx) => {
          if (!schema.ascending && !schema.descending) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'MAP.SEARCH_PANEL.VALIDATION.ONE_OF_FIELDS_REQUIRED',
              path: ['ascending'],
            });

            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: notDisplayedErrorMessage,
              path: ['descending'],
            });
          }
        }),
    }),
    sentinel2: z.object({
      enabled: z.boolean(),
      l1c: z.boolean(),
      l2a: z.boolean(),
      cloudCoverage: z.number().min(0).max(100),
    }),
    sentinel3: z.object({
      enabled: z.boolean(),
      slstr: z.boolean(),
      cloudCoverage: z.number().min(0).max(100),
      olci: z.boolean(),
    }),
    sentinel5: z.object({
      enabled: z.boolean(),
      aer_ai: z.boolean(),
      ch4: z.boolean(),
      cloud: z.boolean(),
      co: z.boolean(),
      hcho: z.boolean(),
      no2: z.boolean(),
      o3: z.boolean(),
      so2: z.boolean(),
    }),
  }),
  planet: z.object({
    enabled: z.boolean(),
    planetScope: z.object({
      enabled: z.boolean(),
    }),
    skySat: z.object({
      enabled: z.boolean(),
    }),
    rapidEye: z.object({
      enabled: z.boolean(),
    }),
  }),
});
