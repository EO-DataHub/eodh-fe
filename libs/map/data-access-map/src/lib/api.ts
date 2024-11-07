const functions = '/action-creator/functions';
const history = '/action-creator/submissions';
const collectionInfo =
  '/api/catalogue/stac/catalogs/user-datasets/{user_workspace}/processing-results/cat_{job_id}/collections/col_{job_id}';

const eodhProApiUrl = 'EODH_PRO_API_URL';
const eodhStacApiUrl = 'EODH_STAC_API_URL';

type TApi = 'EODH_PRO_API_URL' | 'EODH_STAC_API_URL';

type TPath = `${TApi}/${string}`;

type TQueryKey = Record<'PRESETS' | 'FUNCTIONS' | 'WORKFLOW' | 'COLLECTION_INFO', TPath>;

export const paths: TQueryKey = {
  PRESETS: `${eodhProApiUrl}${functions}`,
  FUNCTIONS: `${eodhProApiUrl}${functions}`,
  WORKFLOW: `${eodhProApiUrl}${history}`,
  COLLECTION_INFO: `${eodhStacApiUrl}${collectionInfo}`,
};
