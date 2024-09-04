import { TCopernicusSearchParams, TFilterParam } from '../../query.model';

const createSentinel2l2aFilterParams = (
  enabled: boolean,
  params: Omit<TCopernicusSearchParams['sentinel2'], 'enabled'>
) => {
  if (!enabled || !params.l2a) {
    return [];
  }

  const args: TFilterParam[] = [
    {
      op: '=',
      args: [{ property: 'collection' }, 'sentinel-2-l2a'],
    },
  ];

  if (params.cloudCoverage) {
    args.push({
      op: '<=',
      args: [{ property: 'properties.eo:cloud_cover' }, params.cloudCoverage],
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

const createSentinel2l1cFilterParams = (
  enabled: boolean,
  params: Omit<TCopernicusSearchParams['sentinel2'], 'enabled'>
) => {
  if (!enabled || !params.l1c) {
    return [];
  }

  const args: TFilterParam[] = [
    {
      op: '=',
      args: [{ property: 'collection' }, 'sentinel-2-l1c'],
    },
  ];

  if (params.cloudCoverage) {
    args.push({
      op: '<=',
      args: [{ property: 'properties.eo:cloud_cover' }, params.cloudCoverage],
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
  return [...createSentinel2l1cFilterParams(enabled, params), ...createSentinel2l2aFilterParams(enabled, params)];
};
