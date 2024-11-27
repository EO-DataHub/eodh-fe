import type {} from '@redux-devtools/extension';

import { IWorkflow, IWorkflowStore, TWorkflowStoreState } from './workflow.model';

const filterWorkflowByStatuses = (workflow: IWorkflow, statuses: IWorkflow['status'][]) =>
  statuses.some((status) => status === workflow.status);

const getWorkflowsStatuses = (workflows: IWorkflow[], statuses: IWorkflow['status'][]) =>
  workflows.some((workflow) => filterWorkflowByStatuses(workflow, statuses));

const getWorkflowStatus = (workflows: IWorkflow[]): Omit<TWorkflowStoreState, 'workflows'> => ({
  hasSuccessWorkflows: getWorkflowsStatuses(workflows, ['READY']),
  hasProcessedWorkflows: getWorkflowsStatuses(workflows, ['READY', 'FAILED']),
  hasWorkflowsToProcess: getWorkflowsStatuses(workflows, ['PROCESSING']),
});

export const markAsRead = (workflowId: string | undefined, state: TWorkflowStoreState): Partial<IWorkflowStore> => {
  const currentWorkflows = Object.values(state.workflows);
  let inProgressWorkflows = currentWorkflows.filter((workflow) => filterWorkflowByStatuses(workflow, ['PROCESSING']));

  if (workflowId) {
    inProgressWorkflows = currentWorkflows
      .filter((workflow) => workflow.id !== workflowId)
      .filter((workflow) => !filterWorkflowByStatuses(workflow, ['FAILED']));
  }

  return {
    workflows: inProgressWorkflows.reduce(
      (acc, workflow) => ({ ...acc, [workflow.id]: workflow }),
      {} as IWorkflowStore['workflows']
    ),
    ...getWorkflowStatus(Object.values(inProgressWorkflows)),
  };
};

export const addWorkflow = (workflow: IWorkflow, state: TWorkflowStoreState): Partial<IWorkflowStore> => {
  const workflows = {
    ...state.workflows,
    [workflow.id]: workflow,
  };

  return {
    workflows,
    ...getWorkflowStatus(Object.values(workflows)),
  };
};

export const updateWorkflowStatus = (
  id: IWorkflow['id'],
  status: IWorkflow['status'],
  state: TWorkflowStoreState
): Partial<IWorkflowStore> => {
  const workflows = {
    ...state.workflows,
    [id]: {
      ...state.workflows[id],
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
    return state;
  }

  const currentWorkflows = Object.values(state.workflows);
  const newWorkflows = [
    ...currentWorkflows,
    ...workflowsToUpdate
      .filter(
        (workflow) => workflow.status === 'PROCESSING' && !currentWorkflows.find((item) => item.id === workflow.id)
      )
      .map((workflow) => ({ id: workflow.id, status: workflow.status })),
  ].map((currentWorkflow) => {
    const newWorkflow = workflowsToUpdate.find((newWorkflow) => newWorkflow.id === currentWorkflow.id);

    if (!newWorkflow) {
      return currentWorkflow;
    }

    return {
      ...currentWorkflow,
      id: newWorkflow.id,
      status: newWorkflow.status,
    };
  });

  return {
    workflows: {
      ...newWorkflows.reduce((acc, workflow) => ({ ...acc, [workflow.id]: workflow }), {}),
    },
    ...getWorkflowStatus(newWorkflows),
  };
};
