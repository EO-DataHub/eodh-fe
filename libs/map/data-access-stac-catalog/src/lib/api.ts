const stacCatalogue = '/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws/search';

const eodhStacApiUrl = 'EODH_STAC_API_URL';

type TApi = 'EODH_PRO_API_URL' | 'EODH_STAC_API_URL';

type TPath = `${TApi}/${string}`;

type TPaths = {
  [key: string]: TPath;
};

export const paths: TPaths = {
  STAC_CATALOGUE: `${eodhStacApiUrl}${stacCatalogue}`,
};
