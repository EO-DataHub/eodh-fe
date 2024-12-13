import { useMutation } from '@tanstack/react-query';
import { getHttpClient } from '@ukri/shared/utils/react-query';
import { AxiosError } from 'axios';

import { paths } from '../api';
import { IErrorResponse, useWorkflowMessage } from './workflow.error';
import { TWorkflowCreated, workflowCreatedSchema } from './workflow.model';
import { createWorkflowParams, TCreateWorkflowParams } from './workflow.utils';

const createWorkflow = async (params: TCreateWorkflowParams): Promise<TWorkflowCreated> => {
  const response = await getHttpClient().post(paths.WORKFLOW, createWorkflowParams(params));

  return workflowCreatedSchema.parse(response);
};

export const useCreateWorkflow = () => {
  const { showErrorMessage } = useWorkflowMessage();

  return useMutation({
    mutationFn: createWorkflow,
    onError: (error: AxiosError<IErrorResponse>) => showErrorMessage(error),
  });
};
