import { DefaultError, InfiniteData, QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import { getHttpClient } from '@ukri/shared/utils/react-query';
import { useMemo } from 'react';

import { paths } from './api';
import { chartSchema, TChartData } from './graph.model';
import { collections } from './query-builder/collection';
import { TCollectionQuery, TCollectionQueryBuilderParams, TWorkflowQuery } from './query-builder/collection.builder';
import { TQueryParams } from './query-builder/query.builder';
import { TSearchParams } from './query-builder/query.model';
import { useQueryBuilder } from './query-builder/use-query-builder.hook';
import { queryKey } from './query-key.const';

const getChartDataForWorkflowResults = async (
  query: TWorkflowQuery,
  contrinuationToken: string | undefined
): Promise<TChartData> => {
  const stacQueryParams: TQueryParams & { token?: string } = { ...query.params };

  if (contrinuationToken) {
    stacQueryParams.token = contrinuationToken;
  }

  const response = await getHttpClient().post(
    paths.WORKFLOW_RESULT_CHARTS,
    {
      stac_query: stacQueryParams,
    },
    { params: { jobId: query.jobId, userWorkspace: query.userWorkspace, workflowId: query.workflowId } }
  );

  return chartSchema.parse(response);
};

const getChartData = async (
  query: TCollectionQuery,
  contrinuationToken: string | undefined
): Promise<TChartData | { assets: never; chartType: never; jobId: never; continuationToken: never }> => {
  if (query.type === 'workflow') {
    return getChartDataForWorkflowResults(query, contrinuationToken);
  }

  return {} as { assets: never; chartType: never; jobId: never; continuationToken: never };
};

type TGraphSearchProps = {
  params?: Omit<TSearchParams, 'collection'>;
};

export const useGraphSearch = ({ params }: TGraphSearchProps) => {
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

  return useInfiniteQuery<TChartData, DefaultError, InfiniteData<TChartData>, QueryKey, string | undefined>({
    enabled: query.enabled && query.type === 'workflow',
    queryKey: queryKey.GRAPH_SEARCH(query.params),
    queryFn: ({ pageParam }) => getChartData(query, pageParam),
    staleTime: 200,
    initialPageParam: undefined,
    getNextPageParam: (lastPage): string | undefined => lastPage.continuationToken,
  });
};
