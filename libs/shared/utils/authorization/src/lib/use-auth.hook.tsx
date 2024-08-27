import { useContext } from 'react';

import { AuthContext, TAuthContextProps } from './auth.context';
import { IAuthAdapter } from './types';

export function useAuth(): Required<TAuthContextProps<IAuthAdapter>> {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error('useAuth hook must be used inside AuthProvider context');
  }

  if (!ctx.authClient) {
    throw new Error('authClient has not been assigned to AuthProvider');
  }

  const { authClient, initialized, authenticated } = ctx;
  return {
    initialized,
    authenticated,
    authClient,
  };
}
