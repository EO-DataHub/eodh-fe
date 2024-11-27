import { MutationStatus, useMutation, useMutationState } from '@tanstack/react-query';
import { getHttpClient, queryClient } from '@ukri/shared/utils/react-query';
import { AxiosError } from 'axios';
import { useMemo } from 'react';

import { paths } from '../api';
import { getNewWorkflow, updateLastWorkflows } from '../query/history/temp';
import { queryKey } from '../query/query-key.const';
import { useWorkflowStore } from '../store/workflow/workflow.store';
import { mutationKey } from './mutation-key.const';
import { IErrorResponse, useWorkflowMessage } from './workflow.error';
import { TWorkflowCreated, workflowCreatedSchema } from './workflow.model';
import { createWorkflowParams, TCreateWorkflowParams } from './workflow.utils';

const createWorkflow = async (params: TCreateWorkflowParams): Promise<TWorkflowCreated> => {
  // const response = await getHttpClient().post(paths.WORKFLOW, createWorkflowParams(params));
  const response = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(getNewWorkflow());

      setTimeout(() => {
        updateLastWorkflows();
      }, 10000);
    }, 1000);
  });
  const workflow = workflowCreatedSchema.parse(response);

  useWorkflowStore.getState().addWorkflow({ id: workflow.workflowId, status: 'PROCESSING' });
  await queryClient.refetchQueries({ queryKey: queryKey.WORKFLOW_HISTORY(), type: 'all' });

  return workflow;
};

export const useCreateWorkflow = () => {
  const { showErrorMessage } = useWorkflowMessage();

  return useMutation({
    mutationKey: mutationKey.WORKFLOW_CREATE(),
    mutationFn: createWorkflow,
    onError: (error: AxiosError<IErrorResponse>) => showErrorMessage(error),
  });
};

export const useCreateWorkflowStatus = () => {
  const statuses = useMutationState({
    filters: { mutationKey: mutationKey.WORKFLOW_CREATE() },
    select: (mutation) => mutation.state.status,
  });

  return useMemo((): MutationStatus => {
    if (!statuses.length) {
      return 'idle';
    }

    if (statuses.every((status) => status === 'success')) {
      return 'success';
    }

    if (statuses.some((status) => status === 'error')) {
      return 'error';
    }

    if (statuses.some((status) => status === 'pending')) {
      return 'pending';
    }

    return 'idle';
  }, [statuses]);
};

export const clearWorkflowCache = () =>
  queryClient.getMutationCache().find({ mutationKey: mutationKey.WORKFLOW_CREATE() })?.setOptions({ gcTime: 0 });
