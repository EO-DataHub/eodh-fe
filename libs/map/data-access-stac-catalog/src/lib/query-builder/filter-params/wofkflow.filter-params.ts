import { TFilterParam } from '../query.model';

export const createWorkflowFilterParams = (jobId: string): TFilterParam[] => {
  if (!jobId.length) {
    return [];
  }

  return [
    {
      op: '=',
      args: [{ property: 'collection' }, `col_${jobId}`],
    },
  ];
};
