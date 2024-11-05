import { createContext } from 'react';

import { IAuthAdapter, IBaseIdentityClaims } from './types';

export type TAuthContextProps<I extends IBaseIdentityClaims, T extends IAuthAdapter<I> = IAuthAdapter<I>> = {
  authClient?: T;
  initialized: boolean;
  authenticated: boolean;
  userWorkspace?: string;
};

export const AuthContext = createContext({
  initialized: false,
  authenticated: false,
  authClient: undefined,
  userWorkspace: undefined,
});
