import { TFilterParam, TSearchParams } from '../query.model';
import { createDataFilterParams } from './data.filter-params';
import { createDateTimeFilterParams } from './date-time.filter-params';

export const createFilterParams = (params: TSearchParams): TFilterParam | object => {
  const filterParams: TFilterParam[] = [createDataFilterParams(params), createDateTimeFilterParams(params)].filter(
    (item): item is TFilterParam => !!item
  );

  if (filterParams.length > 1) {
    return {
      op: 'and',
      args: filterParams,
    };
  }

  return filterParams.pop() || {};
};
