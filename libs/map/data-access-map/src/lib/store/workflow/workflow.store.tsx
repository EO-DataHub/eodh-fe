import type {} from '@redux-devtools/extension';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { addWorkflow, markAsRead, updateWorkflows, updateWorkflowStatus } from './utils';
import { getDefaultValues, IWorkflow, IWorkflowStore } from './workflow.model';

export const useWorkflowStore = create<IWorkflowStore>()(
  devtools((set) => ({
    status: 'initial',
    ...getDefaultValues(),
    addWorkflow: (workflow: IWorkflow) => set((state) => addWorkflow(workflow, state)),
    updateWorkflowStatus: (jobId: IWorkflow['jobId'], status: IWorkflow['status']) =>
      set((state) => updateWorkflowStatus(jobId, status, state)),
    updateWorkflows: (workflows) => set((state) => updateWorkflows(workflows, state)),
    markAsRead: (jobId) => set((state) => markAsRead(jobId, state)),
  }))
);

export const useWorkflow = (): IWorkflowStore => {
  return useWorkflowStore();
};
