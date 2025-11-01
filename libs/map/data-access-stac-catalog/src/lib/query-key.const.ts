import { TQuery, TQueryParams } from './query-builder/public/query.builder';

const QUERY_KEY = {
  CATALOG_SEARCH: 'catalog-search',
  CATALOG_INFO: 'catalog-info',
};

export const queryKey = {
  CATALOG_SEARCH: (params: TQueryParams | TQuery[]) => [QUERY_KEY.CATALOG_SEARCH, params],
  CATALOG_INFO: () => [QUERY_KEY.CATALOG_INFO],
};
