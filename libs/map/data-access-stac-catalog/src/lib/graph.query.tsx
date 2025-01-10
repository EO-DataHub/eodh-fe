import { useQuery } from '@tanstack/react-query';
import { getHttpClient } from '@ukri/shared/utils/react-query';
import { useMemo } from 'react';

import { paths } from './api';
import { chartSchema, TChartSchema } from './graph.model';
import { TQueryBuilderParams, TQueryParams } from './query-builder/query.builder';
import { TSearchParams } from './query-builder/query.model';
import { useQueryBuilder } from './query-builder/use-query-builder.hook';
import { queryKey } from './query-key.const';

const getChartDataForWorkflowResults = async (
  jobId: string,
  userWorkspace: string,
  params: TQueryParams
): Promise<TChartSchema> => {
  const response = await getHttpClient().post(paths.WORKFLOW_RESULT_CHARTS({ jobId, userWorkspace }), params);

  return chartSchema.parse(response);
};

const getChartData = async (
  queryParams: TQueryParams,
  searchParams?: TSearchParams
): Promise<TChartSchema | { assets: never; chartType: never; jobId: never }> => {
  if (searchParams?.jobId && searchParams?.userWorkspace) {
    return getChartDataForWorkflowResults(searchParams.jobId, searchParams.userWorkspace, queryParams);
  }

  return {} as { assets: never; chartType: never; jobId: never };
};

type TGraphSearchProps = {
  params?: TSearchParams;
};

export const useGraphSearch = ({ params }: TGraphSearchProps) => {
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

  return useQuery({
    enabled: query.enabled,
    queryKey: queryKey.GRAPH_SEARCH(query.params),
    queryFn: () => getChartData(query.params, params),
    staleTime: 200,
  });
};
