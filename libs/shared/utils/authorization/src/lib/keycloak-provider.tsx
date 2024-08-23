import { ReactKeycloakProvider } from '@react-keycloak/web';
// import { StoryFn } from '@storybook/react';
import React from 'react';

import { initOptions, keycloak } from './keycloak';

interface IKeycloakConfig {
  url: string;
  realm: string;
  clientId: string;
}

interface IKeycloakProviderWrapperProps {
  keycloakConfig: IKeycloakConfig;
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

export const KeycloakProviderWrapper = ({ keycloakConfig, children }: IKeycloakProviderWrapperProps) => {
  const config = keycloak(keycloakConfig);
  return (
    <ReactKeycloakProvider
      authClient={config}
      initOptions={initOptions}
      onEvent={onKeycloakEvent}
      onTokens={onKeycloakTokens}
    >
      {children}
    </ReactKeycloakProvider>
  );
};
