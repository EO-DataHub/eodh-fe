import { TFilterParam, TSearchParams } from '../query.model';
import { createDataFilterParams } from './data.filter-params';
import { createDateTimeFilterParams } from './date-time.filter-params';

export const createFilterParams = (
  params: TSearchParams,
  type: 'data' | 'dateTime' | 'dataAndDateTime' = 'dataAndDateTime'
): TFilterParam | object => {
  const filterParams: TFilterParam[] = [];

  switch (type) {
    case 'data': {
      const data = createDataFilterParams(params);

      if (data) {
        filterParams.push(data);
      }

      break;
    }

    case 'dateTime': {
      const dateTime = createDateTimeFilterParams(params);

      if (dateTime) {
        filterParams.push(dateTime);
      }

      break;
    }

    case 'dataAndDateTime': {
      const data = createDataFilterParams(params);
      const dateTime = createDateTimeFilterParams(params);

      if (dateTime) {
        filterParams.push(dateTime);
      }

      if (data) {
        filterParams.push(data);
      }

      break;
    }
  }

  if (filterParams.length > 1) {
    return {
      op: 'and',
      args: filterParams,
    };
  }

  return filterParams.pop() || {};
};
