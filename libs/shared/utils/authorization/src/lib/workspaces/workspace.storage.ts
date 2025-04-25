const workspaceKey = 'user-workspace';

export const getWorkspace = (availableWorkspaces: string[]) => {
  const workspace = localStorage.getItem(workspaceKey);

  if (!workspace?.length || !availableWorkspaces.includes(workspace)) {
    return undefined;
  }

  return workspace;
};

export const setWorkspace = (workspace: string | undefined) => {
  if (!workspace) {
    localStorage.removeItem(workspaceKey);
    return;
  }

  localStorage.setItem(workspaceKey, workspace);
};
