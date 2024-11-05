import type { Entries } from 'type-fest';

import {
  TCatalogSearchParams,
  TCopernicusParams,
  TFilterParam,
  TSearchParams,
  TWorkflowSearchParams,
} from '../query.model';
import { createCopernicusParams } from './copernicus/copernicus.filter-params';
import { createWorkflowFilterParams } from './wofkflow.filter-params';

const isWorkflow = (params: TSearchParams): params is TWorkflowSearchParams => !!params.userWorkspace && !!params.jobId;

const isCatalogue = (params: TSearchParams): params is TCatalogSearchParams => !!params.dataSets;

export const createDataFilterParams = (params: TSearchParams): TFilterParam | null => {
  let filterParams: TFilterParam[] = [];

  if (isWorkflow(params)) {
    filterParams = [...filterParams, ...createWorkflowFilterParams(params.jobId)];
  } else if (isCatalogue(params)) {
    const catalogueParams = (Object.entries(params.dataSets.copernicus) as Entries<typeof params.dataSets.copernicus>)
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
