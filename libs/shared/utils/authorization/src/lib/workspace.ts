import { TIdentityClaims } from './types';

interface IWorkspaceClaims {
  preferred_username?: string;
  workspaces?: string[];
  workspace?: string;
}

const isWorkspaceClaims = (
  identityClaims: TIdentityClaims<IWorkspaceClaims>
): identityClaims is TIdentityClaims<IWorkspaceClaims> => {
  return (
    !!identityClaims?.workspace?.length ||
    !!identityClaims?.workspaces?.length ||
    !!identityClaims?.preferred_username?.length
  );
};

export const getWorkspace = (
  identityClaims?: TIdentityClaims<object | IWorkspaceClaims> | null
): string | undefined => {
  if (!identityClaims || !isWorkspaceClaims(identityClaims)) {
    return undefined;
  }

  if (identityClaims.workspace?.length) {
    return identityClaims.workspace;
  }

  if (identityClaims.workspaces?.length) {
    return [...identityClaims.workspaces].pop() as string;
  }

  if (identityClaims.preferred_username?.length) {
    return identityClaims.preferred_username;
  }

  return undefined;
};
