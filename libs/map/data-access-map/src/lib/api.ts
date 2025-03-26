const functions = '/action-creator/functions';
const presets = '/action-creator/presets';
const history = '/action-creator/submissions';

const eodhProApiUrl = 'EODH_PRO_API_URL';

type TApi = 'EODH_PRO_API_URL';

type TPath = `${TApi}/${string}` | string;

type TQueryKey = {
  PRESETS: TPath;
  FUNCTIONS: TPath;
  WORKFLOW: TPath;
  COLLECTION_INFO: TPath;
  DELETE_WORKFLOW: (workflowId: string) => string;
};

export const paths: TQueryKey = {
  PRESETS: `${eodhProApiUrl}${presets}`,
  FUNCTIONS: `${eodhProApiUrl}${functions}`,
  WORKFLOW: `${eodhProApiUrl}${history}`,
  COLLECTION_INFO: 'EODH_COLLECTION_INFO_API_URL',
  DELETE_WORKFLOW: (workflowId: string) => `${eodhProApiUrl}${history}/${workflowId}`,
};
