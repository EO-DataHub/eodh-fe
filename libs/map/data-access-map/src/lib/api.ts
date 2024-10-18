const presets = '/action-creator/functions';
const history = '/action-creator/submissions';

const eodhProApiUrl = 'EODH_PRO_API_URL';

type TApi = 'EODH_PRO_API_URL' | 'EODH_STAC_API_URL';

type TPath = `${TApi}/${string}`;

type TQueryKey = {
  [key: string]: TPath;
};

export const QUERY_KEY: TQueryKey = {
  PRESETS: `${eodhProApiUrl}${presets}`,
  HISTORY: `${eodhProApiUrl}${history}`,
};
