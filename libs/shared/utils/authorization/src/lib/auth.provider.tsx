import { KeycloakError, KeycloakInitOptions } from 'keycloak-js';
import { Context, memo, PropsWithChildren } from 'react';

import { AuthContext, TAuthContextProps } from './auth.context';
import { IAuthAdapter, IBaseIdentityClaims, TAuthClientEvent, TAuthClientTokens } from './types';
import { useAuthClient } from './use-auth-client.hook';

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
    const { initialized, isLoading, isAuthenticated } = useAuthClient({
      authClient: adapter,
      onEvent,
      onTokens,
      initOptions,
      autoRefreshToken,
    });
    const TypedAuthContext = AuthContext as Context<TAuthContextProps<T>>;

    if (!!LoadingComponent && (!initialized || isLoading)) {
      return LoadingComponent;
    }

    return (
      <TypedAuthContext.Provider value={{ initialized, authClient: adapter, authenticated: isAuthenticated }}>
        {children}
      </TypedAuthContext.Provider>
    );
  }
);
