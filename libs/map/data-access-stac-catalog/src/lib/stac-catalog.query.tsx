import { useQuery } from '@tanstack/react-query';
import { getHttpClient } from '@ukri/shared/utils/react-query';
import { useMemo } from 'react';

import { paths } from './api';
import { collections, getCollectionUrl } from './query-builder/collection';
import {
  TCollectionQuery,
  TCollectionQueryBuilderParams,
  TSearchQuery,
  TWorkflowQuery,
} from './query-builder/collection.builder';
import { TSearchParams } from './query-builder/query.model';
import { useQueryBuilder } from './query-builder/use-query-builder.hook';
import { queryKey } from './query-key.const';
import { collectionSchema, TCollection } from './stac.model';

const getSearchResults = async (query: TSearchQuery): Promise<TCollection> => {
  const requests = query.params
    .filter((params) => params.enabled)
    .map((params) => {
      const { collection, ...rest } = params;
      const url = getCollectionUrl(params.collection);
      return getHttpClient().post<TCollection>(url, rest);
    });
  const responses = await Promise.allSettled(requests);

  const data = responses
    .map((response) => {
      if (response.status === 'fulfilled') {
        const parsedData = collectionSchema.safeParse(response.value);

        if (parsedData.success) {
          return parsedData.data;
        }

        return undefined;
      }

      return undefined;
    })
    .filter((item): item is TCollection => !!item)
    .reduce(
      (acc, val) => ({
        ...acc,
        type: acc.type,
        features: [...acc.features, ...val.features],
        links: [...acc.links, ...val.links].filter((link) => link.rel === 'next'),
        context: {
          ...acc.context,
          returned: acc.context.returned + val.context.returned,
          limit: acc.context.limit + val.context.limit,
        },
      }),
      {
        type: 'FeatureCollection',
        features: [],
        links: [],
        context: {
          returned: 0,
          limit: 0,
        },
      } as TCollection
    );

  return collectionSchema.parse(data);
};

const getWorkflowResults = async (query: TWorkflowQuery): Promise<TCollection> => {
  const response = await getHttpClient().post(
    paths.WORKFLOW_RESULT({ jobId: query.jobId, userWorkspace: query.userWorkspace }),
    query.params
  );

  return collectionSchema.parse(response);
};

const getResults = async (query: TCollectionQuery) => {
  if (query.type === 'workflow') {
    return getWorkflowResults(query);
  }

  return getSearchResults(query);
};

type TCatalogSearchProps = {
  params?: Omit<TSearchParams, 'collection'>;
};

export const useCatalogSearch = ({ params }: TCatalogSearchProps) => {
  const queryBuilderParams: TCollectionQueryBuilderParams = useMemo(
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

  const query = useQueryBuilder([...collections], queryBuilderParams);

  return useQuery<TCollection>({
    enabled: query.enabled,
    queryKey: queryKey.CATALOG_SEARCH(query.params),
    queryFn: () => getResults(query),
    staleTime: 200,
  });
};
