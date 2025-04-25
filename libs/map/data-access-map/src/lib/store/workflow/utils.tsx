import type {} from '@redux-devtools/extension';

import { IWorkflow, IWorkflowStore, TWorkflowStoreState } from './workflow.model';

const filterWorkflowByStatuses = (workflow: IWorkflow, statuses: IWorkflow['status'][]) =>
  statuses.some((status) => status === workflow.status);

const getWorkflowsStatuses = (workflows: IWorkflow[], statuses: IWorkflow['status'][]) =>
  workflows.some((workflow) => filterWorkflowByStatuses(workflow, statuses));

const getWorkflowStatus = (workflows: IWorkflow[]): Omit<TWorkflowStoreState, 'workflows' | 'reset'> => {
  const hasSuccessWorkflows = getWorkflowsStatuses(workflows, ['READY']);
  const hasProcessedWorkflows = getWorkflowsStatuses(workflows, ['READY', 'FAILED']);
  const hasWorkflowsToProcess = getWorkflowsStatuses(workflows, ['PROCESSING']);
  const isReadyStatus = workflows.every((workflow) => filterWorkflowByStatuses(workflow, ['READY', 'FAILED']));
  const status: IWorkflowStore['status'] = isReadyStatus ? 'ready' : 'in-progress';

  return {
    hasSuccessWorkflows,
    hasProcessedWorkflows,
    hasWorkflowsToProcess,
    status,
  };
};

export const markAsRead = (jobId: string | undefined, state: TWorkflowStoreState): Partial<IWorkflowStore> => {
  const currentWorkflows = Object.values(state.workflows);
  let inProgressWorkflows = currentWorkflows.filter((workflow) => filterWorkflowByStatuses(workflow, ['PROCESSING']));

  if (jobId) {
    inProgressWorkflows = currentWorkflows
      .filter((workflow) => workflow.jobId !== jobId)
      .filter((workflow) => !filterWorkflowByStatuses(workflow, ['FAILED']));
  }

  return {
    workflows: inProgressWorkflows.reduce(
      (acc, workflow) => ({ ...acc, [workflow.jobId]: workflow }),
      {} as IWorkflowStore['workflows']
    ),
    ...getWorkflowStatus(Object.values(inProgressWorkflows)),
  };
};

export const addWorkflow = (workflow: IWorkflow, state: TWorkflowStoreState): Partial<IWorkflowStore> => {
  const workflows = {
    ...state.workflows,
    [workflow.jobId]: workflow,
  };

  return {
    workflows,
    ...getWorkflowStatus(Object.values(workflows)),
  };
};

export const updateWorkflowStatus = (
  jobId: IWorkflow['jobId'],
  status: IWorkflow['status'],
  state: TWorkflowStoreState
): Partial<IWorkflowStore> => {
  const workflows = {
    ...state.workflows,
    [jobId]: {
      ...state.workflows[jobId],
      status,
    },
  };

  return {
    workflows,
    ...getWorkflowStatus(Object.values(workflows)),
  };
};

export const updateWorkflows = (
  workflowsToUpdate: IWorkflow[],
  state: TWorkflowStoreState
): Partial<IWorkflowStore> => {
  if (!workflowsToUpdate.length) {
    return {
      ...state,
      status: state.status === 'initial' ? 'in-progress' : state.status,
    };
  }

  const currentWorkflows = Object.values(state.workflows);
  const newWorkflows = [
    ...currentWorkflows,
    ...workflowsToUpdate
      .filter(
        (workflow) =>
          workflow.status === 'PROCESSING' && !currentWorkflows.find((item) => item.jobId === workflow.jobId)
      )
      .map((workflow) => ({ jobId: workflow.jobId, status: workflow.status })),
  ].map((currentWorkflow: IWorkflow): IWorkflow => {
    const newWorkflow = workflowsToUpdate.find((newWorkflow) => newWorkflow.jobId === currentWorkflow.jobId);

    if (!newWorkflow) {
      return currentWorkflow;
    }

    return {
      ...currentWorkflow,
      jobId: newWorkflow.jobId,
      status: newWorkflow.status,
    };
  });

  return {
    workflows: {
      ...newWorkflows.reduce((acc, workflow) => ({ ...acc, [workflow.jobId]: workflow }), {}),
    },
    ...getWorkflowStatus(newWorkflows),
  };
};
