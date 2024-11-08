const functions = '/action-creator/functions';
const presets = '/action-creator/presets';
const history = '/action-creator/submissions';

const eodhProApiUrl = 'EODH_PRO_API_URL';

type TApi = 'EODH_PRO_API_URL' | 'EODH_STAC_API_URL';

type TPath = `${TApi}/${string}`;

type TQueryKey = Record<'PRESETS' | 'FUNCTIONS' | 'WORKFLOW', TPath>;

export const paths: TQueryKey = {
  PRESETS: `${eodhProApiUrl}${presets}`,
  FUNCTIONS: `${eodhProApiUrl}${functions}`,
  WORKFLOW: `${eodhProApiUrl}${history}`,
};
