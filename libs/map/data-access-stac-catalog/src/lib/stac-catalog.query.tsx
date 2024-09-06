import { useQuery } from '@tanstack/react-query';
import { getHttpClient, TExtractFnReturnType } from '@ukri/shared/utils/react-query';
import { useMemo } from 'react';

import { paths } from './api';
import { TQueryBuilderOptions, TQueryBuilderParams, TQueryParams } from './query-builder/query.builder';
import { TCatalogSearchParams } from './query-builder/query.model';
import { useQueryBuilder } from './query-builder/use-query-builder.hook';
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
  const queryBuilderParams: TQueryBuilderParams = useMemo(
    () => ({
      queryParams: params,
      limit: 10,
      sortBy: {
        field: 'properties.datetime',
        direction: 'desc',
      },
    }),
    [params]
  );

  const queryBuilderOptions: TQueryBuilderOptions = useMemo(
    () => ({
      debug: true,
    }),
    []
  );

  const query = useQueryBuilder(queryBuilderParams, queryBuilderOptions);

  return useQuery<TExtractFnReturnType<typeof search>>({
    enabled: query.enabled,
    queryKey: queryKey.CATALOG_SEARCH(query.params),
    queryFn: () => search(query.params),
  });
};
