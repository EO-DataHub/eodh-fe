import { useQuery } from '@tanstack/react-query';
import { getHttpClient } from '@ukri/shared/utils/react-query';
import { useMemo } from 'react';

import { paths } from './api';
import { TQueryBuilderParams, TQueryParams } from './query-builder/query.builder';
import { TSearchParams } from './query-builder/query.model';
import { useQueryBuilder } from './query-builder/use-query-builder.hook';
import { queryKey } from './query-key.const';
import { collectionInfoSchema, collectionSchema, TCollection, TCollectionInfo, TWorkflowResults } from './stac.model';

const getSearchResults = async (params: TQueryParams): Promise<TCollection> => {
  const response = await getHttpClient().post(paths.STAC_CATALOGUE, params);

  return collectionSchema.parse(response);
};

const getWorkflowResults = async (
  jobId: string,
  userWorkspace: string,
  params: TQueryParams
): Promise<TWorkflowResults> => {
  const url = paths.COLLECTION_INFO.replace('{user_workspace}', userWorkspace ?? '').replace(/{job_id}/g, jobId ?? '');

  const response1 = await getHttpClient().post(paths.WORKFLOW_RESULT({ jobId, userWorkspace }), params);
  const response2 = await getHttpClient().get(url);

  const collectionParsed = await collectionSchema.parse(response1);

  const collectionInfoParsed = await collectionInfoSchema.parseAsync(response2);

  const workflowResults: TWorkflowResults = {
    ...collectionParsed,
    ...collectionInfoParsed,
  };

  return workflowResults;
};

const getResults = async (queryParams: TQueryParams, searchParams?: TSearchParams) => {
  if (searchParams?.jobId && searchParams?.userWorkspace) {
    return getWorkflowResults(searchParams.jobId, searchParams.userWorkspace, queryParams);
  }

  return getSearchResults(queryParams);
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

  return useQuery<TCollection & Partial<TCollectionInfo>>({
    enabled: query.enabled,
    queryKey: queryKey.CATALOG_SEARCH(query.params),
    queryFn: () => getResults(query.params, params),
  });
};
