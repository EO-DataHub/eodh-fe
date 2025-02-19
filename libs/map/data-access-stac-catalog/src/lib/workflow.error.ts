export class NoWorkflowResultsFoundError extends Error {
  public code = 'NoWorkflowResultsFoundError';
  public status = 404;
}
