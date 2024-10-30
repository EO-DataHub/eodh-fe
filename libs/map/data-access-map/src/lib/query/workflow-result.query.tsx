import { useQuery } from '@tanstack/react-query';
import { getHttpClient, TExtractFnReturnType } from '@ukri/shared/utils/react-query';

import { paths } from '../api';
import { collectionSchema, TCollection } from './workflow-result.model';

export interface IWorkflowResultsParams {
  jobId: string | null;
  userWorkspace?: string;
}

const getWorkflowResults = async ({ jobId, userWorkspace }: IWorkflowResultsParams): Promise<TCollection> => {
  const url = paths.WORKFLOW_RESULT.replace('{user_workspace}', userWorkspace ?? '').replace('{job_id}', jobId ?? '');
  const response = await getHttpClient().get(url);

  return collectionSchema.parse(response);
};

export const useGetWorkflowResult = (params: IWorkflowResultsParams) => {
  return useQuery<TExtractFnReturnType<typeof getWorkflowResults>>({
    queryKey: [paths.WORKFLOW, params.userWorkspace, params.jobId],
    queryFn: () => getWorkflowResults(params),
    enabled: !!params.jobId && !!params.userWorkspace,
  });
};
