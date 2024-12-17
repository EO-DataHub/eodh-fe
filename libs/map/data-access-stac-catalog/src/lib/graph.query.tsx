import { useQuery } from '@tanstack/react-query';
import { TDateString } from '@ukri/shared/utils/date';
import { getHttpClient } from '@ukri/shared/utils/react-query';
import { useMemo } from 'react';

import { paths } from './api';
import { TQueryBuilderParams, TQueryParams } from './query-builder/query.builder';
import { TSearchParams } from './query-builder/query.model';
import { useQueryBuilder } from './query-builder/use-query-builder.hook';
import { queryKey } from './query-key.const';
import { collectionSchema, TCollection, TWaterQuality } from './stac.model';

const getSearchResults = async (params: TQueryParams): Promise<TCollection> => {
  const response = await getHttpClient().post(paths.STAC_CATALOGUE, params);

  return collectionSchema.parse(response);
};

const getWorkflowResults = async (jobId: string, userWorkspace: string, params: TQueryParams): Promise<TCollection> => {
  const response = await getHttpClient().post(paths.WORKFLOW_RESULT({ jobId, userWorkspace }), params);

  return collectionSchema.parse(response);
};

const getResults = async (queryParams: TQueryParams, searchParams?: TSearchParams): Promise<TCollection> => {
  if (searchParams?.jobId && searchParams?.userWorkspace) {
    return getWorkflowResults(searchParams.jobId, searchParams.userWorkspace, queryParams);
  }

  return getSearchResults(queryParams);
};

type TStatistics = {
  datetime: TDateString;
  min: number;
  max: number;
  value: number;
};

const getStatistics = (
  statistics: TWaterQuality['statistics'] | null | undefined,
  datetime: TDateString
): TStatistics => {
  return {
    datetime,
    min: statistics?.minimum || 0,
    max: statistics?.maximum || 0,
    value: statistics?.median || 0,
  };
};

export type TWaterQualityStatistics = {
  cdom: TStatistics;
  doc: TStatistics;
  cyaCells: TStatistics;
  turb: TStatistics;
};

const getGraphAggregatedData = async (
  queryParams: TQueryParams,
  searchParams?: TSearchParams
): Promise<TWaterQualityStatistics[]> => {
  const results = await getResults(queryParams, searchParams);
  const values: TWaterQualityStatistics[] = Object.values(results.features).map((feature) => {
    const cdom = getStatistics(feature.assets?.cdom?.statistics, feature.properties.datetime);
    const doc = getStatistics(feature.assets?.doc?.statistics, feature.properties.datetime);
    const cyaCells = getStatistics(feature.assets?.cya_cells?.statistics, feature.properties.datetime);
    const turb = getStatistics(feature.assets?.turb?.statistics, feature.properties.datetime);

    return {
      cdom,
      doc,
      cyaCells,
      turb,
    };
  });

  return values;
};

type TCatalogSearchProps = {
  params?: TSearchParams;
};

export const useGraphSearch = ({ params }: TCatalogSearchProps) => {
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

  return useQuery<TWaterQualityStatistics[]>({
    enabled: query.enabled,
    queryKey: queryKey.GRAPH_SEARCH(query.params),
    queryFn: () => getGraphAggregatedData(query.params, params),
  });
};
