import { AppLoader } from '@ukri/shared/design-system';
import { AuthInterceptor, AuthProvider, KeycloakAdapter } from '@ukri/shared/utils/authorization';
import { applyInterceptors } from '@ukri/shared/utils/axios-requests';
import { withQueryClient } from '@ukri/shared/utils/react-query';
import { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';

import { getEnvConfig } from '../env.config';
import i18n from '../i18n';
import { DefaultLayout } from './layout/default-layout.component';

const keycloakAdapter = new KeycloakAdapter(getEnvConfig().module.authorisation);
applyInterceptors([new AuthInterceptor(keycloakAdapter)]);

export function App() {
  return (
    <AuthProvider adapter={keycloakAdapter}>
      <Suspense fallback={<AppLoader />}>
        <I18nextProvider i18n={i18n}>
          <DefaultLayout />
        </I18nextProvider>
      </Suspense>
    </AuthProvider>
  );
}

export default withQueryClient(App);
