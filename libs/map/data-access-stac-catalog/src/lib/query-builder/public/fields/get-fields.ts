import type { Entries } from 'type-fest';

import { TCopernicusParams, TFields, TSearchParams } from '../../query.model';
import { getFieldsForCopernicus } from './copernicus/copernicus.field';
import { getDefaultFields } from './copernicus/default.field';

export const getFields = (params: TSearchParams): TFields => {
  if (!params.dataSets?.public.copernicus) {
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

  return [getDefaultFields(), ...copernicusFields].reduce(
    (acc, val) => ({
      include: [...new Set(val.include || []), ...new Set(acc.include || [])],
      exclude: [...new Set(val.exclude || []), ...new Set(acc.exclude || [])],
    }),
    {}
  );
};
