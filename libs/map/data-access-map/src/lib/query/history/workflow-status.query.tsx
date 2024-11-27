import { useQuery } from '@tanstack/react-query';
import { getHttpClient, TExtractFnReturnType, TQueryConfig } from '@ukri/shared/utils/react-query';

import { paths } from '../../api';
import { queryKey } from '../query-key.const';
import { historyAllItemsSchema } from './history.model';
import { updateWorkflowHistory } from './update-workflow-history';

interface IHistoryParams {
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
}

const getAllHistoryResults = async ({ orderBy = 'submitted_at', orderDirection = 'desc' }: IHistoryParams = {}) => {
  const response = await getHttpClient().get(paths.WORKFLOW, {
    params: {
      order_by: orderBy,
      order_direction: orderDirection,
    },
  });
  const result = historyAllItemsSchema.parse(response);
  await updateWorkflowHistory(result.results);

  return result;
};

type TUseWorkflowStatusOptions = {
  config?: TQueryConfig<typeof getAllHistoryResults>;
  enabled?: boolean;
};

export const useWorkflowStatus = ({ config, enabled }: TUseWorkflowStatusOptions) => {
  return useQuery<TExtractFnReturnType<typeof getAllHistoryResults>>({
    queryKey: queryKey.WORKFLOW_STATUS(),
    queryFn: () => getAllHistoryResults(),
    enabled,
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
    ...config,
  });
};
