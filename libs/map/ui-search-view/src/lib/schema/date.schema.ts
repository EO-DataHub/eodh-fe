import { createDate, TDateString } from '@ukri/shared/utils/date';
import { z } from 'zod';

export const dateInitialSchema = z.object({
  from: z
    .custom<TDateString>((value) => !z.string().date().safeParse(value).error, {
      message: 'MAP.SEARCH_VIEW.VALIDATION.NO_DATE_SELECTED',
    })
    .nullable(),
  to: z
    .custom<TDateString>((value) => !z.string().date().safeParse(value).error, {
      message: 'MAP.SEARCH_VIEW.VALIDATION.NO_DATE_SELECTED',
    })
    .nullable(),
});

export const dateUpdateSchema = z
  .object({
    from: z.custom<NonNullable<TDateString>>((value) => !z.string().date().safeParse(value).error, {
      message: 'MAP.SEARCH_VIEW.VALIDATION.NO_DATE_SELECTED',
    }),
    to: z.custom<NonNullable<TDateString>>((value) => !z.string().date().safeParse(value).error, {
      message: 'MAP.SEARCH_VIEW.VALIDATION.NO_DATE_SELECTED',
    }),
  })
  .superRefine((schema, ctx) => {
    const dateFrom = createDate(schema.from);
    const dateTo = createDate(schema.to);
    const isLaterThanToday = z.date().max(new Date());

    if (dateFrom) {
      const checkDateTo = z.date().min(dateFrom);

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
