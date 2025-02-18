import { TFilterParam } from '../query.model';

export const createWorkflowFilterParams = (workflowId: string): TFilterParam[] => {
  if (!workflowId.length) {
    return [];
  }

  return [
    {
      op: '=',
      args: [{ property: 'collection' }, `col_${workflowId}`],
    },
  ];
};
