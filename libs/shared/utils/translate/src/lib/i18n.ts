import i18n from 'i18next';
import i18nHttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

export const setupI18n = ({ language, fallbackLng, path }: { language: string; fallbackLng: string; path: string }) => {
  i18n
    .use(i18nHttpBackend)
    .use(initReactI18next)
    .init({
      partialBundledLanguages: true,
      lng: language,
      fallbackLng: fallbackLng,
      returnEmptyString: true,
      backend: {
        crossDomain: false,
        loadPath: path.replace('{{lang}}', '{{lng}}'),
        requestOptions: {
          cache: 'no-store',
        },
        customHeaders: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
        },
      },
      interpolation: {
        escapeValue: false,
      },
    });

  return i18n;
};
