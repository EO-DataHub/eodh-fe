import { DefaultError, InfiniteData, QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import { createDate } from '@ukri/shared/utils/date';
import { getHttpClient } from '@ukri/shared/utils/react-query';
import { isAxiosError } from 'axios';
import { useMemo } from 'react';

import { paths } from './api';
import { collections, getCollectionUrl } from './query-builder/collection';
import {
  TCollectionQuery,
  TCollectionQueryBuilderParams,
  TSearchQuery,
  TSortBy,
  TWorkflowQuery,
} from './query-builder/collection.builder';
import { TSearchParams } from './query-builder/query.model';
import { useQueryBuilder } from './query-builder/use-query-builder.hook';
import { queryKey } from './query-key.const';
import {
  searchCollectionSchema,
  TCollection,
  TSearchCollection,
  TWorkflowCollection,
  workflowCollectionSchema,
} from './stac-model/collection.schema';
import { NoWorkflowResultsFoundError } from './workflow.error';

const sortCollectionFeatures = (features: TCollection['features'], sortBy: TSortBy): TCollection['features'] => {
  if (sortBy.field === 'properties.datetime') {
    return features.sort((feature1, feature2) => {
      const date1 = createDate(feature1.properties.datetime)?.getTime() || 0;
      const date2 = createDate(feature2.properties.datetime)?.getTime() || 0;

      if (sortBy.direction === 'asc') {
        return date1 - date2;
      }

      return date2 - date1;
    });
  }

  return features;
};

const mapResponsesToSchema = <T extends TSearchCollection | TWorkflowCollection, Type = T['type']>(
  responses: PromiseSettledResult<T>[],
  sortBy: TSortBy,
  type: Type
): T => {
  const data = responses
    .map((response): TCollection | undefined => {
      if (response.status === 'fulfilled') {
        const schema = type === 'workflow' ? workflowCollectionSchema : searchCollectionSchema;
        const parsedData = schema.safeParse(
          response.value ? { ...response.value, collectionType: type } : response.value
        );

        if (parsedData.success) {
          return parsedData.data;
        }
      }

      return undefined;
    })
    .filter((item): item is T => !!item)
    .reduce(
      (acc, val) => ({
        ...acc,
        type: acc.type,
        features: [...acc.features, ...val.features],
        links: [...acc.links, ...val.links].filter((link) => link.rel === 'next'),
        collectionType: acc.collectionType,
      }),
      {
        type: 'FeatureCollection',
        features: [],
        links: [],
        collectionType: type,
      } as unknown as T
    );

  return {
    ...data,
    features: sortCollectionFeatures(data.features, sortBy),
    collectionType: type,
  };
};

const getNextPageResults = async (
  links: TCollection['links'],
  sortBy: TSortBy,
  type: 'workflow' | 'search'
): Promise<TCollection> => {
  const requests = links
    .filter((link) => link.rel === 'next')
    .map((link) => getHttpClient().post<TCollection>(link.href, link.body));
  const data = await Promise.allSettled(requests);

  if (type === 'workflow') {
    return workflowCollectionSchema.parse(mapResponsesToSchema(data, sortBy, type));
  }

  return searchCollectionSchema.parse(mapResponsesToSchema(data, sortBy, type));
};

const getSearchResults = async (query: TSearchQuery): Promise<TCollection> => {
  const requests = query.params
    .filter((params) => params.enabled)
    .map((params) => {
      const url = getCollectionUrl(params.collection);
      return getHttpClient().post<TCollection>(url, params.params);
    });
  const data = await Promise.allSettled(requests);

  return searchCollectionSchema.parse(mapResponsesToSchema(data, query.sortBy, query.type));
};

const getWorkflowResults = async (query: TWorkflowQuery): Promise<TCollection> => {
  try {
    const response = await getHttpClient().post(paths.WORKFLOW_RESULT, query.params, {
      params: { jobId: query.jobId, userWorkspace: query.userWorkspace, workflowId: query.workflowId },
    });
    return workflowCollectionSchema.parse(response ? { ...response, collectionType: 'workflow' } : response);
  } catch (error) {
    if (isAxiosError(error) && error.response?.data.code === 'NotFoundError' && error.response?.status === 404) {
      throw new NoWorkflowResultsFoundError(error.message);
    }

    throw error;
  }
};

const getResults = async (query: TCollectionQuery, links: TCollection['links']) => {
  if (links.length) {
    return await getNextPageResults(links, query.sortBy, query.type);
  }

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

  return useInfiniteQuery<
    TCollection,
    DefaultError | NoWorkflowResultsFoundError,
    InfiniteData<TCollection>,
    QueryKey,
    TCollection['links']
  >({
    enabled: query.enabled,
    queryKey: queryKey.CATALOG_SEARCH(query.params),
    queryFn: ({ pageParam = [] }) => getResults(query, pageParam),
    staleTime: 200,
    initialPageParam: [],
    getNextPageParam: (lastPage): TCollection['links'] | undefined =>
      lastPage.links.find((link) => link.rel === 'next') ? lastPage.links : undefined,
  });
};
