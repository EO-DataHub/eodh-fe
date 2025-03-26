const QUERY_KEY = {
  PRESETS: 'presets',
  FUNCTIONS: 'functions',
  COLLECTION_INFO: 'collection-info',
  WORKFLOW_HISTORY: 'workflow-history',
  WORKFLOW_STATUS: 'workflow-status',
};

export const queryKey = {
  PRESETS: () => [QUERY_KEY.PRESETS],
  FUNCTIONS: () => [QUERY_KEY.FUNCTIONS],
  COLLECTION_INFO: ({
    userWorkspace,
    jobId,
    workflowId,
  }: {
    userWorkspace: string;
    jobId: string;
    workflowId: string;
  }) => [QUERY_KEY.COLLECTION_INFO, userWorkspace, jobId, workflowId],
  WORKFLOW_HISTORY: ({ orderDirection }: { orderDirection?: 'asc' | 'desc' } = {}) =>
    [QUERY_KEY.WORKFLOW_HISTORY, orderDirection].filter((item) => !!item),
  WORKFLOW_STATUS: () => [QUERY_KEY.WORKFLOW_STATUS],
};
