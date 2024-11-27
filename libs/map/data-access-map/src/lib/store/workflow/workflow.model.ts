export interface IWorkflow {
  id: string;
  status: 'READY' | 'PROCESSING' | 'FAILED';
}

export interface IWorkflowStore {
  workflows: {
    [key: string]: IWorkflow;
  };
  hasSuccessWorkflows: boolean;
  hasProcessedWorkflows: boolean;
  hasWorkflowsToProcess: boolean;
  addWorkflow: (workflow: IWorkflow) => void;
  updateWorkflowStatus: (id: IWorkflow['id'], status: IWorkflow['status']) => void;
  updateWorkflows: (workflows: IWorkflow[]) => void;
  markAsRead: (workflowId?: IWorkflow['id']) => void;
}

export type TWorkflowStoreState = Omit<
  IWorkflowStore,
  'addWorkflow' | 'updateWorkflowStatus' | 'updateWorkflows' | 'markAsRead'
>;

export const getDefaultValues: () => TWorkflowStoreState = () => ({
  workflows: {},
  hasSuccessWorkflows: false,
  hasProcessedWorkflows: false,
  hasWorkflowsToProcess: false,
});
