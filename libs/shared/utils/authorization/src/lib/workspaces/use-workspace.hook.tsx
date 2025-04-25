import { useContext } from 'react';

import { TWorkspaceContextContextProps, WorkspaceContext } from './workspace.provider';

export function useWorkspace(): TWorkspaceContextContextProps {
  return useContext(WorkspaceContext);
}
