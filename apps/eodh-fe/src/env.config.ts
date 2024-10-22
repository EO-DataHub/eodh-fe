declare const config: {
  baseUrl: string;
  apiUrl: string;
  translation: {
    language: string;
    fallbackLng: string;
  };
  authorization: {
    url: string;
    realm: string;
    clientId: string;
  };
  http: {
    proxyConfig: {
      EODH_PRO_API_URL: string;
      EODH_STAC_API_URL: string;
    };
  };
};

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
      proxyConfig: {
        EODH_PRO_API_URL: string;
        EODH_STAC_API_URL: string;
      };
    };
  };
}

const getValue = <T extends string | string[] | undefined[] | boolean>(
  envValue: T | undefined,
  configValue: T | undefined,
  defaultValue: T
): T => {
  if (
    (Array.isArray(envValue) && !!envValue.filter((item) => !!item).length) ||
    (!Array.isArray(envValue) && envValue)
  ) {
    return envValue;
  }

  if (
    (Array.isArray(configValue) && !!configValue.filter((item) => !!item).length) ||
    (!Array.isArray(configValue) && configValue)
  ) {
    return configValue;
  }

  return defaultValue;
};

const removeTrailingSlashes = (url: string) => {
  return url.replace(/\/+$/, '');
};

const getEodhProUrl = () => {
  const apiVersion = '/v1.0';
  const importedUrl = getValue<string>(
    import.meta.env.VITE_EODH_PRO_API_URL,
    config?.http.proxyConfig.EODH_PRO_API_URL,
    ''
  );

  if (importedUrl) {
    return removeTrailingSlashes(importedUrl) + apiVersion;
  }

  return '';
};

const getEodhStacUrl = () => {
  const importedUrl = getValue<string>(
    import.meta.env.VITE_EODH_STAC_API_URL,
    config?.http.proxyConfig.EODH_STAC_API_URL,
    ''
  );
  return removeTrailingSlashes(importedUrl);
};

export const getEnvConfig = (): IEnvConfig => ({
  production: import.meta.env.NODE_ENV !== 'development',
  baseUrl: getValue<string>(import.meta.env.VITE_BASE_URL, config?.baseUrl, '/'),
  module: {
    translation: {
      language: getValue<string>(import.meta.env.VITE_TRANSLATION_LANGUAGE, config?.translation.language, 'en'),
      fallbackLng: getValue<string>(
        import.meta.env.VITE_TRANSLATION_FALLBACK_LANGUAGE,
        config?.translation.fallbackLng,
        'en'
      ),
      path: `assets/i18n/{{lang}}.json`,
    },
    authorization: {
      url: getValue<string>(import.meta.env.VITE_AUTHORIZATION_URL, config?.authorization.url, ''),
      realm: getValue<string>(import.meta.env.VITE_AUTHORIZATION_REALM, config?.authorization.realm, ''),
      clientId: getValue<string>(import.meta.env.VITE_AUTHORIZATION_CLIENT_ID, config?.authorization.clientId, ''),
    },
    http: {
      proxyConfig: {
        EODH_PRO_API_URL: getEodhProUrl(),
        EODH_STAC_API_URL: getEodhStacUrl(),
      },
    },
  },
});

export const env = getEnvConfig();
