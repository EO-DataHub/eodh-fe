import { AppLoader, SnackbarProvider } from '@ukri/shared/design-system';
import { OnboardingProvider } from '@ukri/shared/ui/ac-workflow-onboarding';
import { AuthInterceptor, AuthProvider, KeycloakAdapter } from '@ukri/shared/utils/authorization';
import { FeatureFlagProvider } from '@ukri/shared/utils/feature-flag';
import { initHttpClient, withQueryClient } from '@ukri/shared/utils/react-query';
import { SettingsProvider } from '@ukri/shared/utils/settings';
import { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';

import { getEnvConfig } from '../env/env.config';
import i18n from '../i18n';
import { DefaultLayout } from './layout/default-layout.component';

const featureFlags = getEnvConfig().module.feature;
const keycloakAdapter = new KeycloakAdapter(getEnvConfig().module.authorization);
const settings = getEnvConfig().module.settings;

initHttpClient(getEnvConfig().module.http, [new AuthInterceptor(keycloakAdapter)]);

export function App() {
  return (
    <FeatureFlagProvider featureFlags={featureFlags}>
      <SnackbarProvider>
        <AuthProvider adapter={keycloakAdapter}>
          <SettingsProvider settings={settings}>
            <Suspense fallback={<AppLoader />}>
              <I18nextProvider i18n={i18n}>
                <OnboardingProvider>
                  <DefaultLayout />
                </OnboardingProvider>
              </I18nextProvider>
            </Suspense>
          </SettingsProvider>
        </AuthProvider>
      </SnackbarProvider>
    </FeatureFlagProvider>
  );
}

export default withQueryClient(App);
