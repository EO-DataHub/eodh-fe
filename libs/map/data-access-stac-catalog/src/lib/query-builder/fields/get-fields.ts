import type { Entries } from 'type-fest';

import { TCatalogSearchParams, TCopernicusParams, TFields } from '../query.model';
import { getFieldsForCopernicus } from './copernicus/copernicus.field';

export const getFields = (params: TCatalogSearchParams): TFields => {
  const copernicusFields = (Object.entries(params.dataSets.copernicus) as Entries<typeof params.dataSets.copernicus>)
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

  return copernicusFields.reduce(
    (acc, val) => ({
      include: [...new Set(val.include || []), ...new Set(acc.include || [])],
      exclude: [...new Set(val.exclude || []), ...new Set(acc.exclude || [])],
    }),
    {}
  );
};
