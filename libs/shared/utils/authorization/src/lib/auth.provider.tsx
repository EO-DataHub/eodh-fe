import { KeycloakError, KeycloakInitOptions } from 'keycloak-js';
import { memo, PropsWithChildren } from 'react';

import { AuthContext } from './auth.context';
import { IAuthAdapter, TAuthClientEvent, TAuthClientTokens } from './types';
import { useAuthClient } from './use-auth-client.hook';

type TAuthProvider = PropsWithChildren<{
  LoadingComponent?: JSX.Element;
  onEvent?: (eventType: TAuthClientEvent, error?: KeycloakError) => void;
  onTokens?: (tokens: TAuthClientTokens) => void;
  initOptions?: KeycloakInitOptions;
  adapter: IAuthAdapter;
  autoRefreshToken?: boolean;
}>;

export const AuthProvider = memo(
  ({ children, LoadingComponent, onEvent, onTokens, initOptions, adapter, autoRefreshToken = true }: TAuthProvider) => {
    const { initialized, isLoading, isAuthenticated, userWorkspace } = useAuthClient({
      authClient: adapter,
      onEvent,
      onTokens,
      initOptions,
      autoRefreshToken,
    });

    if (!!LoadingComponent && (!initialized || isLoading)) {
      return LoadingComponent;
    }

    return (
      <AuthContext.Provider value={{ initialized, authClient: adapter, authenticated: isAuthenticated, userWorkspace }}>
        {children}
      </AuthContext.Provider>
    );
  }
);
