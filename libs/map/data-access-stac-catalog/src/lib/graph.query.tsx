import { useQuery } from '@tanstack/react-query';
import { getHttpClient } from '@ukri/shared/utils/react-query';
import { useMemo } from 'react';

import { paths } from './api';
import { chartSchema, TChartSchema } from './graph.model';
import { collections } from './query-builder/collection';
import { TCollectionQuery, TCollectionQueryBuilderParams, TWorkflowQuery } from './query-builder/collection.builder';
import { TSearchParams } from './query-builder/query.model';
import { useQueryBuilder } from './query-builder/use-query-builder.hook';
import { queryKey } from './query-key.const';

const getChartDataForWorkflowResults = async (query: TWorkflowQuery): Promise<TChartSchema> => {
  const response = await getHttpClient().post(
    paths.WORKFLOW_RESULT_CHARTS,
    {
      stac_query: query.params,
    },
    { params: { workflowId: query.workflowId, userWorkspace: query.userWorkspace, workspaceId: query.workspaceId } }
  );

  return chartSchema.parse(response);
};

const getChartData = async (
  query: TCollectionQuery
): Promise<TChartSchema | { assets: never; chartType: never; workflowId: never }> => {
  if (query.type === 'workflow') {
    return getChartDataForWorkflowResults(query);
  }

  return {} as { assets: never; chartType: never; workflowId: never };
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

  return useQuery({
    enabled: query.enabled && query.type === 'workflow',
    queryKey: queryKey.GRAPH_SEARCH(query.params),
    queryFn: () => getChartData(query),
    staleTime: 200,
  });
};
