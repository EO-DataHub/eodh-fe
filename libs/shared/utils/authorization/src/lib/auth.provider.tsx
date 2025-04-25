import { KeycloakError, KeycloakInitOptions } from 'keycloak-js';
import { Context, memo, PropsWithChildren, useCallback, useState } from 'react';

import { AuthContext, TAuthContextProps } from './auth.context';
import { getWorkspaces } from './identity-claims';
import { IAuthAdapter, IBaseIdentityClaims, TAuthClientEvent, TAuthClientTokens } from './types';
import { useAuthClient } from './use-auth-client.hook';
import { WorkspaceProvider } from './workspaces/workspace.provider';

type TAuthProvider<T extends IBaseIdentityClaims> = PropsWithChildren<{
  LoadingComponent?: JSX.Element;
  onEvent?: (eventType: TAuthClientEvent, error?: KeycloakError) => void;
  onTokens?: (tokens: TAuthClientTokens) => void;
  initOptions?: KeycloakInitOptions;
  adapter: IAuthAdapter<T>;
  autoRefreshToken?: boolean;
}>;

export const AuthProvider = memo(
  <T extends IBaseIdentityClaims>({
    children,
    LoadingComponent,
    onEvent,
    onTokens,
    initOptions,
    adapter,
    autoRefreshToken = true,
  }: TAuthProvider<T>) => {
    const [workspaces, setWorkspaces] = useState<string[]>([]);

    const setWorkspaceAndUpdateTokens = useCallback(
      (tokens: TAuthClientTokens) => {
        setWorkspaces(getWorkspaces(tokens));

        if (onTokens) {
          onTokens(tokens);
        }
      },
      [onTokens, setWorkspaces]
    );

    const { initialized, isLoading, isAuthenticated } = useAuthClient({
      authClient: adapter,
      onEvent,
      onTokens: setWorkspaceAndUpdateTokens,
      initOptions,
      autoRefreshToken,
    });
    const TypedAuthContext = AuthContext as Context<TAuthContextProps<T>>;

    if (!!LoadingComponent && (!initialized || isLoading)) {
      return LoadingComponent;
    }

    return (
      <TypedAuthContext.Provider value={{ initialized, authClient: adapter, authenticated: isAuthenticated }}>
        <WorkspaceProvider workspaces={workspaces}>{children}</WorkspaceProvider>
      </TypedAuthContext.Provider>
    );
  }
);
