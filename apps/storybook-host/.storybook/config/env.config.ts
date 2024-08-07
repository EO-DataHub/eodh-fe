interface IEnvConfig {
  production: boolean;
  baseUrl: string;
  apiUrl: string;
  module: {
    translation: {
      language: string;
      fallbackLng: string;
      path: string;
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
  production: import.meta.env.NODE_ENV === 'production',
  baseUrl: getValue(import.meta.env.VITE_BASE_URL, '/'),
  apiUrl: getValue(import.meta.env.VITE_API_BASE_URL, ''),
  module: {
    translation: {
      language: getValue(import.meta.env.VITE_TRANSLATION_LANGUAGE_URL, 'en'),
      fallbackLng: getValue(import.meta.env.VITE_TRANSLATION_FALLBACK_LANGUAGE_URL, 'en'),
      path: `assets/i18n/{{lang}}.json`,
    },
  },
});

export const env = getEnvConfig();
