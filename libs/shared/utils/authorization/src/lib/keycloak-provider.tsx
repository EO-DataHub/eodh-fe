import React from 'react';

import { KeycloakProvider } from './keycloak-context';

interface IKeycloakConfig {
  url: string;
  realm: string;
  clientId: string;
}

interface IKeycloakProviderWrapperProps {
  keycloakConfig: IKeycloakConfig;
  children: React.ReactNode;
}

export const KeycloakProviderWrapper = ({ keycloakConfig, children }: IKeycloakProviderWrapperProps) => {
  return (
    <KeycloakProvider keycloakConfig={keycloakConfig} initOptions={{}}>
      {children}
    </KeycloakProvider>
  );
};
