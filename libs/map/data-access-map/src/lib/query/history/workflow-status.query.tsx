import { useQuery } from '@tanstack/react-query';
import { getHttpClient, TExtractFnReturnType, TQueryConfig } from '@ukri/shared/utils/react-query';

import { paths } from '../../api';
import { queryKey } from '../query-key.const';
import { historyAllItemsSchema } from './history.model';
import { updateWorkflowHistory } from './update-workflow-history';

interface IHistoryParams {
  workspace?: string;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
}

const getAllHistoryResults = async ({
  workspace,
  orderBy = 'submitted_at',
  orderDirection = 'desc',
}: IHistoryParams = {}) => {
  const defaultParams = {
    order_by: orderBy,
    order_direction: orderDirection,
  };

  const response = await getHttpClient().get(paths.WORKFLOW, {
    params: workspace ? { ...defaultParams, workspace } : defaultParams,
  });
  const result = historyAllItemsSchema.parse(response);
  await updateWorkflowHistory(result.results);

  return result;
};

type TUseWorkflowStatusOptions = {
  params?: {
    workspace?: string;
  };
  config?: TQueryConfig<typeof getAllHistoryResults>;
  enabled?: boolean;
};

export const useWorkflowStatus = ({ config, enabled, params }: TUseWorkflowStatusOptions) => {
  return useQuery<TExtractFnReturnType<typeof getAllHistoryResults>>({
    queryKey: queryKey.WORKFLOW_STATUS(),
    queryFn: () => getAllHistoryResults({ workspace: params?.workspace }),
    enabled: enabled && !!params?.workspace,
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
    ...config,
  });
};
