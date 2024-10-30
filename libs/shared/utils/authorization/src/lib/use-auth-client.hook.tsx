import { jwtDecode } from 'jwt-decode';
import { KeycloakError, KeycloakInitOptions } from 'keycloak-js';
import { useCallback, useEffect, useState } from 'react';

import { IAuthAdapter, TAuthClientEvent, TAuthClientTokens } from './types';

interface IDecodedToken {
  preferred_username: string;
}

type TState = {
  initialized: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  userWorkspace?: string;
};

type TUseAuthProps = {
  authClient: IAuthAdapter;
  onEvent?: (eventType: TAuthClientEvent, error?: KeycloakError) => void;
  onTokens?: (tokens: TAuthClientTokens) => void;
  initOptions?: KeycloakInitOptions;
  autoRefreshToken: boolean;
};

const isUserAuthenticated = (authClient: IAuthAdapter) =>
  !!authClient.getToken().idToken && !!authClient.getToken().token;

const userWorkspace = (authClient: IAuthAdapter) => {
  const token = authClient.getToken().token;
  if (token) {
    try {
      const decoded = jwtDecode<IDecodedToken>(token);
      return decoded.preferred_username;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error decoding token:', error);
    }
  }
  return undefined;
};

export const useAuthClient = ({ onEvent, onTokens, initOptions, authClient, autoRefreshToken }: TUseAuthProps) => {
  const [state, setState] = useState<TState>({
    initialized: false,
    isAuthenticated: false,
    isLoading: true,
    userWorkspace: undefined,
  });

  const updateState = useCallback(
    (event: TAuthClientEvent) => () => {
      const { initialized: prevInitialized, isAuthenticated: prevAuthenticated, isLoading: prevLoading } = state;

      onEvent && onEvent(event);

      const isLoading = false;
      const isAuthenticated = isUserAuthenticated(authClient);

      // Avoid double-refresh if state hasn't changed
      if (!prevInitialized || isAuthenticated !== prevAuthenticated || isLoading !== prevLoading) {
        setState({
          initialized: true,
          isAuthenticated,
          isLoading,
          userWorkspace: userWorkspace(authClient),
        });
      }

      const { idToken, refreshToken, token } = authClient.getToken();
      onTokens &&
        onTokens({
          idToken,
          refreshToken,
          token,
        });
    },
    [authClient, onEvent, onTokens, state]
  );

  const refreshToken = useCallback(
    (event: TAuthClientEvent) => () => {
      onEvent && onEvent(event);

      if (autoRefreshToken) {
        authClient.updateToken(5);
      }
    },
    [authClient, autoRefreshToken, onEvent]
  );

  const onError = useCallback(
    (event: TAuthClientEvent) => (error?: KeycloakError) => {
      onEvent && onEvent(event, error);
    },
    [onEvent]
  );

  useEffect(() => {
    const defaultInitOptions: KeycloakInitOptions = {
      onLoad: 'check-sso',
    };

    authClient.onReady(updateState('onReady'));
    authClient.onAuthSuccess(updateState('onAuthSuccess'));
    authClient.onAuthError(onError('onAuthError'));
    authClient.onAuthRefreshSuccess(updateState('onAuthRefreshSuccess'));
    authClient.onAuthRefreshError(onError('onAuthRefreshError'));
    authClient.onAuthLogout(updateState('onAuthLogout'));
    authClient.onTokenExpired(refreshToken('onTokenExpired'));

    authClient.init({ ...defaultInitOptions, ...initOptions }).catch(onError('onInitError'));

    return () => {
      authClient.offReady(updateState('onReady'));
      authClient.offAuthSuccess(updateState('onAuthSuccess'));
      authClient.offAuthError(onError('onAuthError'));
      authClient.offAuthRefreshSuccess(updateState('onAuthRefreshSuccess'));
      authClient.offAuthRefreshError(onError('onAuthRefreshError'));
      authClient.offAuthLogout(updateState('onAuthLogout'));
      authClient.offTokenExpired(refreshToken('onTokenExpired'));
    };
  }, [authClient, initOptions, onError, refreshToken, updateState]);

  return {
    initialized: state.initialized,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    userWorkspace: state.userWorkspace,
  };
};
