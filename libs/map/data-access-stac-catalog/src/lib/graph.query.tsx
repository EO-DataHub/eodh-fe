import { useQuery } from '@tanstack/react-query';
import { getHttpClient } from '@ukri/shared/utils/react-query';
import { useMemo } from 'react';

import { paths } from './api';
import { chartSchema, TChartSchema } from './graph.model';
import { collections } from './query-builder/collection';
import { TCollectionQuery, TCollectionQueryBuilderParams } from './query-builder/collection.builder';
import { TQueryParams } from './query-builder/query.builder';
import { TSearchParams } from './query-builder/query.model';
import { useQueryBuilder } from './query-builder/use-query-builder.hook';
import { queryKey } from './query-key.const';

const getChartDataForWorkflowResults = async (
  jobId: string,
  userWorkspace: string,
  params: TQueryParams
): Promise<TChartSchema> => {
  const response = await getHttpClient().post(paths.WORKFLOW_RESULT_CHARTS({ jobId, userWorkspace }), {
    stac_query: params,
  });

  return chartSchema.parse(response);
};

const getChartData = async (
  query: TCollectionQuery
): Promise<TChartSchema | { assets: never; chartType: never; jobId: never }> => {
  if (query.type === 'workflow') {
    return getChartDataForWorkflowResults(query.jobId, query.userWorkspace, query.params);
  }

  return {} as { assets: never; chartType: never; jobId: never };
};

type TGraphSearchProps = {
  params?: TSearchParams;
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

  return useQuery({
    enabled: query.enabled && query.type === 'workflow',
    queryKey: queryKey.GRAPH_SEARCH(query.params),
    queryFn: () => getChartData(query),
    staleTime: 200,
  });
};
