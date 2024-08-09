import { ReactKeycloakProvider } from '@react-keycloak/web';
import React from 'react';

import { initOptions, keycloak } from './keycloak';

interface IKeycloakProviderWrapperProps {
  children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onKeycloakEvent = (event: any, error: any) => {
  // eslint-disable-next-line no-console
  console.log('onKeycloakEvent', event, error);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onKeycloakTokens = (tokens: any) => {
  // eslint-disable-next-line no-console
  console.log('onKeycloakTokens', tokens);
};

export const KeycloakProviderWrapper = ({ children }: IKeycloakProviderWrapperProps) => {
  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={initOptions}
      onEvent={onKeycloakEvent}
      onTokens={onKeycloakTokens}
    >
      {children}
    </ReactKeycloakProvider>
  );
};
