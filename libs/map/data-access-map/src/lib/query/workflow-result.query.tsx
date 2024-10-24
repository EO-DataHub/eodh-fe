import { useQuery } from '@tanstack/react-query';
import { getHttpClient, TExtractFnReturnType } from '@ukri/shared/utils/react-query';

import { paths } from '../api';
import { historySchema, THistory } from './history.model';

export interface IWorkflowResultsParams {
  jobId: string | null;
  userWorkspace?: string;
}

const getWorkflowResults = async ({ jobId }: IWorkflowResultsParams): Promise<THistory> => {
  // userWorkspace ->> "preferred_username": "eopro-spyro-test",
  const url = paths.WORKFLOW_RESULT.replace('{user_workspace}', 'eopro-spyro-test').replace('{job_id}', jobId ?? '');
  const response = await getHttpClient().get(url);

  return historySchema.parse(response);
};

export const useGetWorkflowResult = (params: IWorkflowResultsParams) => {
  return useQuery<TExtractFnReturnType<typeof getWorkflowResults>>({
    queryKey: [paths.WORKFLOW, params.userWorkspace, params.jobId],
    queryFn: () => getWorkflowResults(params),
    enabled: !!params.jobId, // Only run query if both parameters are set !!userWorkspace && !!jobId
  });
};
