import { createDate, createDateString, createIsoStringDate } from '@ukri/shared/utils/date';

import { TFilterParam, TSearchParams } from '../query.model';

export const createDateTimeFilterParams = (params: TSearchParams): TFilterParam | null => {
  if (!params.date?.from || !params.date.to) {
    return null;
  }

  const dateFrom = createDate(params.date.from);
  const dateTo = createDate(params.date.to);

  if (!dateFrom || !dateTo) {
    return null;
  }

  dateFrom.setUTCHours(0, 0, 0, 0);
  dateTo.setUTCHours(23, 59, 59, 999);

  return {
    op: 'between',
    args: [
      { property: 'properties.datetime' },
      createIsoStringDate(createDateString(dateFrom)),
      createIsoStringDate(createDateString(dateTo)),
    ],
  };
};
