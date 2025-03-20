const functions = '/action-creator/functions';
const presets = '/action-creator/presets';
const history = '/action-creator/submissions';

const eodhProApiUrl = 'EODH_PRO_API_URL';

type TApi = 'EODH_PRO_API_URL';

type TPath = `${TApi}/${string}` | string;

type TQueryKey = Record<'PRESETS' | 'FUNCTIONS' | 'WORKFLOW' | 'COLLECTION_INFO' | 'DELETE_WORKFLOW', TPath>;

export const paths: TQueryKey = {
  PRESETS: `${eodhProApiUrl}${presets}`,
  FUNCTIONS: `${eodhProApiUrl}${functions}`,
  WORKFLOW: `${eodhProApiUrl}${history}`,
  COLLECTION_INFO: 'EODH_COLLECTION_INFO_API_URL',
  DELETE_WORKFLOW:`${eodhProApiUrl}${history}`,
};
