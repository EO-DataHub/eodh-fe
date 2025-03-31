import { TFilterParam, TPlanetSearchParams } from '../query.model';

const createCloudCoverageFilterParamsHelper = (cloudCoverage: number | undefined): TFilterParam[] => {
  if (cloudCoverage === undefined) {
    return [];
  }

  const args: TFilterParam[] = [];

  if (cloudCoverage > 0) {
    args.push({
      op: '<=',
      args: [{ property: 'cloud_cover' }, parseFloat((cloudCoverage / 100).toString())],
    });
  } else if (cloudCoverage <= 0) {
    args.push({
      op: '=',
      args: [{ property: 'cloud_cover' }, 0],
    });
  }

  return args;
};

export const createPlanetFilterParams = (params: TPlanetSearchParams): TFilterParam | null => {
  if (!params) {
    return null;
  }

  const args: TFilterParam[] = createCloudCoverageFilterParamsHelper(params.cloudCoverage);
  return args.pop() || null;
};
