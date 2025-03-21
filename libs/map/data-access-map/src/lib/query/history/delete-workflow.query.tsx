// import { useQuery } from '@tanstack/react-query';
// import { getHttpClient } from '@ukri/shared/utils/react-query';

// import { paths } from '../../api';
// import { queryKey } from '../query-key.const';
// import { historySchema } from './history.model';

// export interface IDeleteWorkflowParams {
//     workflowId: string;
// }

// const deleteWorkflow = async ({
//   workflowId,
// }: IDeleteWorkflowParams): Promise<unknown> => {

//   const response = await getHttpClient().delete(`${paths.WORKFLOW}/${workflowId}`);
//     return response;
// };
// //   return historySchema.parse(response);

// type TUseGetHistoryOptions = {
//   params: IDeleteWorkflowParams;
//   enabled?: boolean;
// };

// export const useDeleteWorkflow = ({ params}: TUseGetHistoryOptions) => {
//   return useQuery({
//     queryKey: queryKey.DELETE_WORKFLOW({ ...params }),
//     queryFn: () => deleteWorkflow({ ...params })
//   });
// };

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getHttpClient } from '@ukri/shared/utils/react-query';

import { paths } from '../../api';
import { queryKey } from '../query-key.const';

interface IDeleteHistoryItemParams {
  workflowId: string;
}

const deleteHistoryItem = async ({ workflowId }: IDeleteHistoryItemParams): Promise<void> => {
  await getHttpClient().delete(`${paths.WORKFLOW}/${workflowId}`);
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
