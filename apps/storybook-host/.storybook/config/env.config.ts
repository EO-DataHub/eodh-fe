interface IEnvConfig {
  production: boolean;
  baseUrl: string;
  module: {
    translation: {
      language: string;
      fallbackLng: string;
      path: string;
    };
    authorization: {
      url: string;
      realm: string;
      clientId: string;
    };
    http: {
      baseUrl: string;
    };
  };
}

const getValue = <T extends string | string[] | undefined[]>(envValue: T | undefined, defaultValue: T): T => {
  if (
    (Array.isArray(envValue) && !!envValue.filter((item) => !!item).length) ||
    (!Array.isArray(envValue) && envValue)
  ) {
    return envValue;
  }

  return defaultValue;
};

export const getEnvConfig = (): IEnvConfig => ({
  production: import.meta.env.NODE_ENV !== 'development',
  baseUrl: getValue(import.meta.env.VITE_BASE_URL, '/'),
  module: {
    translation: {
      language: getValue(import.meta.env.VITE_TRANSLATION_LANGUAGE_URL, 'en'),
      fallbackLng: getValue(import.meta.env.VITE_TRANSLATION_FALLBACK_LANGUAGE_URL, 'en'),
      path: `assets/i18n/{{lang}}.json`,
    },
    authorization: {
      url: getValue(import.meta.env.VITE_AUTHORIZATION_URL, ''),
      realm: getValue(import.meta.env.VITE_AUTHORIZATION_REALM, ''),
      clientId: getValue(import.meta.env.VITE_AUTHORIZATION_CLIENT_ID, ''),
    },
    http: {
      baseUrl: getValue(import.meta.env.VITE_API_URL, ''),
    },
  },
});

export const env = getEnvConfig();
