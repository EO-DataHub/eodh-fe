import { createDate, isAfter, isBefore, TDateString } from '@ukri/shared/utils/date';
import isString from 'lodash/isString';
import { z } from 'zod';

export const dateInitialSchema = z.object({
  from: z
    .custom<TDateString>(
      (value) => {
        if (isString(value) && !value.length) {
          return true;
        }
        return !z.string().date().safeParse(value).error;
      },
      {
        message: 'MAP.SEARCH_VIEW.VALIDATION.NO_DATE_SELECTED',
      }
    )
    .transform((value) => (isString(value) && !value.length ? null : value))
    .nullable(),
  to: z
    .custom<TDateString>(
      (value) => {
        if (isString(value) && !value.length) {
          return true;
        }
        return !z.string().date().safeParse(value).error;
      },
      {
        message: 'MAP.SEARCH_VIEW.VALIDATION.NO_DATE_SELECTED',
      }
    )
    .transform((value) => (isString(value) && !value.length ? null : value))
    .nullable(),
  min: z.custom<TDateString>((value) => !z.string().datetime().optional().safeParse(value).error).optional(),
  max: z.custom<TDateString>((value) => !z.string().datetime().optional().safeParse(value).error).optional(),
});

export const dateUpdateSchema = z
  .object({
    from: z.custom<NonNullable<TDateString>>((value) => !z.string().date().safeParse(value).error, {
      message: 'MAP.SEARCH_VIEW.VALIDATION.NO_DATE_SELECTED',
    }),
    to: z.custom<NonNullable<TDateString>>((value) => !z.string().date().safeParse(value).error, {
      message: 'MAP.SEARCH_VIEW.VALIDATION.NO_DATE_SELECTED',
    }),
    min: z.custom<TDateString>((value) => !z.string().datetime().optional().safeParse(value).error).optional(),
    max: z.custom<TDateString>((value) => !z.string().datetime().optional().safeParse(value).error).optional(),
  })
  .superRefine((schema, ctx) => {
    const dateFrom = schema.from ? createDate(schema.from) : undefined;
    const dateTo = schema.to ? createDate(schema.to) : undefined;
    const isLaterThanToday = z.date().max(new Date());

    if (dateFrom) {
      const checkDateTo = z.date().min(dateFrom);

      if (isBefore(schema.from, schema.min)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'MAP.SEARCH_VIEW.VALIDATION.DATE_FROM_SHOULD_BE_AFTER_MIN',
          path: ['from'],
        });
      }

      if (isAfter(schema.from, schema.max)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'MAP.SEARCH_VIEW.VALIDATION.DATE_FROM_SHOULD_BE_BEFORE_MAX',
          path: ['from'],
        });
      }

      if (isLaterThanToday.safeParse(dateFrom).error) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'MAP.SEARCH_VIEW.VALIDATION.DATE_SHOULD_BE_EARLIER_THAN_TODAY',
          path: ['from'],
        });
      }

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
      const checkDateTo = z.date().max(dateTo);

      if (isBefore(schema.to, schema.min)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'MAP.SEARCH_VIEW.VALIDATION.DATE_TO_SHOULD_BE_AFTER_MIN',
          path: ['to'],
        });
      }

      if (isAfter(schema.to, schema.max)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'MAP.SEARCH_VIEW.VALIDATION.DATE_TO_SHOULD_BE_BEFORE_MAX',
          path: ['to'],
        });
      }

      if (isLaterThanToday.safeParse(dateTo).error) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'MAP.SEARCH_VIEW.VALIDATION.DATE_SHOULD_BE_EARLIER_THAN_TODAY',
          path: ['to'],
        });
      }

      if (checkDateTo.safeParse(dateFrom).error) {
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
