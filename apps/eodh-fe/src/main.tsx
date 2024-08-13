import './styles/main.css';

import { KeycloakProviderWrapper } from '@ukri/shared/utils/authorization';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app.component';
import { getEnvConfig } from './env.config';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <KeycloakProviderWrapper keycloakConfig={getEnvConfig().module.authorisation}>
    <StrictMode>
      <App />
    </StrictMode>
  </KeycloakProviderWrapper>
);
