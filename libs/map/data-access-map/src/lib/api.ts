const functions = '/action-creator/functions';
const history = '/action-creator/submissions';
const workflowResult =
  '/api/catalogue/stac/catalogs/user-datasets/{user_workspace}/processing-results/cat_{job_id}/search';

const eodhProApiUrl = 'EODH_PRO_API_URL';
const eodhStacApiUrl = 'EODH_STAC_API_URL';

type TApi = 'EODH_PRO_API_URL' | 'EODH_STAC_API_URL';

type TPath = `${TApi}/${string}`;

type TQueryKey = Record<'PRESETS' | 'FUNCTIONS' | 'WORKFLOW' | 'WORKFLOW_RESULT', TPath>;

export const paths: TQueryKey = {
  PRESETS: `${eodhProApiUrl}${functions}`,
  FUNCTIONS: `${eodhProApiUrl}${functions}`,
  WORKFLOW: `${eodhProApiUrl}${history}`,
  WORKFLOW_RESULT: `${eodhStacApiUrl}${workflowResult}`,
};
