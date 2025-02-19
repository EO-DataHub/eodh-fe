import { getValue } from './get-value';

const eodhProApiVersion = 'v1.2';
const eodhProApiVersionToken = '{apiVersion}';

export interface IProxyConfig {
  EODH_PRO_API_URL: string;
  EODH_CHARTS_API_URL: string;
  EODH_COLLECTION_INFO_API_URL: string;
  EODH_ELEMENT_84_CATALOGUE_API_URL: string;
  EODH_CEDA_CATALOGUE_API_URL: string;
  EODH_WORKFLOW_CATALOGUE_API_URL: string;
}

const removeTrailingSlashes = (url: string) => {
  return url.replace(/\/+$/, '');
};

export const getEodhProUrl = (config: IProxyConfig | undefined) => {
  const url = getValue<string>(import.meta.env.VITE_EODH_PRO_API_URL, config?.EODH_PRO_API_URL, '');

  if (url) {
    if (url.includes(eodhProApiVersionToken)) {
      return removeTrailingSlashes(url).replace(eodhProApiVersionToken, eodhProApiVersion);
    }

    return `${removeTrailingSlashes(url)}/${eodhProApiVersion}`;
  }

  return '';
};

export const getCollectionInfoUrl = (config: IProxyConfig | undefined) => {
  const url = getValue<string>(
    import.meta.env.VITE_EODH_COLLECTION_INFO_API_URL,
    config?.EODH_COLLECTION_INFO_API_URL,
    ''
  );
  return removeTrailingSlashes(url);
};

export const getElement84CatalogueUrl = (config: IProxyConfig | undefined) => {
  const url = getValue<string>(
    import.meta.env.VITE_EODH_ELEMENT_84_CATALOGUE_API_URL,
    config?.EODH_ELEMENT_84_CATALOGUE_API_URL,
    ''
  );
  return removeTrailingSlashes(url);
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const getCEDACatalogueUrl = (config: IProxyConfig | undefined) => {
  const url = getValue<string>(
    import.meta.env.VITE_EODH_CEDA_CATALOGUE_API_URL,
    config?.EODH_CEDA_CATALOGUE_API_URL,
    ''
  );
  return removeTrailingSlashes(url);
};

export const getWorkflowCatalogueUrl = (config: IProxyConfig | undefined) => {
  const url = getValue<string>(
    import.meta.env.VITE_EODH_WORKFLOW_CATALOGUE_API_URL,
    config?.EODH_WORKFLOW_CATALOGUE_API_URL,
    ''
  );
  return removeTrailingSlashes(url);
};

export const getChartsUrl = (config: IProxyConfig | undefined) => {
  const url = getValue<string>(import.meta.env.VITE_EODH_CHARTS_API_URL, config?.EODH_CHARTS_API_URL, '');
  return removeTrailingSlashes(url).replace(eodhProApiVersionToken, eodhProApiVersion);
};
