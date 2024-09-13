import { createIsoStringDate } from '@ukri/shared/utils/date';

import { TCatalogSearchParams, TFilterParam } from '../query.model';

export const createDateTimeFilterParams = (params: TCatalogSearchParams): TFilterParam => {
  return {
    op: 'between',
    args: [
      { property: 'properties.datetime' },
      createIsoStringDate(params.date.from),
      createIsoStringDate(params.date.to),
    ],
  };
};
