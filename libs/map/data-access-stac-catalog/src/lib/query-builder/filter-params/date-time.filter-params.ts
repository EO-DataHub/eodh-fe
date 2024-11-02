import { createIsoStringDate } from '@ukri/shared/utils/date';

import { TFilterParam, TSearchParams } from '../query.model';

export const createDateTimeFilterParams = (params: TSearchParams): TFilterParam | object => {
  if (!params.date?.from || !params.date.to) {
    return {};
  }

  return {
    op: 'between',
    args: [
      { property: 'properties.datetime' },
      createIsoStringDate(params.date.from),
      createIsoStringDate(params.date.to),
    ],
  };
};
