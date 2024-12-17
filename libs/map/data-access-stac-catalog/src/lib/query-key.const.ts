import { TQueryParams } from './query-builder/query.builder';

const QUERY_KEY = {
  CATALOG_SEARCH: 'catalog-search',
  GRAPH_SEARCH: 'graph-search',
};

export const queryKey = {
  CATALOG_SEARCH: (params: TQueryParams) => [QUERY_KEY.CATALOG_SEARCH, params],
  GRAPH_SEARCH: (params: TQueryParams) => [QUERY_KEY.GRAPH_SEARCH, params],
};
