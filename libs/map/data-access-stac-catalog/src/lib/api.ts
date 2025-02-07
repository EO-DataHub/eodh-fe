const stacCatalogue = '/api/catalogue/stac/catalogs/supported-datasets/ceda-stac-catalogue/search';
const stacCatalogue2 = '/catalogue/stac/search';
const workflowResult =
  '/api/catalogue/stac/catalogs/user-datasets/{user_workspace}/processing-results/cat_{job_id}/search';
const workflowResultChart =
  '/catalogue/stac/catalogs/user-datasets/{user_workspace}/processing-results/cat_{job_id}/charts';

const eodhProApiUrl = 'EODH_PRO_API_URL';
const eodhStacApiUrl = 'EODH_STAC_API_URL';

export const paths = {
  STAC_CATALOGUE: `${eodhProApiUrl}${stacCatalogue2}`,
  WORKFLOW_RESULT: ({ userWorkspace, jobId }: { userWorkspace: string; jobId: string }) =>
    `${eodhStacApiUrl}${workflowResult.replace('{user_workspace}', userWorkspace).replace('{job_id}', jobId)}`,
  WORKFLOW_RESULT_CHARTS: ({ userWorkspace, jobId }: { userWorkspace: string; jobId: string }) =>
    `${eodhProApiUrl}${workflowResultChart.replace('{user_workspace}', userWorkspace).replace('{job_id}', jobId)}`,
};
