import Keycloak from 'keycloak-js';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface IKeycloakContext {
  keycloak: Keycloak | null;
  authenticated: boolean;
}

const defaultContextValue = {
  keycloak: null,
  authenticated: false,
};

const KeycloakContext = createContext<IKeycloakContext>(defaultContextValue);

export const useKeycloak = () => {
  return useContext(KeycloakContext);
};

interface IKeycloakProvider {
  keycloakConfig: {
    url: string;
    realm: string;
    clientId: string;
  };
  initOptions: {
    onLoad?: 'login-required' | 'check-sso';
    checkLoginIframe?: boolean;
  };
  children: React.ReactNode;
}

export const KeycloakProvider = ({ children, keycloakConfig, initOptions }: IKeycloakProvider) => {
  const [keycloak, setKeycloak] = useState<Keycloak | null>(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const keycloakInstance = new Keycloak(keycloakConfig);
    keycloakInstance.init(initOptions).then((authenticated) => {
      setKeycloak(keycloakInstance);
      setAuthenticated(authenticated);
    });
  }, [keycloakConfig, initOptions]);

  return <KeycloakContext.Provider value={{ keycloak, authenticated }}>{children}</KeycloakContext.Provider>;
};
