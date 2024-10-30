import { createContext } from 'react';

import { IAuthAdapter } from './types';

export type TAuthContextProps<T extends IAuthAdapter> = {
  authClient?: T;
  initialized: boolean;
  authenticated: boolean;
  userWorkspace?: string;
  getToken?: () => { token: string | undefined; idToken: string | undefined; refreshToken: string | undefined };
};

export const AuthContext = createContext<TAuthContextProps<IAuthAdapter>>({
  initialized: false,
  authenticated: false,
  authClient: undefined,
  userWorkspace: undefined,
  getToken: () => ({ token: undefined, idToken: undefined, refreshToken: undefined }),
});
