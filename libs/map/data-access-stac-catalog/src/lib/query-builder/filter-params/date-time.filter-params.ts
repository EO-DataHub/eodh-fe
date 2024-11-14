import { createIsoStringDate } from '@ukri/shared/utils/date';

import { TFilterParam, TSearchParams } from '../query.model';

export const createDateTimeFilterParams = (params: TSearchParams): TFilterParam | null => {
  if (!params.date?.from || !params.date.to) {
    return null;
  }

  // console.log('createDateTimeFilterParams', params.date.from, createIsoStringDate(params.date.from), params.date.to, createIsoStringDate(params.date.to));

  return {
    op: 'between',
    args: [
      { property: 'properties.datetime' },
      createIsoStringDate(params.date.from),
      createIsoStringDate(params.date.to),
    ],
  };
};
