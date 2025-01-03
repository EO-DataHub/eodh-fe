import { TQueryParams } from './query-builder/query.builder';

const QUERY_KEY = {
  CATALOG_SEARCH: 'catalog-search',
};

export const queryKey = {
  CATALOG_SEARCH: (params: TQueryParams) => [QUERY_KEY.CATALOG_SEARCH, params],
};
