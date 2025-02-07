import { useQuery } from '@tanstack/react-query';
import { getHttpClient } from '@ukri/shared/utils/react-query';
import { useMemo } from 'react';

import { paths } from './api';
import { QueryBuilder, TQueryBuilderParams, TQueryParams } from './query-builder/query.builder';
import { TCopernicusSearchParams, TSearchParams } from './query-builder/query.model';
import { useQueryBuilder } from './query-builder/use-query-builder.hook';
import { queryKey } from './query-key.const';
import { collectionSchema, itemsSchema, TCollection } from './stac.model';

type TResult = {
  [key in keyof TCopernicusSearchParams]: TCopernicusSearchParams[key];
};

const getSearchResults = async (params: TQueryParams, searchParams?: TSearchParams): Promise<TCollection> => {
  let requestParams;

  if (searchParams?.dataSets?.public.copernicus) {
    const { dataSets, ...rest } = searchParams;

    requestParams = Object.entries(dataSets.public.copernicus).reduce(
      (
        acc: TResult,
        [key, item]: [keyof TCopernicusSearchParams, TCopernicusSearchParams[keyof TCopernicusSearchParams]]
      ) => {
        if (!item || !Object.entries(item).length) {
          return acc;
        }

        const params: TQueryBuilderParams = {
          queryParams: {
            ...rest,
            dataSets: {
              public: {
                copernicus: {
                  [key]: item,
                },
              },
            },
          },
          limit: 50,
          sortBy: {
            field: 'properties.datetime',
            direction: 'desc',
          },
        };

        const query = new QueryBuilder(params, { enabledOnParams: 'data' }).build();
        if (!query.enabled) {
          return acc;
        }

        let newKey = key;

        if (key === 'sentinel2') {
          newKey = 'sentinel-2-l2a-ard';
        }

        return {
          ...acc,
          [newKey]: query.params,
        };
      },
      {} as TResult
    );

    // const p = Object.entries(dataSets.public.copernicus).map(
    //   ([key, item]: [keyof TCopernicusSearchParams, TCopernicusSearchParams[keyof TCopernicusSearchParams]]) => {
    //     if (!item || !Object.entries(item).length) {
    //       return undefined;
    //     }
    //
    //     const params: TQueryBuilderParams = {
    //       queryParams: {
    //         ...rest,
    //         dataSets: {
    //           public: {
    //             copernicus: {
    //               [key]: item,
    //             },
    //           },
    //         },
    //       },
    //       limit: 50,
    //       sortBy: {
    //         field: 'properties.datetime',
    //         direction: 'desc',
    //       },
    //     };
    //
    //     return new QueryBuilder(params).build();
    //   }
    // );

    console.log('ppp', requestParams);
  }

  console.log('requestParams ? requestParams : params', requestParams, requestParams ? requestParams : params);

  const response = await getHttpClient().post(paths.STAC_CATALOGUE, requestParams ? requestParams : params);

  return itemsSchema.parse(response).items;
};

const getWorkflowResults = async (jobId: string, userWorkspace: string, params: TQueryParams): Promise<TCollection> => {
  const response = await getHttpClient().post(paths.WORKFLOW_RESULT({ jobId, userWorkspace }), params);

  return collectionSchema.parse(response);
};

const getResults = async (queryParams: TQueryParams, searchParams?: TSearchParams) => {
  if (searchParams?.jobId && searchParams?.userWorkspace) {
    return getWorkflowResults(searchParams.jobId, searchParams.userWorkspace, queryParams);
  }

  return getSearchResults(queryParams, searchParams);
};

type TCatalogSearchProps = {
  params?: TSearchParams;
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

  return useQuery<TCollection>({
    enabled: query.enabled,
    queryKey: queryKey.CATALOG_SEARCH(query.params),
    queryFn: () => getResults(query.params, params),
    staleTime: 200,
  });
};
