import type { Entries } from 'type-fest';

import {
  TCatalogSearchParams,
  TCopernicusParams,
  TFilterParam,
  TSearchParams,
  TWorkflowSearchParams,
} from '../../query.model';
import { createCopernicusParams } from './copernicus/copernicus.filter-params';

const isWorkflow = (params: TSearchParams): params is TWorkflowSearchParams => !!params.userWorkspace && !!params.jobId;

const isCatalogue = (params: TSearchParams): params is TCatalogSearchParams => !!params.dataSets;

export const createDataFilterParams = (params: TSearchParams): TFilterParam | null => {
  let filterParams: TFilterParam[] = [];

  if (isWorkflow(params)) {
    return null;
  }

  if (isCatalogue(params)) {
    const catalogueParams = (
      Object.entries(params.dataSets.public.copernicus) as Entries<typeof params.dataSets.public.copernicus>
    )
      .map(
        ([key, { enabled, ...rest }]) =>
          ({
            type: key,
            enabled: enabled,
            options: rest,
          } as TCopernicusParams)
      )
      .map((param) => createCopernicusParams(param, params.collection))
      .flat();

    filterParams = [...filterParams, ...catalogueParams];
  }

  if (filterParams.length > 1) {
    return {
      op: 'or',
      args: filterParams,
    };
  }

  return filterParams.pop() || null;
};
