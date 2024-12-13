import { jwtDecode } from 'jwt-decode';
import Keycloak, { KeycloakConfig, KeycloakError, KeycloakInitOptions, KeycloakLoginOptions } from 'keycloak-js';

import { IAuthAdapter, IBaseIdentityClaims } from './types';

type TCallbacks = {
  onReady: ((authenticated?: boolean) => void)[];
  onAuthSuccess: (() => void)[];
  onAuthError: ((errorData: KeycloakError) => void)[];
  onAuthRefreshSuccess: (() => void)[];
  onAuthRefreshError: (() => void)[];
  onAuthLogout: (() => void)[];
  onTokenExpired: (() => void)[];
};

class KeycloakConfigError implements Keycloak {
  public init = () => Promise.reject();
  public login = () => Promise.reject();
  public logout = () => Promise.reject();
  public register = () => Promise.reject();
  public loadUserProfile = () => Promise.reject();
  public loadUserInfo = () => Promise.reject();
  public accountManagement = () => Promise.reject();
  public updateToken = () => Promise.reject();
  public createLoginUrl = () => '';
  public createAccountUrl = () => '';
  public createLogoutUrl = () => '';
  public createRegisterUrl = () => '';
  public isTokenExpired = () => true;
  public hasResourceRole = () => false;
  public hasRealmRole = () => false;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public clearToken = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onReady = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onAuthSuccess = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onAuthError = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onAuthRefreshSuccess = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onAuthRefreshError = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onAuthLogout = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTokenExpired = () => {};
}

export class KeycloakAdapter<T extends IBaseIdentityClaims> implements IAuthAdapter<T> {
  protected instance: Keycloak;
  private callbacks: TCallbacks = {
    onReady: [],
    onAuthSuccess: [],
    onAuthError: [],
    onAuthRefreshSuccess: [],
    onAuthRefreshError: [],
    onAuthLogout: [],
    onTokenExpired: [],
  };
  private state: { status: 'idle' | 'initialized' | 'initializing' } = {
    status: 'idle',
  };

  public constructor(config: KeycloakConfig) {
    if (!config.clientId || !config.realm) {
      this.instance = new KeycloakConfigError();
      return;
    }

    try {
      this.instance = new Keycloak(config);
      this.instance.onReady = this.runOnReadyCallback;
      this.instance.onAuthSuccess = this.runAuthSuccessCallback;
      this.instance.onAuthError = this.runAuthErrorCallback;
      this.instance.onAuthRefreshSuccess = this.runAuthRefreshSuccessCallback;
      this.instance.onAuthRefreshError = this.runAuthRefreshErrorCallback;
      this.instance.onAuthLogout = this.runAuthLogoutCallback;
      this.instance.onTokenExpired = this.runOnTokenExpiredCallback;
    } catch (e) {
      this.instance = new KeycloakConfigError();
    }
  }

  public init = (initOptions: KeycloakInitOptions): Promise<boolean> => {
    // todo check if correct status is returned
    if (this.state.status !== 'idle') {
      return Promise.resolve(true);
    }

    this.state.status = 'initializing';
    return this.instance.init(initOptions).then((initialized) => {
      if (initialized) {
        this.state.status = 'initialized';
      }

      return initialized;
    });
  };

  public updateToken = (minValidity?: number | undefined) => this.instance.updateToken(minValidity);

  public login = (options?: KeycloakLoginOptions | undefined) => this.instance.login(options);

  public logout = (options?: KeycloakLoginOptions | undefined) => this.instance.logout(options);

  public getToken = () => ({
    token: this.instance.token,
    idToken: this.instance.idToken,
    refreshToken: this.instance.refreshToken,
  });

  public getIdentityClaims(): T | null {
    const token = this.instance.token;

    if (token) {
      try {
        return jwtDecode<T>(token);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error decoding token:', error);
      }
    }

    return null;
  }

  public onReady = (fn: (authenticated?: boolean) => void) => this.addEventListener('onReady', fn);

  public offReady = (fn: (authenticated?: boolean) => void) => this.removeEventListener('onReady', fn);

  public onAuthSuccess = (fn: () => void) => this.addEventListener('onAuthSuccess', fn);

  public offAuthSuccess = (fn: () => void) => this.removeEventListener('onAuthSuccess', fn);

  public onAuthError = (fn: (errorData: KeycloakError) => void) => this.addEventListener('onAuthError', fn);

  public offAuthError = (fn: (errorData: KeycloakError) => void) => this.removeEventListener('onAuthError', fn);

  public onAuthRefreshSuccess = (fn: () => void) => this.addEventListener('onAuthRefreshSuccess', fn);

  public offAuthRefreshSuccess = (fn: () => void) => this.removeEventListener('onAuthRefreshSuccess', fn);

  public onAuthRefreshError = (fn: () => void) => this.addEventListener('onAuthRefreshError', fn);

  public offAuthRefreshError = (fn: () => void) => this.removeEventListener('onAuthRefreshError', fn);

  public onAuthLogout = (fn: () => void) => this.addEventListener('onAuthLogout', fn);

  public offAuthLogout = (fn: () => void) => this.removeEventListener('onAuthLogout', fn);

  public onTokenExpired = (fn: () => void) => this.addEventListener('onTokenExpired', fn);

  public offTokenExpired = (fn: () => void) => this.removeEventListener('onTokenExpired', fn);

  protected runOnReadyCallback = (authenticated?: boolean) =>
    this.callbacks.onReady.forEach((callback) => callback(authenticated));

  protected runAuthSuccessCallback = () => this.callbacks.onAuthSuccess.forEach((callback) => callback());

  protected runAuthErrorCallback = (errorData: KeycloakError) =>
    this.callbacks.onAuthError.forEach((callback) => callback(errorData));

  protected runAuthRefreshSuccessCallback = () => this.callbacks.onAuthRefreshSuccess.forEach((callback) => callback());

  protected runAuthRefreshErrorCallback = () => this.callbacks.onAuthRefreshError.forEach((callback) => callback());

  protected runAuthLogoutCallback = () => this.callbacks.onAuthLogout.forEach((callback) => callback());

  protected runOnTokenExpiredCallback = () => this.callbacks.onTokenExpired.forEach((callback) => callback());

  private addEventListener = <T extends keyof TCallbacks>(type: T, fn: TCallbacks[T][number]) => {
    (this.callbacks[type] as TCallbacks[T][number][]).push(fn);
  };

  private removeEventListener = <T extends keyof TCallbacks>(type: T, fn: TCallbacks[T][number]) => {
    const callbacksToRemove: TCallbacks[T][number][] = this.callbacks[type].filter((callback) => callback === fn);
    const currentCallbacks: TCallbacks[T] = this.callbacks[type];
    callbacksToRemove.forEach((callback) => {
      const index = currentCallbacks.findIndex((item) => item === callback);
      if (index > -1) {
        currentCallbacks.splice(index, 1);
      }
    });

    this.callbacks[type] = currentCallbacks;
  };
}
