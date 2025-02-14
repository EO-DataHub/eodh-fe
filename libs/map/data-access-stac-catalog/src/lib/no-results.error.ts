export class NoWorkflowResultsFoundError extends Error {
  public status = 404;
  public code = 'NoWorkflowResultsFoundError';
  public message = 'Not Found';
}
