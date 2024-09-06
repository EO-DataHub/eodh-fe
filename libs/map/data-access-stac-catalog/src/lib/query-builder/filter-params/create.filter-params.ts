import { TCatalogSearchParams, TFilterParam } from '../query.model';
import { createDataFilterParams } from './data.filter-params';
import { createDateTimeFilterParams } from './date-time.filter-params';

export const createFilterParams = (params: TCatalogSearchParams): TFilterParam | object => {
  const filterParams = [createDataFilterParams(params), createDateTimeFilterParams(params)];

  if (filterParams.length > 1) {
    return {
      op: 'and',
      args: filterParams,
    };
  }

  return filterParams.pop() || {};
};
