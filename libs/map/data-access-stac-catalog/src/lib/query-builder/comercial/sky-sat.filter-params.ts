import { TFilterParam, TPlanetSearchParams } from '../query.model';

export const getPlanetCollections = (collection: keyof TPlanetSearchParams) => {
  switch (collection) {
    case 'planetScope': {
      return ['PSScene'];
    }

    case 'skySat': {
      return ['SkySatVideo', 'SkySatScene', 'SkySatCollect'];
    }

    case 'rapidEye': {
      return ['REScene', 'REOrthoTile'];
    }

    default: {
      return [];
    }
  }
};

const createCloudCoverageFilterParamsHelper = (
  cloudCoverage: number | undefined,
  propertyName: string
): TFilterParam[] => {
  if (cloudCoverage === undefined) {
    return [];
  }

  const args: TFilterParam[] = [];

  if (cloudCoverage > 0) {
    args.push({
      op: '<=',
      args: [{ property: propertyName }, cloudCoverage],
    });
  } else if (cloudCoverage <= 0) {
    args.push({
      op: '=',
      args: [{ property: propertyName }, 0],
    });
  }

  return args;
};

const createPlanetScopeFilterParams = <T extends keyof Pick<TPlanetSearchParams, 'planetScope'>>(
  params: TPlanetSearchParams['planetScope'],
  collection: T
): TFilterParam[] => {
  if (!params?.enabled) {
    return [];
  }

  const args: TFilterParam[] = [
    { op: 'in', args: [{ property: 'collection' }, getPlanetCollections(collection)] },
    ...createCloudCoverageFilterParamsHelper(params.cloudCoverage, 'cloud_percent'),
  ];

  if (args.length <= 1) {
    return args;
  }

  return [
    {
      op: 'and',
      args: args,
    },
  ];
};

const createSkySatFilterParams = <T extends keyof Pick<TPlanetSearchParams, 'skySat'>>(
  params: TPlanetSearchParams[T],
  collection: T
): TFilterParam[] => {
  if (!params?.enabled) {
    return [];
  }

  const args: TFilterParam[] = [
    { op: 'in', args: [{ property: 'collection' }, getPlanetCollections(collection)] },
    ...createCloudCoverageFilterParamsHelper(params.cloudCoverage, 'cloud_percent'),
  ];

  if (args.length <= 1) {
    return args;
  }

  return [
    {
      op: 'and',
      args: args,
    },
  ];
};

const createRapidEyeFilterParams = <T extends keyof Pick<TPlanetSearchParams, 'rapidEye'>>(
  params: TPlanetSearchParams[T],
  collection: T
): TFilterParam[] => {
  if (!params?.enabled) {
    return [];
  }

  const args: TFilterParam[] = [
    { op: 'in', args: [{ property: 'collection' }, getPlanetCollections(collection)] },
    ...createCloudCoverageFilterParamsHelper(params.cloudCoverage, 'cloud_cover'),
  ];

  if (args.length <= 1) {
    return args;
  }

  return [
    {
      op: 'and',
      args: args,
    },
  ];
};

export const createPlanetFilterParams = (params: TPlanetSearchParams): TFilterParam | null => {
  if (!params) {
    return null;
  }

  const args: TFilterParam[] = [
    ...createPlanetScopeFilterParams(params.planetScope, 'planetScope'),
    ...createSkySatFilterParams(params.skySat, 'skySat'),
    ...createRapidEyeFilterParams(params.rapidEye, 'rapidEye'),
  ];

  if (args.length <= 1) {
    return args.pop() || null;
  }

  return {
    op: 'or',
    args: args,
  };
};
