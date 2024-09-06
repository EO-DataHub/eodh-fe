import type { Entries } from 'type-fest';

import { TCatalogSearchParams, TCopernicusParams, TFilterParam } from '../query.model';
import { createCopernicusParams } from './copernicus/copernicus.filter-params';

export const createDataFilterParams = (params: TCatalogSearchParams): TFilterParam | object => {
  const filterParams = (Object.entries(params.dataSets.copernicus) as Entries<typeof params.dataSets.copernicus>)
    .map(
      ([key, { enabled, ...rest }]) =>
        ({
          type: key,
          enabled: enabled,
          options: rest,
        } as TCopernicusParams)
    )
    .map((param) => createCopernicusParams(param))
    .flat();

  if (filterParams.length > 1) {
    return {
      op: 'or',
      args: filterParams,
    };
  }

  return filterParams.pop() || {};
};
