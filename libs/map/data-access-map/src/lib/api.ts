const functions = '/action-creator/functions';
const presets = '/action-creator/presets';
const history = '/action-creator/submissions';
const collectionInfo =
  '/api/catalogue/stac/catalogs/user-datasets/{user_workspace}/processing-results/cat_{job_id}/collections/col_{job_id}';

const eodhProApiUrl = 'EODH_PRO_API_URL';
const eodhStacApiUrl = 'EODH_STAC_API_URL';

type TApi = 'EODH_PRO_API_URL' | 'EODH_STAC_API_URL';

type TPath = `${TApi}/${string}`;

type TCollectionInfoParams = { userWorkspace?: string; jobId?: string };
type TCollectionInfoType = Record<'COLLECTION_INFO', (params: TCollectionInfoParams) => string>;

type TQueryKey = Record<'PRESETS' | 'FUNCTIONS' | 'WORKFLOW', TPath> & TCollectionInfoType;

export const paths: TQueryKey = {
  PRESETS: `${eodhProApiUrl}${presets}`,
  FUNCTIONS: `${eodhProApiUrl}${functions}`,
  WORKFLOW: `${eodhProApiUrl}${history}`,
  COLLECTION_INFO: ({ userWorkspace, jobId }: TCollectionInfoParams) =>
    `${eodhStacApiUrl}${collectionInfo
      .replace('{user_workspace}', userWorkspace ?? '')
      .replace(/{job_id}/g, jobId ?? '')}`,
};
