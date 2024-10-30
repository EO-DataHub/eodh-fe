import { createContext } from 'react';

import { IAuthAdapter } from './types';

export type TAuthContextProps<T extends IAuthAdapter> = {
  authClient?: T;
  initialized: boolean;
  authenticated: boolean;
  userWorkspace?: string;
};

export const AuthContext = createContext<TAuthContextProps<IAuthAdapter>>({
  initialized: false,
  authenticated: false,
  authClient: undefined,
  userWorkspace: undefined,
});
