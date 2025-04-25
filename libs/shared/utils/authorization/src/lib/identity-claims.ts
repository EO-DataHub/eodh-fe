import { jwtDecode } from 'jwt-decode';
import z from 'zod';

import { IBaseIdentityClaims } from './types';

const workspaceSchema = z.object({
  workspaces: z.array(z.string()),
});

type TToken = { token?: string | undefined };

export const getWorkspaces = (tokens: TToken): string[] => {
  const claims = getIdentityClaims(tokens);

  if (!claims) {
    return [];
  }

  const result = workspaceSchema.safeParse(claims);
  if (!result.success) {
    return [];
  }

  return result.data.workspaces;
};

export const getIdentityClaims = <T extends IBaseIdentityClaims>({ token }: TToken): T | null => {
  if (token) {
    try {
      return jwtDecode<T>(token);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error decoding token:', error);
    }
  }

  return null;
};
