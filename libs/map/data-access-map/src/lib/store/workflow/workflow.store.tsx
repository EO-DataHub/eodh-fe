import type {} from '@redux-devtools/extension';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { addWorkflow, markAsRead, updateWorkflows, updateWorkflowStatus } from './utils';
import { getDefaultValues, IWorkflow, IWorkflowStore } from './workflow.model';

export const useWorkflowStore = create<IWorkflowStore>()(
  devtools((set) => ({
    ...getDefaultValues(),
    addWorkflow: (workflow: IWorkflow) => set((state) => addWorkflow(workflow, state)),
    updateWorkflowStatus: (id: IWorkflow['id'], status: IWorkflow['status']) =>
      set((state) => updateWorkflowStatus(id, status, state)),
    updateWorkflows: (workflows) => set((state) => updateWorkflows(workflows, state)),
    markAsRead: (workflowId) => set((state) => markAsRead(workflowId, state)),
  }))
);

export const useWorkflow = (): IWorkflowStore => {
  return useWorkflowStore();
};
