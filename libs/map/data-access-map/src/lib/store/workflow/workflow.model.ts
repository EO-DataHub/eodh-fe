export interface IWorkflow {
  jobId: string;
  status: 'READY' | 'PROCESSING' | 'FAILED';
}

export interface IWorkflowStore {
  status: 'initial' | 'in-progress' | 'ready';
  workflows: {
    [key: string]: IWorkflow;
  };
  hasSuccessWorkflows: boolean;
  hasProcessedWorkflows: boolean;
  hasWorkflowsToProcess: boolean;
  addWorkflow: (workflow: IWorkflow) => void;
  updateWorkflowStatus: (jobId: IWorkflow['jobId'], status: IWorkflow['status']) => void;
  updateWorkflows: (workflows: IWorkflow[]) => void;
  markAsRead: (jobId?: IWorkflow['jobId']) => void;
}

export type TWorkflowStoreState = Omit<
  IWorkflowStore,
  'addWorkflow' | 'updateWorkflowStatus' | 'updateWorkflows' | 'markAsRead'
>;

export const getDefaultValues: () => Omit<TWorkflowStoreState, 'status'> = () => ({
  workflows: {},
  hasSuccessWorkflows: false,
  hasProcessedWorkflows: false,
  hasWorkflowsToProcess: false,
});
