import { useMemo } from 'react';

import { QueryBuilder, TQueryBuilderOptions, TQueryBuilderParams } from './query.builder';

export const useQueryBuilder = (params: TQueryBuilderParams, options: TQueryBuilderOptions) => {
  return useMemo(() => {
    return new QueryBuilder(params, options).build();
  }, [params, options]);
};
