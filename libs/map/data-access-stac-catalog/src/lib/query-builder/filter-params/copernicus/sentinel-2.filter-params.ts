import { TCopernicusSearchParams, TFilterParam } from '../../query.model';

const createSentinel2FilterParamsHelper = (
  enabled: boolean,
  params: Omit<TCopernicusSearchParams['sentinel2'], 'enabled'>,
  collectionType: string,
  collectionKey: keyof typeof params
): TFilterParam[] => {
  if (!enabled || !params[collectionKey]) {
    return [];
  }

  if (collectionType === 'sentinel-2-l2a-ard') {
    collectionType = 'sentinel2_ard';
  }

  const args: TFilterParam[] = [
    {
      op: '=',
      args: [{ property: 'collection' }, collectionType],
    },
  ];

  if (params.cloudCoverage > 0) {
    args.push({
      op: '<=',
      args: [{ property: 'properties.eo:cloud_cover' }, params.cloudCoverage],
    });
  } else if (params.cloudCoverage <= 0) {
    args.push({
      op: '=',
      args: [{ property: 'properties.eo:cloud_cover' }, 0],
    });
  }

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

export const createSentinel2FilterParams = (
  enabled: boolean,
  params: Omit<TCopernicusSearchParams['sentinel2'], 'enabled'>
): TFilterParam[] => {
  return [
    ...createSentinel2FilterParamsHelper(enabled, params, 'sentinel-2-l1c', 'l1c'),
    ...createSentinel2FilterParamsHelper(enabled, params, 'sentinel-2-l2a', 'l2a'),
    ...createSentinel2FilterParamsHelper(enabled, params, 'sentinel-2-l2a-ard', 'l2aARD'),
  ];
};
