import { getValue } from './get-value';
import {
  getCEDACatalogueUrl,
  getChartsUrl,
  getCollectionInfoUrl,
  getElement84CatalogueUrl,
  getEodhProUrl,
  getWorkflowCatalogueUrl,
} from './url.config';

type TFeatureFlag = 'true' | 'false' | boolean;

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
    scopes: [];
  };
  http: {
    proxyConfig: {
      EODH_PRO_API_URL: string;
      EODH_CHARTS_API_URL: string;
      EODH_COLLECTION_INFO_API_URL: string;
      EODH_ELEMENT_84_CATALOGUE_API_URL: string;
      EODH_CEDA_CATALOGUE_API_URL: string;
      EODH_WORKFLOW_CATALOGUE_API_URL: string;
    };
  };
  feature: {
    downloadAsset: TFeatureFlag;
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
      scopes: [];
    };
    http: {
      proxyConfig: {
        EODH_PRO_API_URL: string;
        EODH_CHARTS_API_URL: string;
        EODH_COLLECTION_INFO_API_URL: string;
        EODH_ELEMENT_84_CATALOGUE_API_URL: string;
        EODH_CEDA_CATALOGUE_API_URL: string;
        EODH_WORKFLOW_CATALOGUE_API_URL: string;
      };
    };
    feature: {
      downloadAsset: TFeatureFlag;
    };
  };
}

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
      scopes: getValue<string[]>(
        import.meta.env.VITE_AUTHORIZATION_SCOPES?.split(' '),
        config?.authorization.scopes,
        []
      ),
    },
    http: {
      proxyConfig: {
        EODH_PRO_API_URL: getEodhProUrl(config.http.proxyConfig),
        EODH_COLLECTION_INFO_API_URL: getCollectionInfoUrl(config.http.proxyConfig),
        EODH_ELEMENT_84_CATALOGUE_API_URL: getElement84CatalogueUrl(config.http.proxyConfig),
        EODH_CEDA_CATALOGUE_API_URL: getCEDACatalogueUrl(config.http.proxyConfig),
        EODH_WORKFLOW_CATALOGUE_API_URL: getWorkflowCatalogueUrl(config.http.proxyConfig),
        EODH_CHARTS_API_URL: getChartsUrl(config.http.proxyConfig),
      },
    },
    feature: {
      downloadAsset: getValue<TFeatureFlag>(
        import.meta.env.VITE_FEATURE_FLAG_DOWNLOAD_ASSET,
        config?.feature.downloadAsset,
        'false'
      ),
    },
  },
});

export const env = getEnvConfig();
