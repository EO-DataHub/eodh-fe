import './styles/main.css';

import { KeycloakProviderWrapper } from '@ukri/login';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app.component';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <KeycloakProviderWrapper>
    <StrictMode>
      <App />
    </StrictMode>
  </KeycloakProviderWrapper>
);
