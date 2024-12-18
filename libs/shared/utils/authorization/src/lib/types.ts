import Keycloak, { KeycloakError, KeycloakInitOptions } from 'keycloak-js';

export interface IBaseIdentityClaims {
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  iat: number;
}

export type TIdentityClaims<T extends object> = T & IBaseIdentityClaims;

export interface IAuthAdapter<T extends IBaseIdentityClaims = IBaseIdentityClaims> {
  updateToken: Keycloak['updateToken'];
  login: Keycloak['login'];
  logout: Keycloak['logout'];
  getToken: () => {
    token: Keycloak['token'];
    idToken: Keycloak['idToken'];
    refreshToken: Keycloak['refreshToken'];
  };
  getIdentityClaims(): T | null;
  init: (initOptions: KeycloakInitOptions) => Promise<boolean>;
  onReady: (fn: (authenticated?: boolean) => void) => void;
  offReady: (fn: (authenticated?: boolean) => void) => void;
  onAuthSuccess: (fn: () => void) => void;
  offAuthSuccess: (fn: () => void) => void;
  onAuthError: (fn: (errorData: KeycloakError) => void) => void;
  offAuthError: (fn: (errorData: KeycloakError) => void) => void;
  onAuthRefreshSuccess: (fn: () => void) => void;
  offAuthRefreshSuccess: (fn: () => void) => void;
  onAuthRefreshError: (fn: () => void) => void;
  offAuthRefreshError: (fn: () => void) => void;
  onAuthLogout: (fn: () => void) => void;
  offAuthLogout: (fn: () => void) => void;
  onTokenExpired: (fn: () => void) => void;
  offTokenExpired: (fn: () => void) => void;
}

export type TAuthClientTokens = Pick<Keycloak, 'idToken' | 'refreshToken' | 'token'>;

export type TAuthClientEvent =
  | 'onReady'
  | 'onInitError'
  | 'onAuthSuccess'
  | 'onAuthError'
  | 'onAuthRefreshSuccess'
  | 'onAuthRefreshError'
  | 'onAuthLogout'
  | 'onTokenExpired';
