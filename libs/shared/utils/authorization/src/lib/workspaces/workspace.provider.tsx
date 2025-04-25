import { createContext, memo, PropsWithChildren, useCallback, useEffect, useState } from 'react';

import { getWorkspace, setWorkspace } from './workspace.storage';

export type TWorkspaceContextContextProps = {
  workspaces: string[];
  currentWorkspace: string | undefined;
  setCurrentWorkspace: (workspace: string | undefined) => void;
};

export const WorkspaceContext = createContext<TWorkspaceContextContextProps>({
  workspaces: [],
  currentWorkspace: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCurrentWorkspace: () => {},
});

type TWorkspaceProvider = PropsWithChildren<{
  workspaces: string[];
}>;

export const WorkspaceProvider = memo(({ workspaces, children }: TWorkspaceProvider) => {
  const [currentWorkspace, setCurrentWorkspace] = useState<string | undefined>(getWorkspace(workspaces));

  const updateWorkspace = useCallback(
    (workspace: string | undefined) => {
      let newWorkspace = workspace;

      if (newWorkspace?.length && !workspaces.includes(newWorkspace)) {
        newWorkspace = undefined;
      }

      setWorkspace(newWorkspace);
      setCurrentWorkspace(newWorkspace);
    },
    [workspaces]
  );

  useEffect(() => {
    const workspace = getWorkspace(workspaces);
    setCurrentWorkspace((currentWorkspace) => (!currentWorkspace ? workspace : currentWorkspace));
  }, [workspaces]);

  return (
    <WorkspaceContext.Provider
      value={{ workspaces: workspaces || [], currentWorkspace, setCurrentWorkspace: updateWorkspace }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
});
