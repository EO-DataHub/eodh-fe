import { useQuery } from '@tanstack/react-query';
import { getHttpClient, TExtractFnReturnType } from '@ukri/shared/utils/react-query';

import { paths } from './api';
import { QueryBuilder, TQueryParams, TSortBy } from './query-builder/query.builder';
import { TCatalogSearchParams } from './query-builder/query.model';
import { queryKey } from './query-key.enum';
import { collectionSchema, TCollectionSchema } from './stac.model';

const search = async (params: TQueryParams): Promise<TCollectionSchema> => {
  const response = await getHttpClient().post(paths.STAC_CATALOGUE, params);

  return collectionSchema.parse(response);
};

type TCatalogSearchProps = {
  params?: TCatalogSearchParams;
};

export const useCatalogSearch = ({ params }: TCatalogSearchProps) => {
  const sortBy: TSortBy = {
    field: 'properties.datetime',
    direction: 'desc',
  };
  const limit = 10;
  const query = new QueryBuilder({ sortBy, limit, queryParams: params }, { debug: true }).build();

  return useQuery<TExtractFnReturnType<typeof search>>({
    enabled: query.enabled,
    queryKey: queryKey.CATALOG_SEARCH(query.params),
    queryFn: () => search(query.params),
  });
};
