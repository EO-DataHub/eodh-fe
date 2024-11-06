const functions = '/action-creator/functions';
const presets = '/action-creator/presets';
const history = '/action-creator/submissions';
const collectionInfo =
  '/catalogs/user-datasets/{user_workspace}/processing-results/{catalog_id}/collections/{collection_id}';

const eodhProApiUrl = 'EODH_PRO_API_URL';

type TApi = 'EODH_PRO_API_URL' | 'EODH_STAC_API_URL';

type TPath = `${TApi}/${string}`;

type TQueryKey = Record<'PRESETS' | 'FUNCTIONS' | 'WORKFLOW' | 'COLLECTION_INFO', TPath>;

export const paths: TQueryKey = {
  PRESETS: `${eodhProApiUrl}${presets}`,
  FUNCTIONS: `${eodhProApiUrl}${functions}`,
  WORKFLOW: `${eodhProApiUrl}${history}`,
  COLLECTION_INFO: `${eodhProApiUrl}${collectionInfo}`,
};
