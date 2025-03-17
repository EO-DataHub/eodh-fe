import type { Entries } from 'type-fest';

import { TCopernicusParams, TFields, TSearchParams, TWorkflowSearchParams } from '../query.model';
import { getFieldsForCopernicus } from './copernicus/copernicus.field';
import { getDefaultFields } from './copernicus/default.field';
import { getWorkflowDefaultFields } from './workflow.default-field';

const isWorkflow = (params: TSearchParams): params is TWorkflowSearchParams => !!params.userWorkspace && !!params.jobId;

export const getFields = (params: TSearchParams): TFields => {
  if (!params.dataSets?.public.copernicus) {
    if (isWorkflow(params)) {
      return getWorkflowDefaultFields();
    }

    return {};
  }

  const copernicusFields = (
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
    .map((param) => getFieldsForCopernicus(param))
    .flat();

  return [getWorkflowDefaultFields(), getDefaultFields(), ...copernicusFields].reduce(
    (acc, val) => ({
      include: [...new Set(val.include || []), ...new Set(acc.include || [])],
      exclude: [...new Set(val.exclude || []), ...new Set(acc.exclude || [])],
    }),
    {}
  );
};
