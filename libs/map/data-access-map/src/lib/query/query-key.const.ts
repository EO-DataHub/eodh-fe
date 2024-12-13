const QUERY_KEY = {
  PRESETS: 'presets',
  FUNCTIONS: 'functions',
  COLLECTION_INFO: 'collection-info',
};

export const queryKey = {
  PRESETS: () => [QUERY_KEY.PRESETS],
  FUNCTIONS: () => [QUERY_KEY.FUNCTIONS],
  COLLECTION_INFO: ({ userWorkspace, jobId }: { userWorkspace: string; jobId: string }) => [
    QUERY_KEY.COLLECTION_INFO,
    userWorkspace,
    jobId,
  ],
};
