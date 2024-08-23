import { ReactKeycloakProvider } from '@react-keycloak/web';
import Keycloak from 'keycloak-js';
import React from 'react';

export const MockKeycloakProvider = ({ children }: { children: React.ReactNode }) => {
  const mockAuthClient = {
    url: 'mock-url',
    realm: 'mock-realm',
    clientId: 'mock-client-id',
  };
  const mockInitOptions = {};
  const mockKeycloakAuthClient = new Keycloak(mockAuthClient);

  return (
    <ReactKeycloakProvider authClient={mockKeycloakAuthClient} initOptions={mockInitOptions}>
      {children}
    </ReactKeycloakProvider>
  );
};
