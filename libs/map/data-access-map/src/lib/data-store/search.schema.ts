import { createDate, TDateString } from '@ukri/shared/utils/date';
import isObject from 'lodash/isObject';
import Geometry from 'ol/geom/Geometry';
import { z } from 'zod';

const notDisplayedErrorMessage = '';

const dataSetsSchema = z.object({
  copernicus: z
    .object({
      sentinel1: z
        .object({
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
        })
        .superRefine((schema, ctx) => {
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
        }),
      sentinel2: z
        .object({
          enabled: z.boolean(),
          l1c: z.boolean(),
          l2a: z.boolean(),
          cloudCoverage: z.number().min(0).max(100),
        })
        .superRefine((schema, ctx) => {
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
        }),
      sentinel3: z
        .object({
          enabled: z.boolean(),
          slstr: z.boolean(),
          cloudCoverage: z.number().min(0).max(100),
          olci: z.boolean(),
        })
        .superRefine((schema, ctx) => {
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
        }),
      sentinel5P: z
        .object({
          enabled: z.boolean(),
          aer_ai: z.boolean(),
          ch4: z.boolean(),
          cloud: z.boolean(),
          co: z.boolean(),
          hcho: z.boolean(),
          no2: z.boolean(),
          o3: z.boolean(),
          so2: z.boolean(),
        })
        .superRefine((schema, ctx) => {
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
        }),
    })
    .superRefine((schema, ctx) => {
      if (
        !schema.sentinel1.enabled &&
        !schema.sentinel2.enabled &&
        !schema.sentinel3.enabled &&
        !schema.sentinel5P.enabled
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'MAP.SEARCH_VIEW.VALIDATION.ONE_OF_FIELDS_REQUIRED',
          path: ['sentinel1.enabled'],
        });

        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: notDisplayedErrorMessage,
          path: ['sentinel2.enabled'],
        });

        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: notDisplayedErrorMessage,
          path: ['sentinel3.enabled'],
        });

        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: notDisplayedErrorMessage,
          path: ['sentinel5P.enabled'],
        });
      }
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
const dateSchama = z
  .object({
    from: z.custom<NonNullable<TDateString>>((value) => !z.string().date().safeParse(value).error),
    to: z.custom<NonNullable<TDateString>>((value) => !z.string().date().safeParse(value).error),
  })
  .superRefine((schema, ctx) => {
    const dateFrom = createDate(schema.from);
    const dateTo = createDate(schema.to);

    if (dateFrom) {
      const checkDateTo = z.date().min(dateFrom);

      if (checkDateTo.safeParse(dateTo).error) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'MAP.SEARCH_VIEW.VALIDATION.DATE_TO_SHOULD_BE_LATER_THAN_DATE_TO',
          path: ['to'],
        });
      }
    } else {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'GLOBAL.ERRORS.VALIDATION.INVALID_DATE',
        path: ['from'],
      });
    }

    if (dateTo) {
      const checkDateFrom = z.date().max(dateTo);

      if (checkDateFrom.safeParse(dateFrom).error) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'MAP.SEARCH_VIEW.VALIDATION.DATE_FROM_SHOULD_BE_EARLIER_THAN_DATE_TO',
          path: ['from'],
        });
      }
    } else {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'GLOBAL.ERRORS.VALIDATION.INVALID_DATE',
        path: ['to'],
      });
    }
  });

const aoiSchema = z.custom<Geometry>((value) => isObject(value));

export const searchSchema = z.object({
  dataSets: dataSetsSchema,
  date: dateSchama,
  aoi: aoiSchema,
});

export type TSearchData = z.infer<typeof searchSchema>;
