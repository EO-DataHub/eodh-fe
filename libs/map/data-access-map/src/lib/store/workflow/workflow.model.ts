export interface IWorkflow {
  jobId: string;
  status: 'READY' | 'PROCESSING' | 'FAILED';
  workspace?: string;
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
  reset: () => void;
}

export type TWorkflowStoreState = Omit<
  IWorkflowStore,
  'addWorkflow' | 'updateWorkflowStatus' | 'updateWorkflows' | 'markAsRead'
>;

export const getDefaultValues: () => Omit<TWorkflowStoreState, 'reset'> = () => ({
  status: 'initial',
  workflows: {},
  hasSuccessWorkflows: false,
  hasProcessedWorkflows: false,
  hasWorkflowsToProcess: false,
});
