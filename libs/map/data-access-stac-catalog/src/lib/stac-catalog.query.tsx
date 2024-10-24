import { useQuery } from '@tanstack/react-query';
import { getHttpClient, TExtractFnReturnType } from '@ukri/shared/utils/react-query';
import { useMemo } from 'react';

import { paths } from './api';
import { TQueryBuilderParams, TQueryParams } from './query-builder/query.builder';
import { TCatalogSearchParams } from './query-builder/query.model';
import { useQueryBuilder } from './query-builder/use-query-builder.hook';
import { queryKey } from './query-key.const';
import { collectionSchema, TCollection } from './stac.model';

const getSearchResults = async (params: TQueryParams): Promise<TCollection> => {
  const response = await getHttpClient().post(paths.STAC_CATALOGUE, params);

  return collectionSchema.parse(response);
};

type TCatalogSearchProps = {
  params?: TCatalogSearchParams;
};

export const useCatalogSearch = ({ params }: TCatalogSearchProps) => {
  const queryBuilderParams: TQueryBuilderParams = useMemo(
    () => ({
      queryParams: params,
      limit: 50,
      sortBy: {
        field: 'properties.datetime',
        direction: 'desc',
      },
    }),
    [params]
  );

  const query = useQueryBuilder(queryBuilderParams);

  return useQuery<TExtractFnReturnType<typeof getSearchResults>>({
    enabled: query.enabled,
    queryKey: queryKey.CATALOG_SEARCH(query.params),
    queryFn: () => getSearchResults(query.params),
  });
};
