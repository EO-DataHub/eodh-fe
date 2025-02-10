import { TCatalogueCollection } from '../../collection';
import { TCopernicusSearchParams, TFilterParam } from '../../query.model';

const createSentinel2FilterParamsHelper = (
  enabled: boolean,
  params: Omit<Required<TCopernicusSearchParams>['sentinel2'], 'enabled'>,
  collectionType: string,
  collectionKey: keyof typeof params
): TFilterParam[] => {
  if (!enabled || !params[collectionKey]) {
    return [];
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
  params: Omit<TCopernicusSearchParams['sentinel2'], 'enabled'>,
  collection: TCatalogueCollection
): TFilterParam[] => {
  if (!params) {
    return [];
  }

  switch (collection) {
    case 'element64': {
      return [
        ...createSentinel2FilterParamsHelper(
          enabled,
          params as Omit<Required<TCopernicusSearchParams>['sentinel2'], 'enabled'>,
          'sentinel-2-l1c',
          'l1c'
        ),
        ...createSentinel2FilterParamsHelper(
          enabled,
          params as Omit<Required<TCopernicusSearchParams>['sentinel2'], 'enabled'>,
          'sentinel-2-l2a',
          'l2a'
        ),
      ];
    }

    case 'ard': {
      return [
        ...createSentinel2FilterParamsHelper(
          enabled,
          params as Omit<Required<TCopernicusSearchParams>['sentinel2'], 'enabled'>,
          'sentinel2_ard',
          'l2aARD'
        ),
      ];
    }

    default: {
      return [];
    }
  }
};
