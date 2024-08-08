import { ReactKeycloakProvider } from '@react-keycloak/web';
import React from 'react';

import keycloak from './keycloak';

interface IKeycloakProviderWrapperProps {
  children: React.ReactNode;
}

export const KeycloakProviderWrapper = ({ children }: IKeycloakProviderWrapperProps) => {
  return <ReactKeycloakProvider authClient={keycloak}>{children}</ReactKeycloakProvider>;
};
