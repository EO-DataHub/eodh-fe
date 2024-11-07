const stacCatalogue = '/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws/search';
const workflowResult =
  '/api/catalogue/stac/catalogs/user-datasets/{user_workspace}/processing-results/cat_{job_id}/search';
const collectionInfo =
  '/api/catalogue/stac/catalogs/user-datasets/{user_workspace}/processing-results/cat_{job_id}/collections/col_{job_id}';

const eodhStacApiUrl = 'EODH_STAC_API_URL';

export const paths = {
  STAC_CATALOGUE: `${eodhStacApiUrl}${stacCatalogue}`,
  WORKFLOW_RESULT: ({ userWorkspace, jobId }: { userWorkspace: string; jobId: string }) =>
    `${eodhStacApiUrl}${workflowResult.replace('{user_workspace}', userWorkspace).replace('{job_id}', jobId)}`,
  COLLECTION_INFO: `${eodhStacApiUrl}${collectionInfo}`,
};
