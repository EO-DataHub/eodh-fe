import { getValue } from './get-value';

export interface IProxyConfig {
  EODH_PRO_API_URL: string;
  EODH_CHARTS_API_URL: string;
  EODH_ELEMENT_84_CATALOGUE_API_URL: string;
  EODH_CEDA_CATALOGUE_API_URL: string;
  EODH_WORKFLOW_CATALOGUE_API_URL: string;
}

const removeTrailingSlashes = (url: string) => {
  return url.replace(/\/+$/, '');
};

export const getEodhProUrl = (config: IProxyConfig | undefined) => {
  const apiVersion = '/v1.2';
  const importedUrl = getValue<string>(import.meta.env.VITE_EODH_PRO_API_URL, config?.EODH_PRO_API_URL, '');

  if (importedUrl) {
    return removeTrailingSlashes(importedUrl) + apiVersion;
  }

  return '';
};

export const getElement84CatalogueUrl = (config: IProxyConfig | undefined) => {
  const importedUrl = getValue<string>(
    import.meta.env.VITE_EODH_ELEMENT_84_CATALOGUE_API_URL,
    config?.EODH_ELEMENT_84_CATALOGUE_API_URL,
    ''
  );
  return removeTrailingSlashes(importedUrl);
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const getCEDACatalogueUrl = (config: IProxyConfig | undefined) => {
  const importedUrl = getValue<string>(
    import.meta.env.VITE_EODH_CEDA_CATALOGUE_API_URL,
    config?.EODH_CEDA_CATALOGUE_API_URL,
    ''
  );
  return removeTrailingSlashes(importedUrl);
};

export const getWorkflowCatalogueUrl = (config: IProxyConfig | undefined) => {
  const importedUrl = getValue<string>(
    import.meta.env.VITE_EODH_WORKFLOW_CATALOGUE_API_URL,
    config?.EODH_WORKFLOW_CATALOGUE_API_URL,
    ''
  );
  return removeTrailingSlashes(importedUrl);
};

export const getChartsUrl = (config: IProxyConfig | undefined) => {
  const importedUrl = getValue<string>(import.meta.env.VITE_EODH_CHARTS_API_URL, config?.EODH_CHARTS_API_URL, '');
  return removeTrailingSlashes(importedUrl);
};
