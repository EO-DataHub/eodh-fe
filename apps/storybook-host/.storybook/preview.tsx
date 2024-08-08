import './main.css';

import { ComponentType, Suspense, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';

import i18n from './config/i18n';

interface IStorybookGlobalConfig {
  locale: 'en' | 'pl';
}

const WithI18next = (Story: ComponentType, context: { globals: IStorybookGlobalConfig }) => {
  const { locale } = context.globals;

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  return (
    <Suspense fallback={<div>loading translations...</div>}>
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    </Suspense>
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
