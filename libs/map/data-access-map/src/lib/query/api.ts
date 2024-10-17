const functions = '/action-creator/functions';
const submissions = '/action-creator/submissions';

const eodhProApiUrl = 'EODH_PRO_API_URL';

type TApi = 'EODH_PRO_API_URL' | 'EODH_STAC_API_URL';

type TPath = `${TApi}/${string}`;

type TQueryKey = Record<'PRESETS' | 'FUNCTIONS' | 'WORKFLOW', TPath>;

export const paths: TQueryKey = {
  PRESETS: `${eodhProApiUrl}${functions}`,
  FUNCTIONS: `${eodhProApiUrl}${functions}`,
  WORKFLOW: `${eodhProApiUrl}${submissions}`,
};
