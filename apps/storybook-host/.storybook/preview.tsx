import './main.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from '@ukri/shared/design-system';
import { OnboardingProvider } from '@ukri/shared/ui/ac-workflow-onboarding';
import { AuthInterceptor, AuthProvider, KeycloakAdapter } from '@ukri/shared/utils/authorization';
import { initHttpClient, queryClient } from '@ukri/shared/utils/react-query';
import { ComponentType, Suspense, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';

import { getEnvConfig } from './config/env.config';
import i18n from './config/i18n';

interface IStorybookGlobalConfig {
  locale: 'en' | 'pl';
}

const keycloakAdapter = new KeycloakAdapter(getEnvConfig().module.authorization);
initHttpClient(getEnvConfig().module.http, [new AuthInterceptor(keycloakAdapter)]);

const WithI18next = (Story: ComponentType, context: { globals: IStorybookGlobalConfig }) => {
  const { locale } = context.globals;

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  return (
    <SnackbarProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider adapter={keycloakAdapter}>
          <Suspense fallback={<div>loading translations...</div>}>
            <I18nextProvider i18n={i18n}>
              <OnboardingProvider>
                <Story />
              </OnboardingProvider>
            </I18nextProvider>
          </Suspense>
        </AuthProvider>
      </QueryClientProvider>
    </SnackbarProvider>
  );
};

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', right: '🇬🇧', title: 'English' },
        { value: 'pl', right: '🇵🇱', title: 'Polish' },
      ],
      showName: true,
    },
  },
};

export const decorators = [WithI18next];
