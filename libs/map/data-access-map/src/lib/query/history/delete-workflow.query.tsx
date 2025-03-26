import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getHttpClient } from '@ukri/shared/utils/react-query';

import { paths } from '../../api';
import { queryKey } from '../query-key.const';

interface IDeleteHistoryItemParams {
  workflowId: string;
}

const deleteHistoryItem = async ({ workflowId }: IDeleteHistoryItemParams): Promise<void> => {
  await getHttpClient().delete(paths.DELETE_WORKFLOW(workflowId));
};

export const useDeleteHistoryItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteHistoryItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.WORKFLOW_HISTORY() });
    },
  });
};
