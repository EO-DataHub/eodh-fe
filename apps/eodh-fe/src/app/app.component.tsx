import { AppLoader, SnackbarProvider } from '@ukri/shared/design-system';
import { OnboardingProvider } from '@ukri/shared/ui/ac-workflow-onboarding';
import { AuthInterceptor, AuthProvider, KeycloakAdapter } from '@ukri/shared/utils/authorization';
import { initHttpClient, withQueryClient } from '@ukri/shared/utils/react-query';
import { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';

import { getEnvConfig } from '../env.config';
import i18n from '../i18n';
import { DefaultLayout } from './layout/default-layout.component';

const keycloakAdapter = new KeycloakAdapter(getEnvConfig().module.authorization);

initHttpClient(getEnvConfig().module.http, [new AuthInterceptor(keycloakAdapter)]);

export function App() {
  return (
    <SnackbarProvider>
      <AuthProvider adapter={keycloakAdapter}>
        <Suspense fallback={<AppLoader />}>
          <I18nextProvider i18n={i18n}>
            <OnboardingProvider>
              <DefaultLayout />
            </OnboardingProvider>
          </I18nextProvider>
        </Suspense>
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default withQueryClient(App);
