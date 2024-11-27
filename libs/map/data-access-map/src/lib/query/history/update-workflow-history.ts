import { InfiniteData } from '@tanstack/react-query';
import { queryClient } from '@ukri/shared/utils/react-query';

import { useWorkflowStore } from '../../store/workflow/workflow.store';
import { queryKey } from '../query-key.const';
import { THistory, THistoryItem } from './history.model';
import { getHistoryDefaultParams } from './history.query';

interface IWorkflow {
  id: string;
  status: THistoryItem['status'];
}

const optimisticUpdateWorkflowHistory = (newWorkflows: IWorkflow[]) => {
  let optimisticUpdatedItems = 0;

  queryClient.setQueryData<InfiniteData<THistory[]>>(queryKey.WORKFLOW_HISTORY(getHistoryDefaultParams), (data) => {
    if (!data) {
      return;
    }

    const pages = data?.pages.map((page) =>
      page.map((item) => ({
        ...item,
        results: item.results.map((result) => {
          const newWorkflow = newWorkflows.find((workflow) => workflow.id === result.submissionId);

          if (!newWorkflow) {
            return result;
          }

          optimisticUpdatedItems++;

          return {
            ...result,
            status: newWorkflow.status,
          };
        }),
      }))
    );

    return {
      ...data,
      pages,
    };
  });

  return optimisticUpdatedItems > 0;
};

export const updateWorkflowHistoryCache = async (newWorkflows: IWorkflow[], currentWorkflows: IWorkflow[]) => {
  const inProgressCurrentWorkflows = currentWorkflows.filter((workflow) => workflow.status === 'PROCESSING');
  const workflowStatusChanged = inProgressCurrentWorkflows.some(
    (workflow) =>
      !!newWorkflows.find((newWorkflow) => newWorkflow.id === workflow.id && newWorkflow.status !== workflow.status)
  );
  const workflowHistoryUpdated = optimisticUpdateWorkflowHistory(newWorkflows);

  if (workflowStatusChanged && !workflowHistoryUpdated) {
    await queryClient.refetchQueries({ queryKey: queryKey.WORKFLOW_HISTORY(), type: 'all' });
  }
};

type TStatus = NonNullable<THistoryItem['status']>;

export const updateWorkflowHistory = async (results: THistoryItem[]) => {
  const newWorkflows = results
    .filter((item): item is Omit<THistoryItem, 'status'> & { status: TStatus } => !!item.status)
    .map((item) => ({ id: item.submissionId, status: item.status }));

  await updateWorkflowHistoryCache(newWorkflows, Object.values(useWorkflowStore.getState().workflows));
  useWorkflowStore.getState().updateWorkflows(newWorkflows);
};
