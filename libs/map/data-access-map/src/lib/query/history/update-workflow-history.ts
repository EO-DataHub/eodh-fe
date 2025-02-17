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
  const optimisticUpdatedIds: string[] = [];

  queryClient.setQueryData<InfiniteData<THistory>>(queryKey.WORKFLOW_HISTORY(getHistoryDefaultParams), (data) => {
    if (!data) {
      return;
    }

    const pages = data?.pages.map((item) => ({
      ...item,
      results: item.results.map((result) => {
        const newWorkflow = newWorkflows.find((workflow) => workflow.id === result.jobId);

        if (!newWorkflow) {
          return result;
        }

        optimisticUpdatedIds.push(newWorkflow.id);

        return {
          ...result,
          status: newWorkflow.status,
        };
      }),
    }));

    return {
      ...data,
      pages,
    };
  });

  return optimisticUpdatedIds;
};

export const updateWorkflowHistoryCache = async (newWorkflows: IWorkflow[], currentWorkflows: IWorkflow[]) => {
  const inProgressCurrentWorkflows = currentWorkflows.filter((workflow) => workflow.status === 'PROCESSING');
  const workflowStatusChanged = inProgressCurrentWorkflows.some(
    (workflow) =>
      !!newWorkflows.find((newWorkflow) => newWorkflow.id === workflow.id && newWorkflow.status !== workflow.status)
  );
  let workflowHistoryUpdated = false;

  try {
    const workflowHistoryUpdatedIds = optimisticUpdateWorkflowHistory(newWorkflows);
    workflowHistoryUpdated = workflowHistoryUpdatedIds.some((id) =>
      currentWorkflows.some((workflow) => workflow.id === id)
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('[WORKFLOW HISTORY] Invalid cache');
  }

  if (workflowStatusChanged && !workflowHistoryUpdated) {
    await queryClient.refetchQueries({ queryKey: queryKey.WORKFLOW_HISTORY(), type: 'all' });
  }
};

type TStatus = NonNullable<THistoryItem['status']>;

export const updateWorkflowHistory = async (results: THistoryItem[]) => {
  const newWorkflows = results
    .filter((item): item is Omit<THistoryItem, 'status'> & { status: TStatus } => !!item.status)
    .map((item) => ({ id: item.jobId, status: item.status }));

  await updateWorkflowHistoryCache(newWorkflows, Object.values(useWorkflowStore.getState().workflows));
  useWorkflowStore.getState().updateWorkflows(newWorkflows);
};
