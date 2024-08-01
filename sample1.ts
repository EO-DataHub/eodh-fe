import i18n from 'i18next';
import i18nHttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { env } from './env.config';

i18n
  .use(i18nHttpBackend)
  .use(initReactI18next)
  .init({
    partialBundledLanguages: true,
    lng: env.module.translation.language,
    fallbackLng: env.module.translation.fallbackLng,
    returnEmptyString: true,
    backend: {
      crossDomain: false,
      loadPath: env.module.translation.path.replace('{{lang}}', '{{lng}}'),
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

export default i18n;
